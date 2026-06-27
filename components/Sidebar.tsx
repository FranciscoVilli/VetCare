'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useNode } from '@/lib/context';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, Building2, PawPrint, Stethoscope, Users, ClipboardList, FlaskConical, MapPin, Lock, LogOut } from 'lucide-react';

const modules = [
  { href: '/',              label: 'Dashboard',    icon: LayoutDashboard, nodes: ['quito', 'cuenca'] as const },
  { href: '/sedes',         label: 'Sedes',        icon: Building2,       nodes: ['quito', 'cuenca'] as const },
  { href: '/mascotas',      label: 'Mascotas',     icon: PawPrint,        nodes: ['quito', 'cuenca'] as const },
  { href: '/veterinarios',  label: 'Veterinarios', icon: Stethoscope,     nodes: ['quito', 'cuenca'] as const },
  { href: '/duenos',        label: 'Dueños',       icon: Users,           nodes: ['quito', 'cuenca'] as const },
  { href: '/consultas',     label: 'Consultas',    icon: ClipboardList,   nodes: ['quito', 'cuenca'] as const },
  { href: '/examenes',      label: 'Exámenes',     icon: FlaskConical,    nodes: ['quito'] as const },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { node } = useNode();
  const router = useRouter();

  return (
    <aside className="w-60 bg-emerald-950 text-white flex flex-col shrink-0 overflow-y-auto">
      <div className="p-5 border-b border-emerald-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
            <PawPrint className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-base leading-none">VetCare</h1>
            <p className="text-emerald-400 text-xs mt-0.5">Base de Datos Distribuida</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5">
        {modules.map(mod => {
          const isActive = pathname === mod.href;
          const available = (mod.nodes as readonly string[]).includes(node);
          const Icon = mod.icon;

          return (
            <Link
              key={mod.href}
              href={available ? mod.href : '#'}
              onClick={e => !available && e.preventDefault()}
              className={[
                'flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all',
                isActive
                  ? 'bg-emerald-500 text-white shadow-md font-medium'
                  : available
                  ? 'text-emerald-200 hover:bg-emerald-800/60 hover:text-white'
                  : 'text-emerald-700 cursor-not-allowed',
              ].join(' ')}
            >
              <Icon className="w-4.5 h-4.5 shrink-0 w-[18px] h-[18px]" />
              <span className="flex-1">{mod.label}</span>
              {!available && <Lock className="w-3.5 h-3.5 text-emerald-700" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-emerald-800">
        <button
          onClick={() => router.push('/login')}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs text-emerald-300 hover:bg-emerald-800/60 hover:text-white transition-all"
        >
          <LogOut className="w-3.5 h-3.5 shrink-0" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}
