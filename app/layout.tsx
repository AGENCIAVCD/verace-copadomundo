import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Manrope, Prata } from 'next/font/google';
import './globals.css';

const titleFont = Prata({
  subsets: ['latin'],
  variable: '--font-title',
  weight: ['400'],
});

const bodyFont = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Verace Cantina Italiana | Copa do Mundo',
  description:
    'Landing page promocional da Verace Cantina Italiana para kits temáticos da Copa do Mundo.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${titleFont.variable} ${bodyFont.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
