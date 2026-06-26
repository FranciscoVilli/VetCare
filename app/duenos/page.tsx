'use client';
import { useState, useEffect } from 'react';
import { useNode } from '@/lib/context';
import Modal from '@/components/Modal';
import { Plus, Pencil, Trash2, Users } from 'lucide-react';
import { duenos as mockDuenos, Dueno } from '@/lib/mockData';

const IMG = 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200&q=80';
const inp = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none';
const lbl = 'block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1';

export default function DuenosPage() {
  const { node } = useNode();
  const [items, setItems] = useState<Dueno[]>(mockDuenos[node]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Dueno | null>(null);
  const [form, setForm] = useState<Partial<Dueno>>({});
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    setItems(mockDuenos[node]);
    setOpen(false); setEditing(null); setDeleteId(null);
  }, [node]);

  const sedeCode = node === 'quito' ? 'S001' : 'S002';
  const nodeLabel = node === 'quito' ? 'Quito' : 'Cuenca';

  function openCreate() {
    setEditing(null);
    setForm({ cedula: '', nombre: '', apellido: '', telefono: '', correo: '', ciudad: nodeLabel, sedeCodigo: sedeCode });
    setOpen(true);
  }
  function openEdit(d: Dueno) { setEditing(d); setForm(d); setOpen(true); }
  function f(k: keyof Dueno) { return (e: React.ChangeEvent<HTMLInputElement>) => setForm(p => ({ ...p, [k]: e.target.value })); }
  function handleSave() {
    if (editing) setItems(p => p.map(i => i.cedula === editing.cedula ? { ...i, ...form } as Dueno : i));
    else setItems(p => [...p, { ...form, sedeCodigo: sedeCode } as Dueno]);
    setOpen(false);
  }

  return (
    <div className="space-y-5 max-w-5xl mx-auto">
      {/* Hero banner */}
      <div className="relative h-40 rounded-2xl overflow-hidden shadow-md bg-violet-800">
        <img src={IMG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-r from-violet-900/95 via-violet-800/75 to-purple-600/40" />
        <div className="relative h-full flex items-center justify-between px-6">
          <div className="text-white">
            <div className="flex items-center gap-3 mb-1.5">
              <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold">Dueños</h1>
            </div>
            <p className="text-white/60 text-sm">{items.length} propietarios registrados · Sede {nodeLabel}</p>
          </div>
          <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 bg-white text-violet-700 rounded-xl text-sm font-semibold shadow-lg hover:bg-violet-50 transition-colors">
            <Plus className="w-4 h-4" /> Nuevo dueño
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Cédula', 'Nombre', 'Apellido', 'Teléfono', 'Correo', 'Ciudad', 'Sede'].map(c => (
                  <th key={c} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">{c}</th>
                ))}
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wide">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map(d => (
                <tr key={d.cedula} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gray-400">{d.cedula}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">{d.nombre}</td>
                  <td className="px-4 py-3 text-gray-700">{d.apellido}</td>
                  <td className="px-4 py-3 text-gray-500">{d.telefono}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{d.correo}</td>
                  <td className="px-4 py-3 text-gray-600">{d.ciudad}</td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-400">{d.sedeCodigo}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(d)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 mr-1"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => setDeleteId(d.cedula)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Editar dueño' : 'Nuevo dueño'} onSave={handleSave}>
        <div className="space-y-4">
          <div><label className={lbl}>Cédula</label><input className={inp} value={form.cedula ?? ''} onChange={f('cedula')} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={lbl}>Nombre</label><input className={inp} value={form.nombre ?? ''} onChange={f('nombre')} /></div>
            <div><label className={lbl}>Apellido</label><input className={inp} value={form.apellido ?? ''} onChange={f('apellido')} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={lbl}>Teléfono</label><input className={inp} value={form.telefono ?? ''} onChange={f('telefono')} /></div>
            <div><label className={lbl}>Ciudad</label><input className={inp} value={form.ciudad ?? ''} onChange={f('ciudad')} /></div>
          </div>
          <div><label className={lbl}>Correo electrónico</label><input type="email" className={inp} value={form.correo ?? ''} onChange={f('correo')} /></div>
          <div className="p-3 bg-gray-50 rounded-lg text-xs text-gray-500">
            Sede asignada: <strong>{sedeCode} — {nodeLabel}</strong>
          </div>
        </div>
      </Modal>

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Eliminar dueño" onSave={() => { setItems(p => p.filter(i => i.cedula !== deleteId)); setDeleteId(null); }} saveLabel="Eliminar" saveDanger>
        <p className="text-sm text-gray-600">¿Seguro que deseas eliminar este registro?</p>
      </Modal>
    </div>
  );
}
