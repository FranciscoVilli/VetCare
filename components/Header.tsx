'use client';
import { useNode, NodeType } from '@/lib/context';
import { MapPin, Activity } from 'lucide-react';

export default function Header() {
  const { node, setNode } = useNode();

  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center px-6 gap-4 shrink-0 shadow-sm z-10">
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Activity className="w-4 h-4 text-emerald-500" />
        <span>Sistema de Gestión Veterinaria</span>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-1.5 bg-gray-100 rounded-xl p-1">
        <span className="text-xs text-gray-400 pl-2 pr-1 select-none">Nodo:</span>
        {(['quito', 'cuenca'] as NodeType[]).map(n => (
          <button
            key={n}
            onClick={() => setNode(n)}
            className={[
              'flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all',
              node === n
                ? n === 'quito'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-sky-600 text-white shadow-sm'
                : 'text-gray-500 hover:bg-gray-200 hover:text-gray-700',
            ].join(' ')}
          >
            <MapPin className="w-3.5 h-3.5" />
            {n === 'quito' ? 'Quito' : 'Cuenca'}
          </button>
        ))}
      </div>

      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${node === 'quito' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-sky-50 text-sky-700 border border-sky-200'}`}>
        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${node === 'quito' ? 'bg-emerald-500' : 'bg-sky-500'}`} />
        {node === 'quito' ? 'Nodo 1' : 'Nodo 2'}
      </div>
    </header>
  );
}
