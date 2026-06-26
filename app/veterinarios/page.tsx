'use client';
import { useState, useEffect } from 'react';
import { useNode } from '@/lib/context';
import Modal from '@/components/Modal';
import { Plus, Pencil, Trash2, Stethoscope } from 'lucide-react';
import { veterinarios as mockVets, Veterinario } from '@/lib/mockData';

const IMG = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&q=80';
const inp = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none';
const lbl = 'block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1';
const especialidades = ['Medicina General', 'Cirugía', 'Dermatología', 'Ortopedia', 'Cardiología', 'Oftalmología', 'Nutrición'];

export default function VeterinariosPage() {
  const { node } = useNode();
  const [items, setItems] = useState<Veterinario[]>(mockVets[node]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Veterinario | null>(null);
  const [form, setForm] = useState<Partial<Veterinario>>({});
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    setItems(mockVets[node]);
    setOpen(false); setEditing(null); setDeleteId(null);
  }, [node]);

  const sedeCode = node === 'quito' ? 'S001' : 'S002';
  const nodeLabel = node === 'quito' ? 'Quito' : 'Cuenca';

  function openCreate() {
    setEditing(null);
    setForm({ cedula: '', nombre: '', telefono: '', especialidad: 'Medicina General', estado: 'Activo', sedeCodigo: sedeCode });
    setOpen(true);
  }
  function openEdit(v: Veterinario) { setEditing(v); setForm(v); setOpen(true); }
  function f(k: keyof Veterinario) { return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm(p => ({ ...p, [k]: e.target.value })); }
  function handleSave() {
    if (editing) setItems(p => p.map(i => i.cedula === editing.cedula ? { ...i, ...form } as Veterinario : i));
    else setItems(p => [...p, { ...form, sedeCodigo: sedeCode } as Veterinario]);
    setOpen(false);
  }

  return (
    <div className="space-y-5 max-w-5xl mx-auto">
      {/* Hero banner */}
      <div className="relative h-40 rounded-2xl overflow-hidden shadow-md bg-blue-800">
        <img src={IMG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-800/75 to-sky-600/40" />
        <div className="relative h-full flex items-center justify-between px-6">
          <div className="text-white">
            <div className="flex items-center gap-3 mb-1.5">
              <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold">Veterinarios</h1>
            </div>
            <p className="text-white/60 text-sm">{items.length} profesionales · Sede {nodeLabel}</p>
          </div>
          <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 bg-white text-blue-700 rounded-xl text-sm font-semibold shadow-lg hover:bg-blue-50 transition-colors">
            <Plus className="w-4 h-4" /> Nuevo veterinario
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Cédula', 'Nombre', 'Teléfono', 'Especialidad', 'Estado', 'Sede'].map(c => (
                  <th key={c} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">{c}</th>
                ))}
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wide">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map(v => (
                <tr key={v.cedula} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gray-400">{v.cedula}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">{v.nombre}</td>
                  <td className="px-4 py-3 text-gray-500">{v.telefono}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">{v.especialidad}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${v.estado === 'Activo' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                      {v.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-400">{v.sedeCodigo}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(v)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 mr-1"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => setDeleteId(v.cedula)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Editar veterinario' : 'Nuevo veterinario'} onSave={handleSave}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div><label className={lbl}>Cédula</label><input className={inp} value={form.cedula ?? ''} onChange={f('cedula')} /></div>
            <div><label className={lbl}>Teléfono</label><input className={inp} value={form.telefono ?? ''} onChange={f('telefono')} /></div>
          </div>
          <div><label className={lbl}>Nombre completo</label><input className={inp} value={form.nombre ?? ''} onChange={f('nombre')} /></div>
          <div>
            <label className={lbl}>Especialidad</label>
            <select className={inp} value={form.especialidad ?? ''} onChange={f('especialidad')}>
              {especialidades.map(e => <option key={e}>{e}</option>)}
            </select>
          </div>
          <div>
            <label className={lbl}>Estado</label>
            <select className={inp} value={form.estado ?? 'Activo'} onChange={f('estado')}>
              <option>Activo</option><option>Inactivo</option>
            </select>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg text-xs text-gray-500">
            Sede asignada: <strong>{sedeCode} — {nodeLabel}</strong>
          </div>
        </div>
      </Modal>

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Eliminar veterinario" onSave={() => { setItems(p => p.filter(i => i.cedula !== deleteId)); setDeleteId(null); }} saveLabel="Eliminar" saveDanger>
        <p className="text-sm text-gray-600">¿Seguro que deseas eliminar este registro?</p>
      </Modal>
    </div>
  );
}
