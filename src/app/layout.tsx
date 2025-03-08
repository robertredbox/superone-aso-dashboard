import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SuperOne ASO Dashboard',
  description: 'Year-to-Date ASO Dashboard for SuperOne Fan Battle iOS App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&family=Roboto+Slab:wght@500&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <style jsx global>{`
            body {
              font-family: 'Roboto', sans-serif;
              font-weight: 400;
            }
            
            h1, h2, h3, h4, h5, h6 {
              font-family: 'Roboto Slab', serif;
              font-weight: 500;
            }
          `}</style>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
