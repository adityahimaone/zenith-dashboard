# Zenith Finance Dashboard

Personal finance dashboard web app yang terintegrasi dengan Zenith Finance Google Sheets.

## Features

- 📊 **Real-time Metrics** - Total income, expense, net worth, dan savings rate
- 📈 **Category Breakdown** - Pie chart pengeluaran per kategori
- 📉 **Monthly Trends** - Bar chart income vs expense per bulan
- 💰 **Account Balances** - Visual breakdown saldo per akun (BCA, Blu, Gopay, RDN, Emas)
- 📝 **Recent Transactions** - Daftar transaksi terbaru dengan filter
- 🎨 **Modern UI** - Built with Next.js 15, Tailwind CSS, shadcn/ui, dan Recharts

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Charts:** Recharts
- **Data Source:** Google Sheets API
- **Language:** TypeScript

## Prerequisites

1. Google Sheets dengan data Zenith Finance (History sheet dengan kolom: Timestamp, Description, Amount, Income/Expense, Category, Source, Balance)
2. Google OAuth credentials (`~/.hermes/google_token.json`)
3. Node.js 18+

## Setup

1. Clone repo:
```bash
git clone https://github.com/adityahimaone/zenith-dashboard.git
cd zenith-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
ZENITH_SPREADSHEET_ID=your_spreadsheet_id_here
```

4. Run development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
zenith-dashboard/
├── app/
│   ├── api/sheets/          # Google Sheets API route
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Dashboard page
├── components/
│   ├── dashboard/           # Dashboard components
│   │   ├── metrics-cards.tsx
│   │   ├── category-chart.tsx
│   │   ├── monthly-chart.tsx
│   │   ├── recent-transactions.tsx
│   │   └── account-balances.tsx
│   └── ui/                  # shadcn/ui components
├── lib/
│   ├── types/               # TypeScript types
│   └── utils/               # Utility functions
└── .env.local               # Environment variables
```

## Data Flow

```
Zenith Finance (Markdown) 
    ↓
Google Sheets (via sync script)
    ↓
Next.js API Route (/api/sheets)
    ↓
Dashboard Components
```

## Features Detail

### Metrics Cards
- Total Income (hijau)
- Total Expense (merah)
- Net Worth (biru)
- Savings Rate (ungu)

### Category Chart
Pie chart dengan breakdown pengeluaran per kategori:
- Food & Beverage
- Transport
- Bills
- Lifestyle
- dll.

### Monthly Chart
Bar chart perbandingan income vs expense per bulan dengan trend savings.

### Account Balances
List semua akun dengan:
- Icon per tipe akun (Bank, E-Wallet, Investment)
- Balance per akun
- Percentage dari total net worth

### Recent Transactions
Tabel transaksi terbaru dengan:
- Filter: All / Income / Expense
- Info: Description, Date, Category, Source, Amount
- Color coding: hijau (income), merah (expense)

## Development

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Lint
npm run lint
```

## Notes

- Data di-fetch dari Google Sheets setiap 60 detik (revalidate)
- Format currency: IDR (Indonesian Rupiah)
- Responsive design: mobile-first approach

## License

MIT

## Author

Aditya Himawan (@adityahimaone)
