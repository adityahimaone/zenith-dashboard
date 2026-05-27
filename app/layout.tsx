import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import ThemeToggle from "@/components/theme-toggle";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zenith Finance",
  description: "Personal finance dashboard — track, analyze, grow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background bg-mesh">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {/* Header */}
          <header className="glass neu-raised sticky top-0 z-50 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl flex items-center justify-center text-white font-bold text-sm
                  bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 shadow-lg shadow-indigo-500/25">
                  Z
                </div>
                <h1 className="text-lg font-bold tracking-tight text-foreground">
                  Zenith <span className="gradient-text">Finance</span>
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-xs text-muted-foreground hidden sm:block">Personal Finance Dashboard</p>
                <ThemeToggle />
              </div>
            </div>
          </header>

          {/* Gradient accent line */}
          <div className="h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-40" />

          {/* Main */}
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
