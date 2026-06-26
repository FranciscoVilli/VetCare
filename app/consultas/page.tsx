'use client';
import { useState, useEffect } from 'react';
import { useNode } from '@/lib/context';
import Modal from '@/components/Modal';
import { Plus, Pencil, Trash2, ClipboardList } from 'lucide-react';
import { consultas as mockConsultas, Consulta } from '@/lib/mockData';

const IMG = 'https://images.unsplash.com/photo-1516926842747-7f9a7ede9cfe?w=1200&q=80';
const inp = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none';
const lbl = 'block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1';

export default function ConsultasPage() {
  const { node } = useNode();
  const [items, setItems] = useState<Consulta[]>(mockConsultas[node]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Consulta | null>(null);
  const [form, setForm] = useState<Partial<Consulta>>({});
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    setItems(mockConsultas[node]);
    setOpen(false); setEditing(null); setDeleteId(null);
  }, [node]);

  const sedeCode = node === 'quito' ? 'S001' : 'S002';
  const nodeLabel = node === 'quito' ? 'Quito' : 'Cuenca';

  function openCreate() {
    const nextNum = items.length + (node === 'quito' ? 1 : 5);
    setEditing(null);
    setForm({ codigo: `C00${nextNum}`, fecha: '', hora: '', motivo: '', diagnostico: '', tratamiento: '', veterinarioCedula: '', mascotaCodigo: '', sedeCodigo: sedeCode });
    setOpen(true);
  }
  function openEdit(c: Consulta) { setEditing(c); setForm(c); setOpen(true); }
  function f(k: keyof Consulta) { return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(p => ({ ...p, [k]: e.target.value })); }
  function handleSave() {
    if (editing) setItems(p => p.map(i => i.codigo === editing.codigo ? { ...i, ...form } as Consulta : i));
    else setItems(p => [...p, { ...form, sedeCodigo: sedeCode } as Consulta]);
    setOpen(false);
  }

  return (
    <div className="space-y-5 max-w-6xl mx-auto">
      {/* Hero banner */}
      <div className="relative h-40 rounded-2xl overflow-hidden shadow-md bg-teal-800">
        <img src={IMG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/95 via-teal-800/75 to-cyan-600/40" />
        <div className="relative h-full flex items-center justify-between px-6">
          <div className="text-white">
            <div className="flex items-center gap-3 mb-1.5">
              <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold">Consultas</h1>
            </div>
            <p className="text-white/60 text-sm">{items.length} consultas registradas · Sede {nodeLabel}</p>
          </div>
          <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 bg-white text-teal-700 rounded-xl text-sm font-semibold shadow-lg hover:bg-teal-50 transition-colors">
            <Plus className="w-4 h-4" /> Nueva consulta
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Código', 'Fecha', 'Hora', 'Motivo', 'Diagnóstico', 'Tratamiento', 'Veterinario', 'Mascota'].map(c => (
                  <th key={c} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">{c}</th>
                ))}
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wide">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map(c => (
                <tr key={c.codigo} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gray-400">{c.codigo}</td>
                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{c.fecha}</td>
                  <td className="px-4 py-3 text-gray-500">{c.hora}</td>
                  <td className="px-4 py-3 text-gray-900 max-w-[130px] truncate font-medium">{c.motivo}</td>
                  <td className="px-4 py-3 text-gray-600 max-w-[140px] truncate">{c.diagnostico}</td>
                  <td className="px-4 py-3 text-gray-500 max-w-[150px] truncate">{c.tratamiento}</td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-400">{c.veterinarioCedula}</td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-400">{c.mascotaCodigo}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(c)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 mr-1"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => setDeleteId(c.codigo)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Editar consulta' : 'Nueva consulta'} onSave={handleSave}>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div><label className={lbl}>Código</label><input className={inp} value={form.codigo ?? ''} onChange={f('codigo')} /></div>
            <div><label className={lbl}>Fecha</label><input type="date" className={inp} value={form.fecha ?? ''} onChange={f('fecha')} /></div>
            <div><label className={lbl}>Hora</label><input type="time" className={inp} value={form.hora ?? ''} onChange={f('hora')} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={lbl}>Cédula veterinario</label><input className={inp} value={form.veterinarioCedula ?? ''} onChange={f('veterinarioCedula')} /></div>
            <div><label className={lbl}>Código mascota</label><input className={inp} value={form.mascotaCodigo ?? ''} onChange={f('mascotaCodigo')} /></div>
          </div>
          <div><label className={lbl}>Motivo</label><textarea rows={2} className={inp} value={form.motivo ?? ''} onChange={f('motivo')} /></div>
          <div><label className={lbl}>Diagnóstico</label><textarea rows={2} className={inp} value={form.diagnostico ?? ''} onChange={f('diagnostico')} /></div>
          <div><label className={lbl}>Tratamiento</label><textarea rows={2} className={inp} value={form.tratamiento ?? ''} onChange={f('tratamiento')} /></div>
          <div className="p-3 bg-gray-50 rounded-lg text-xs text-gray-500">
            Sede asignada: <strong>{sedeCode} — {nodeLabel}</strong>
          </div>
        </div>
      </Modal>

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Eliminar consulta" onSave={() => { setItems(p => p.filter(i => i.codigo !== deleteId)); setDeleteId(null); }} saveLabel="Eliminar" saveDanger>
        <p className="text-sm text-gray-600">¿Seguro que deseas eliminar esta consulta?</p>
      </Modal>
    </div>
  );
}
