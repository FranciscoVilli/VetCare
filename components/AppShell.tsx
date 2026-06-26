'use client';
import { NodeProvider } from '@/lib/context';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <NodeProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main
            className="flex-1 overflow-auto p-6"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.83), rgba(255,255,255,0.83)), url(/vetcare.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
            }}
          >
            {children}
          </main>
        </div>
      </div>
    </NodeProvider>
  );
}
