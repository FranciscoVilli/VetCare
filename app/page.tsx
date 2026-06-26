'use client';
import { useNode } from '@/lib/context';
import { PawPrint, Stethoscope, Users, ClipboardList, FlaskConical, Building2, MapPin } from 'lucide-react';
import { mascotas, veterinarios, duenos, consultas, examenes, sedes } from '@/lib/mockData';

const especieColors: Record<string, string> = {
  Perro:  'bg-amber-100 text-amber-700',
  Gato:   'bg-purple-100 text-purple-700',
  Ave:    'bg-sky-100 text-sky-700',
  Reptil: 'bg-green-100 text-green-700',
};

export default function Dashboard() {
  const { node } = useNode();
  const isQuito = node === 'quito';

  const stats = [
    {
      label: 'Mascotas',      icon: PawPrint,     value: mascotas[node].length,
      bg: 'bg-amber-50',   border: 'border-amber-100',   iconBg: 'bg-amber-100',   iconColor: 'text-amber-600',   numColor: 'text-amber-700',
    },
    {
      label: 'Veterinarios',  icon: Stethoscope,  value: veterinarios[node].length,
      bg: 'bg-blue-50',    border: 'border-blue-100',    iconBg: 'bg-blue-100',    iconColor: 'text-blue-600',    numColor: 'text-blue-700',
    },
    {
      label: 'Dueños',        icon: Users,         value: duenos[node].length,
      bg: 'bg-violet-50',  border: 'border-violet-100',  iconBg: 'bg-violet-100',  iconColor: 'text-violet-600',  numColor: 'text-violet-700',
    },
    {
      label: 'Consultas',     icon: ClipboardList, value: consultas[node].length,
      bg: 'bg-teal-50',    border: 'border-teal-100',    iconBg: 'bg-teal-100',    iconColor: 'text-teal-600',    numColor: 'text-teal-700',
    },
    {
      label: 'Exámenes',      icon: FlaskConical,  value: isQuito ? examenes.length : 0,
      bg: isQuito ? 'bg-rose-50' : 'bg-gray-50',
      border: isQuito ? 'border-rose-100' : 'border-gray-100',
      iconBg: isQuito ? 'bg-rose-100' : 'bg-gray-100',
      iconColor: isQuito ? 'text-rose-600' : 'text-gray-300',
      numColor: isQuito ? 'text-rose-700' : 'text-gray-300',
      unavailable: !isQuito,
    },
    {
      label: 'Sedes',         icon: Building2,     value: sedes.length,
      bg: 'bg-emerald-50', border: 'border-emerald-100', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600', numColor: 'text-emerald-700',
    },
  ];

  const totalRegistros = stats
    .filter(s => s.label !== 'Sedes')
    .reduce((acc, s) => acc + s.value, 0);

  // Mascotas por especie en el nodo activo
  const especieCounts = mascotas[node].reduce<Record<string, number>>((acc, m) => {
    acc[m.especie] = (acc[m.especie] ?? 0) + 1;
    return acc;
  }, {});

  const recentConsultas = consultas[node].slice(0, 4);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">

      {/* Hero banner */}
      <div className="relative h-44 rounded-2xl overflow-hidden shadow-md bg-emerald-900">
        <img
          src="https://images.unsplash.com/photo-1548767797-d8c844163c4a?w=1400&q=80"
          alt="VetCare"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-900/75 to-emerald-700/40" />
        <div className="relative h-full flex items-center justify-between px-8">
          <div>
            <p className="text-emerald-400 text-sm font-medium mb-1">Panel de Control</p>
            <h1 className="text-3xl font-bold text-white mb-3">Bienvenido a VetCare</h1>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${isQuito ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-500/40' : 'bg-sky-500/30 text-sky-200 border border-sky-500/40'}`}>
              <MapPin className="w-3.5 h-3.5" />
              Sede activa: <strong>{isQuito ? 'Quito' : 'Cuenca'}</strong>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Registros en esta sede</p>
            <p className="text-5xl font-black text-white">{totalRegistros}</p>
          </div>
        </div>
      </div>

      {/* KPI grid — solo datos del nodo activo */}
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
          Estadísticas — Sede {isQuito ? 'Quito' : 'Cuenca'}
        </p>
        <div className="grid grid-cols-3 gap-3">
          {stats.map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className={`rounded-xl border p-5 ${s.bg} ${s.border} ${s.unavailable ? 'opacity-50' : ''}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-xl ${s.iconBg}`}>
                    <Icon className={`w-5 h-5 ${s.iconColor}`} />
                  </div>
                  {s.unavailable && (
                    <span className="text-[10px] bg-gray-200 text-gray-400 px-2 py-0.5 rounded-full font-semibold">Solo Quito</span>
                  )}
                </div>
                <p className={`text-4xl font-black mb-0.5 ${s.numColor}`}>{s.value}</p>
                <p className="text-sm font-medium text-gray-500">{s.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fila inferior: mascotas por especie + veterinarios + consultas recientes */}
      <div className="grid grid-cols-5 gap-4">

        {/* Mascotas por especie */}
        <div className="col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50">
            <h2 className="text-sm font-semibold text-gray-700">Mascotas por especie</h2>
            <p className="text-xs text-gray-400 mt-0.5">{mascotas[node].length} pacientes en esta sede</p>
          </div>
          <div className="p-5 space-y-3">
            {Object.entries(especieCounts).map(([especie, count]) => {
              const pct = Math.round((count / mascotas[node].length) * 100);
              return (
                <div key={especie}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${especieColors[especie] ?? 'bg-gray-100 text-gray-600'}`}>
                      {especie}
                    </span>
                    <span className="text-sm font-bold text-gray-700">{count}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Últimas consultas */}
        <div className="col-span-3 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-gray-700">Últimas consultas</h2>
              <p className="text-xs text-gray-400 mt-0.5">Sede {isQuito ? 'Quito' : 'Cuenca'}</p>
            </div>
            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${isQuito ? 'bg-emerald-100 text-emerald-700' : 'bg-sky-100 text-sky-700'}`}>
              {consultas[node].length} registros
            </span>
          </div>
          <div className="divide-y divide-gray-50">
            {recentConsultas.map(c => {
              const mascota = mascotas[node].find(m => m.codigo === c.mascotaCodigo);
              const vet = veterinarios[node].find(v => v.cedula === c.veterinarioCedula);
              return (
                <div key={c.codigo} className="px-5 py-4 hover:bg-gray-50/60 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 bg-teal-50 rounded-xl flex items-center justify-center shrink-0">
                        <ClipboardList className="w-4 h-4 text-teal-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">{c.motivo}</p>
                        <p className="text-xs text-gray-400 truncate">{c.diagnostico}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-medium text-gray-600">{c.fecha}</p>
                      <p className="text-xs text-gray-400">{c.hora}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-2 ml-11">
                    {mascota && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${especieColors[mascota.especie] ?? 'bg-gray-100 text-gray-500'}`}>
                        {mascota.nombre} ({mascota.especie})
                      </span>
                    )}
                    {vet && (
                      <span className="text-[10px] text-gray-400">{vet.nombre}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
