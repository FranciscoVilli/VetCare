'use client';
import { useState } from 'react';
import Modal from '@/components/Modal';
import { Plus, Pencil, Trash2, Building2 } from 'lucide-react';
import { sedes as initialSedes, Sede } from '@/lib/mockData';

const IMG = 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80';
const inp = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none';
const lbl = 'block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1';

export default function SedesPage() {
  const [items, setItems] = useState<Sede[]>(initialSedes);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Sede | null>(null);
  const [form, setForm] = useState<Partial<Sede>>({});
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function openCreate() {
    setEditing(null);
    setForm({ codigo: `S00${items.length + 1}`, nombre: '', ciudad: 'Quito', direccion: '' });
    setOpen(true);
  }
  function openEdit(s: Sede) { setEditing(s); setForm(s); setOpen(true); }
  function f(k: keyof Sede) { return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm(p => ({ ...p, [k]: e.target.value })); }
  function handleSave() {
    if (editing) setItems(p => p.map(i => i.codigo === editing.codigo ? { ...i, ...form } as Sede : i));
    else setItems(p => [...p, form as Sede]);
    setOpen(false);
  }

  return (
    <div className="space-y-5 max-w-4xl mx-auto">
      {/* Hero banner */}
      <div className="relative h-40 rounded-2xl overflow-hidden shadow-md bg-emerald-800">
        <img src={IMG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/95 via-emerald-800/80 to-teal-700/50" />
        <div className="relative h-full flex items-center justify-between px-6">
          <div className="text-white">
            <div className="flex items-center gap-3 mb-1.5">
              <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold">Sedes</h1>
            </div>
            <p className="text-white/60 text-sm">{items.length} sedes registradas</p>
          </div>
          <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 bg-white text-emerald-700 rounded-xl text-sm font-semibold shadow-lg hover:bg-emerald-50 transition-colors">
            <Plus className="w-4 h-4" /> Nueva sede
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Código', 'Nombre', 'Ciudad', 'Dirección'].map(c => (
                  <th key={c} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">{c}</th>
                ))}
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wide">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map(s => (
                <tr key={s.codigo} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gray-400">{s.codigo}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{s.nombre}</td>
                  <td className="px-4 py-3 text-gray-600">{s.ciudad}</td>
                  <td className="px-4 py-3 text-gray-500">{s.direccion}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 mr-1 transition-colors"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => setDeleteId(s.codigo)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Editar sede' : 'Nueva sede'} onSave={handleSave}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className={lbl}>Código</label><input className={inp} value={form.codigo ?? ''} onChange={f('codigo')} /></div>
            <div>
              <label className={lbl}>Ciudad</label>
              <select className={inp} value={form.ciudad ?? ''} onChange={f('ciudad')}>
                <option>Quito</option><option>Cuenca</option>
              </select>
            </div>
          </div>
          <div><label className={lbl}>Nombre</label><input className={inp} value={form.nombre ?? ''} onChange={f('nombre')} /></div>
          <div><label className={lbl}>Dirección</label><input className={inp} value={form.direccion ?? ''} onChange={f('direccion')} /></div>
        </div>
      </Modal>

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Eliminar sede" onSave={() => { setItems(p => p.filter(i => i.codigo !== deleteId)); setDeleteId(null); }} saveLabel="Eliminar" saveDanger>
        <p className="text-sm text-gray-600">¿Seguro que deseas eliminar esta sede? Esta acción no se puede deshacer.</p>
      </Modal>
    </div>
  );
}
