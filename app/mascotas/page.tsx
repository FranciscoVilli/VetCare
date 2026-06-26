'use client';
import { useState, useEffect } from 'react';
import { useNode } from '@/lib/context';
import Modal from '@/components/Modal';
import { Plus, Pencil, Trash2, PawPrint } from 'lucide-react';
import { mascotas as mockMascotas, Mascota } from '@/lib/mockData';

const IMG = 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&q=80';
const inp = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none';
const lbl = 'block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1';

const especieColors: Record<string, string> = {
  Perro:  'bg-amber-100 text-amber-700',
  Gato:   'bg-purple-100 text-purple-700',
  Ave:    'bg-sky-100 text-sky-700',
  Reptil: 'bg-green-100 text-green-700',
};

export default function MascotasPage() {
  const { node } = useNode();
  const [items, setItems] = useState<Mascota[]>(mockMascotas[node]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Mascota | null>(null);
  const [form, setForm] = useState<Partial<Mascota>>({});
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    setItems(mockMascotas[node]);
    setOpen(false); setEditing(null); setDeleteId(null);
  }, [node]);

  const sedeCode = node === 'quito' ? 'S001' : 'S002';
  const nodeLabel = node === 'quito' ? 'Quito' : 'Cuenca';

  function openCreate() {
    setEditing(null);
    setForm({ codigo: `M0${10 + items.length}`, nombre: '', especie: 'Perro', raza: '', fechaNacimiento: '', duenoCedula: '', sedeCodigo: sedeCode });
    setOpen(true);
  }
  function openEdit(m: Mascota) { setEditing(m); setForm(m); setOpen(true); }
  function f(k: keyof Mascota) { return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm(p => ({ ...p, [k]: e.target.value })); }
  function handleSave() {
    if (editing) setItems(p => p.map(i => i.codigo === editing.codigo ? { ...i, ...form } as Mascota : i));
    else setItems(p => [...p, { ...form, sedeCodigo: sedeCode } as Mascota]);
    setOpen(false);
  }

  return (
    <div className="space-y-5 max-w-5xl mx-auto">
      {/* Hero banner */}
      <div className="relative h-40 rounded-2xl overflow-hidden shadow-md bg-amber-700">
        <img src={IMG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/90 via-amber-800/70 to-orange-600/40" />
        <div className="relative h-full flex items-center justify-between px-6">
          <div className="text-white">
            <div className="flex items-center gap-3 mb-1.5">
              <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                <PawPrint className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold">Mascotas</h1>
            </div>
            <p className="text-white/60 text-sm">{items.length} pacientes · Sede {nodeLabel}</p>
          </div>
          <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 bg-white text-amber-700 rounded-xl text-sm font-semibold shadow-lg hover:bg-amber-50 transition-colors">
            <Plus className="w-4 h-4" /> Nueva mascota
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Código', 'Nombre', 'Especie', 'Raza', 'Fecha Nac.', 'Dueño', 'Sede'].map(c => (
                  <th key={c} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">{c}</th>
                ))}
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wide">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map(m => (
                <tr key={m.codigo} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gray-400">{m.codigo}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">{m.nombre}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${especieColors[m.especie] ?? 'bg-gray-100 text-gray-600'}`}>{m.especie}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{m.raza}</td>
                  <td className="px-4 py-3 text-gray-500">{m.fechaNacimiento}</td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-400">{m.duenoCedula}</td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-400">{m.sedeCodigo}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(m)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 mr-1"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => setDeleteId(m.codigo)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Editar mascota' : 'Nueva mascota'} onSave={handleSave}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className={lbl}>Código</label><input className={inp} value={form.codigo ?? ''} onChange={f('codigo')} /></div>
            <div><label className={lbl}>Nombre</label><input className={inp} value={form.nombre ?? ''} onChange={f('nombre')} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={lbl}>Especie</label>
              <select className={inp} value={form.especie ?? ''} onChange={f('especie')}>
                {['Perro', 'Gato', 'Ave', 'Reptil', 'Otro'].map(e => <option key={e}>{e}</option>)}
              </select>
            </div>
            <div><label className={lbl}>Raza</label><input className={inp} value={form.raza ?? ''} onChange={f('raza')} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={lbl}>Fecha de nacimiento</label><input type="date" className={inp} value={form.fechaNacimiento ?? ''} onChange={f('fechaNacimiento')} /></div>
            <div><label className={lbl}>Cédula del dueño</label><input className={inp} value={form.duenoCedula ?? ''} onChange={f('duenoCedula')} /></div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg text-xs text-gray-500">
            Sede asignada: <strong>{sedeCode} — {nodeLabel}</strong>
          </div>
        </div>
      </Modal>

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Eliminar mascota" onSave={() => { setItems(p => p.filter(i => i.codigo !== deleteId)); setDeleteId(null); }} saveLabel="Eliminar" saveDanger>
        <p className="text-sm text-gray-600">¿Seguro que deseas eliminar este registro?</p>
      </Modal>
    </div>
  );
}
