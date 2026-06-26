'use client';
import { useState, useEffect } from 'react';
import { useNode } from '@/lib/context';
import Modal from '@/components/Modal';
import { Plus, Pencil, Trash2, FlaskConical, Lock, MapPin } from 'lucide-react';
import { examenes as mockExamenes, Examen } from '@/lib/mockData';

const IMG = 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&q=80';
const inp = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none';
const lbl = 'block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1';
const tiposExamen = ['Hematología', 'Radiografía', 'Ecografía', 'Coprológico', 'Uroanálisis', 'Biopsia', 'Electrocardiograma'];
const resultadoColors: Record<string, string> = {
  'Normal': 'bg-emerald-100 text-emerald-700',
  'Sin alteraciones': 'bg-emerald-100 text-emerald-700',
};

export default function ExamenesPage() {
  const { node } = useNode();
  const [items, setItems] = useState<Examen[]>(mockExamenes);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Examen | null>(null);
  const [form, setForm] = useState<Partial<Examen>>({});
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (node === 'quito') setItems(mockExamenes);
    setOpen(false); setEditing(null); setDeleteId(null);
  }, [node]);

  /* ── Pantalla bloqueada para Cuenca ── */
  if (node === 'cuenca') {
    return (
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          {/* Image with lock overlay */}
          <div className="relative h-56">
            <img src={IMG} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gray-900/70 flex flex-col items-center justify-center gap-3 text-white">
              <div className="w-14 h-14 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center">
                <Lock className="w-7 h-7" />
              </div>
              <div className="text-center">
                <h2 className="text-xl font-bold">Módulo no disponible</h2>
                <p className="text-white/60 text-sm mt-1">Este módulo solo opera en la sede de Quito</p>
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="p-6 text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <MapPin className="w-4 h-4 text-emerald-500" />
              <span>Disponible únicamente en <strong className="text-emerald-600">Quito</strong></span>
            </div>
            <p className="text-gray-400 text-sm">
              Cambia al nodo <strong className="text-emerald-600">Quito</strong> en el selector de la parte superior para acceder a los exámenes de laboratorio.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ── Vista Quito ── */
  function openCreate() {
    setEditing(null);
    setForm({ codigo: `E00${items.length + 1}`, tipo: 'Hematología', descripcion: '', resultado: '', fecha: '', observaciones: '', consultaCodigo: '' });
    setOpen(true);
  }
  function openEdit(e: Examen) { setEditing(e); setForm(e); setOpen(true); }
  function f(k: keyof Examen) { return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm(p => ({ ...p, [k]: e.target.value })); }
  function handleSave() {
    if (editing) setItems(p => p.map(i => i.codigo === editing.codigo ? { ...i, ...form } as Examen : i));
    else setItems(p => [...p, form as Examen]);
    setOpen(false);
  }

  return (
    <div className="space-y-5 max-w-5xl mx-auto">
      {/* Hero banner */}
      <div className="relative h-40 rounded-2xl overflow-hidden shadow-md bg-rose-800">
        <img src={IMG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-rose-900/95 via-rose-800/75 to-red-600/40" />
        <div className="relative h-full flex items-center justify-between px-6">
          <div className="text-white">
            <div className="flex items-center gap-3 mb-1.5">
              <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold">Exámenes</h1>
            </div>
            <p className="text-white/60 text-sm">{items.length} exámenes registrados · Laboratorio Quito</p>
          </div>
          <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 bg-white text-rose-700 rounded-xl text-sm font-semibold shadow-lg hover:bg-rose-50 transition-colors">
            <Plus className="w-4 h-4" /> Nuevo examen
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Código', 'Tipo', 'Descripción', 'Resultado', 'Fecha', 'Observaciones', 'Consulta'].map(c => (
                  <th key={c} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">{c}</th>
                ))}
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wide">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map(e => (
                <tr key={e.codigo} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gray-400">{e.codigo}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 bg-rose-50 text-rose-700 rounded-full text-xs font-medium">{e.tipo}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-900 max-w-[150px] truncate font-medium">{e.descripcion}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${resultadoColors[e.resultado] ?? 'bg-orange-100 text-orange-700'}`}>
                      {e.resultado}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{e.fecha}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs max-w-[180px] truncate">{e.observaciones}</td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-400">{e.consultaCodigo}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(e)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 mr-1"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => setDeleteId(e.codigo)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Editar examen' : 'Nuevo examen'} onSave={handleSave}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div><label className={lbl}>Código</label><input className={inp} value={form.codigo ?? ''} onChange={f('codigo')} /></div>
            <div>
              <label className={lbl}>Tipo</label>
              <select className={inp} value={form.tipo ?? ''} onChange={f('tipo')}>
                {tiposExamen.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={lbl}>Fecha</label><input type="date" className={inp} value={form.fecha ?? ''} onChange={f('fecha')} /></div>
            <div><label className={lbl}>Código consulta</label><input className={inp} value={form.consultaCodigo ?? ''} onChange={f('consultaCodigo')} /></div>
          </div>
          <div><label className={lbl}>Descripción</label><input className={inp} value={form.descripcion ?? ''} onChange={f('descripcion')} /></div>
          <div><label className={lbl}>Resultado</label><input className={inp} value={form.resultado ?? ''} onChange={f('resultado')} /></div>
          <div><label className={lbl}>Observaciones</label><textarea rows={3} className={inp} value={form.observaciones ?? ''} onChange={f('observaciones')} /></div>
        </div>
      </Modal>

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Eliminar examen" onSave={() => { setItems(p => p.filter(i => i.codigo !== deleteId)); setDeleteId(null); }} saveLabel="Eliminar" saveDanger>
        <p className="text-sm text-gray-600">¿Seguro que deseas eliminar este examen?</p>
      </Modal>
    </div>
  );
}
