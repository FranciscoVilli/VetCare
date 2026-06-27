import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ConditionalShell from '@/components/ConditionalShell';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VetCare — BD Distribuida',
  description: 'Sistema de gestión veterinaria con base de datos distribuida (Nodo Quito / Nodo Cuenca)',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ConditionalShell>{children}</ConditionalShell>
      </body>
    </html>
  );
}
