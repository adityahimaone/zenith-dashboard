import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const SPREADSHEET_ID = process.env.ZENITH_SPREADSHEET_ID || '1XmIbfIZtP2XF1n9WFobC8fA0o4oKfMcfp3QM8OxONog';
const TOKEN_PATH = join(process.env.HOME || '/home/adityahimaone', '.hermes', 'google_token.json');

function getAuth() {
  if (!existsSync(TOKEN_PATH)) {
    throw new Error(`Token file not found at ${TOKEN_PATH}`);
  }

  const rawToken = JSON.parse(readFileSync(TOKEN_PATH, 'utf-8'));
  
  // Normalize: googleapis expects access_token, but Hermes saves as token
  const token = {
    ...rawToken,
    access_token: rawToken.access_token || rawToken.token,
  };

  const oauth2Client = new google.auth.OAuth2(
    token.client_id,
    token.client_secret,
    'urn:ietf:wg:oauth:2.0:oob'
  );
  oauth2Client.setCredentials(token);

  // Auto-refresh expired tokens
  oauth2Client.on('tokens', (tokens) => {
    if (tokens.refresh_token || tokens.access_token) {
      const updated = { ...rawToken, ...tokens };
      require('fs').writeFileSync(TOKEN_PATH, JSON.stringify(updated, null, 2));
    }
  });

  return oauth2Client;
}

export async function GET() {
  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    // Fetch History sheet data
    const historyResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'History!A:G',
    });

    const historyData = historyResponse.data.values || [];

    // Parse transactions (skip header row)
    const transactions = historyData.slice(1).map((row) => ({
      timestamp: row[0] || '',
      description: row[1] || '',
      amount: parseFloat(row[2]?.replace(/[^0-9.-]/g, '') || '0') || 0,
      type: row[3] || '',
      category: row[4] || '',
      source: row[5] || '',
      balance: parseFloat(row[6]?.replace(/[^0-9.-]/g, '') || '0') || 0,
    }));

    // Calculate metrics from transactions
    const income = transactions
      .filter((t) => t.type === 'Income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
      .filter((t) => t.type === 'Expense')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const netWorth = transactions.length > 0 ? transactions[transactions.length - 1].balance : 0;

    const metrics = {
      totalIncome: income,
      totalExpense: expense,
      netSavings: income - expense,
      netWorth: netWorth,
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json({
      transactions,
      metrics,
    });
  } catch (error) {
    console.error('Error fetching spreadsheet data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch spreadsheet data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
