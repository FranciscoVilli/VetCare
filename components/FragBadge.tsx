export type FragType = 'replicacion' | 'vertical-horizontal' | 'mixta' | 'derivada' | 'solo-quito';

const config: Record<FragType, { label: string; className: string }> = {
  replicacion:          { label: 'Replicación',         className: 'bg-purple-100 text-purple-700 border-purple-200' },
  'vertical-horizontal':{ label: 'Vertical + Horizontal', className: 'bg-amber-100 text-amber-700 border-amber-200' },
  mixta:                { label: 'Frag. Mixta',          className: 'bg-pink-100 text-pink-700 border-pink-200' },
  derivada:             { label: 'Frag. Derivada',        className: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
  'solo-quito':         { label: 'Exclusivo Quito',       className: 'bg-red-100 text-red-700 border-red-200' },
};

export default function FragBadge({ type }: { type: FragType }) {
  const c = config[type];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${c.className}`}>
      {c.label}
    </span>
  );
}
