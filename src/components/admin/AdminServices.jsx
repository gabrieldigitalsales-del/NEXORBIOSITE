import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { cms } from '@/api/cmsService';
import { useServices } from '@/lib/useSiteData';
import { Plus, Pencil, Trash2, Eye, EyeOff, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageUpload from './ImageUpload';

const BG_OPTIONS = [
  'from-amber-50 to-orange-50',
  'from-rose-50 to-pink-50',
  'from-violet-50 to-purple-50',
  'from-sky-50 to-blue-50',
  'from-emerald-50 to-teal-50',
  'from-yellow-50 to-amber-50',
];

const BADGE_OPTIONS = [
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-violet-100 text-violet-700',
  'bg-sky-100 text-sky-700',
  'bg-emerald-100 text-emerald-700',
];

const empty = { tag: '', title: '', desc: '', features: [''], wamsg: '', bg_color: 'from-amber-50 to-orange-50', badge_color: 'bg-amber-100 text-amber-700', icon_name: 'LayoutGrid', order: 1, active: true };

export default function AdminServices() {
  const { data: services } = useServices();
  const qc = useQueryClient();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  const refresh = () => qc.invalidateQueries({ queryKey: ['services'] });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const openNew = () => { setForm({ ...empty, order: (services?.length || 0) + 1 }); setEditing('new'); };
  const openEdit = (s) => { setForm({ ...s, features: [...(s.features || [])] }); setEditing(s.id); };
  const cancel = () => setEditing(null);

  const save = async () => {
    setSaving(true);
    const data = { ...form, features: form.features.filter(f => f.trim()) };
    if (editing === 'new') await cms.entities.Service.create(data);
    else await cms.entities.Service.update(editing, data);
    await refresh();
    setSaving(false);
    setEditing(null);
  };

  const remove = async (id) => {
    if (!confirm('Excluir este serviço?')) return;
    await cms.entities.Service.delete(id);
    refresh();
  };

  const toggleActive = async (s) => {
    await cms.entities.Service.update(s.id, { active: !s.active });
    refresh();
  };

  const addFeature = () => set('features', [...form.features, '']);
  const setFeature = (i, v) => set('features', form.features.map((f, idx) => idx === i ? v : f));
  const removeFeature = (i) => set('features', form.features.filter((_, idx) => idx !== i));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-playfair font-bold text-foreground">Serviços</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Gerencie os serviços exibidos na página de serviços.</p>
        </div>
        <Button onClick={openNew} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full gap-1.5">
          <Plus className="w-4 h-4" /> Novo serviço
        </Button>
      </div>

      {editing !== null && (
        <div className="bg-card border border-border rounded-2xl p-6 mb-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-5">{editing === 'new' ? 'Novo Serviço' : 'Editar Serviço'}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Tag (ex: Biosite)" value={form.tag} onChange={v => set('tag', v)} />
            <Field label="Título" value={form.title} onChange={v => set('title', v)} />
            <div className="sm:col-span-2">
              <Field label="Descrição" value={form.desc} onChange={v => set('desc', v)} multiline />
            </div>
            <div className="sm:col-span-2">
              <Field label="Mensagem WhatsApp (encoded)" value={form.wamsg} onChange={v => set('wamsg', v)} />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground mb-1.5 block">Cor de fundo</label>
              <div className="flex flex-wrap gap-2">
                {BG_OPTIONS.map(bg => (
                  <button key={bg} onClick={() => set('bg_color', bg)}
                    className={`w-8 h-8 rounded-lg bg-gradient-to-br ${bg} border-2 transition-all ${form.bg_color === bg ? 'border-primary scale-110' : 'border-transparent'}`} />
                ))}
              </div>
            </div>
            <Field label="Ordem" value={String(form.order)} onChange={v => set('order', Number(v))} type="number" />
          </div>

          <div className="mt-4">
            <label className="text-xs font-medium text-foreground mb-2 block">Itens inclusos</label>
            <div className="space-y-2">
              {form.features.map((f, i) => (
                <div key={i} className="flex gap-2">
                  <input value={f} onChange={e => setFeature(i, e.target.value)} placeholder={`Item ${i + 1}`}
                    className="flex-1 px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  <button onClick={() => removeFeature(i)} className="p-2 rounded-xl hover:bg-red-100 text-muted-foreground hover:text-red-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button onClick={addFeature} className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 font-medium">
                <Plus className="w-4 h-4" /> Adicionar item
              </button>
            </div>
          </div>

          <div className="flex gap-3 mt-5">
            <Button onClick={save} disabled={saving} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl">
              {saving ? 'Salvando...' : 'Salvar'}
            </Button>
            <Button variant="outline" onClick={cancel} className="rounded-xl">Cancelar</Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {[...(services || [])].sort((a, b) => a.order - b.order).map(s => (
          <div key={s.id} className={`flex items-center gap-4 p-4 rounded-2xl border bg-gradient-to-r ${s.bg_color} ${!s.active ? 'opacity-50' : ''}`}>
            <div className="flex-1 min-w-0">
              <span className={`text-xs font-bold tracking-widest uppercase px-2 py-0.5 rounded-full ${s.badge_color}`}>{s.tag}</span>
              <p className="text-sm font-semibold text-foreground mt-1 truncate">{s.title}</p>
              <p className="text-xs text-muted-foreground truncate">{s.desc}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => toggleActive(s)} className="p-1.5 rounded-lg hover:bg-white/60 text-muted-foreground">
                {s.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg hover:bg-white/60 text-muted-foreground">
                <Pencil className="w-4 h-4" />
              </button>
              <button onClick={() => remove(s.id)} className="p-1.5 rounded-lg hover:bg-red-100 text-muted-foreground hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, multiline, type = 'text' }) {
  return (
    <div>
      <label className="text-xs font-medium text-foreground mb-1.5 block">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} rows={3}
          className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
      )}
    </div>
  );
}