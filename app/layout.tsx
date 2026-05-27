import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zenith Finance Dashboard",
  description: "Personal finance dashboard powered by Zenith Finance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background">
        <header className="neu-raised neu-float px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl flex items-center justify-center text-white font-bold text-sm bg-gradient-to-br from-indigo-500 to-blue-600">
                Z
              </div>
              <h1 className="text-xl font-semibold tracking-tight text-foreground">Zenith Finance</h1>
            </div>
            <p className="text-sm text-muted-foreground">Personal Finance Dashboard</p>
          </div>
        </header>
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
