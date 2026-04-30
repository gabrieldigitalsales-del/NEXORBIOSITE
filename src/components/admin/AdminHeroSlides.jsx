import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { cms } from '@/api/cmsService';
import { useHeroSlides } from '@/lib/useSiteData';
import { Plus, Pencil, Trash2, GripVertical, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageUpload from './ImageUpload';
import { runAdminAction, refreshQueries } from './adminUtils';

const BG_OPTIONS = [
  'from-amber-50 to-orange-50',
  'from-rose-50 to-pink-50',
  'from-violet-50 to-purple-50',
  'from-sky-50 to-blue-50',
  'from-emerald-50 to-teal-50',
  'from-yellow-50 to-amber-50',
];

const emptySlide = { tag: '', title: '', highlight: '', desc: '', cta: '', wamsg: '', image_url: '', bg_color: 'from-amber-50 to-orange-50', order: 1, active: true };

export default function AdminHeroSlides() {
  const { data: slides } = useHeroSlides();
  const qc = useQueryClient();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptySlide);
  const [saving, setSaving] = useState(false);

  const refresh = () => refreshQueries(qc, ['hero-slides']);

  const openNew = () => { setForm({ ...emptySlide, order: (slides?.length || 0) + 1 }); setEditing('new'); };
  const openEdit = (s) => { setForm({ ...s }); setEditing(s.id); };
  const cancel = () => setEditing(null);

  const save = async () => {
    setSaving(true);
    try {
      await runAdminAction(async () => {
        if (editing === 'new') {
          await cms.entities.HeroSlide.create(form);
        } else {
          await cms.entities.HeroSlide.update(editing, form);
        }
      }, { onSuccess: refresh, successMessage: 'Slide salvo e publicado no Supabase.' });
      setEditing(null);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!confirm('Excluir este slide?')) return;
    await runAdminAction(() => cms.entities.HeroSlide.delete(id), { onSuccess: refresh, successMessage: 'Slide excluido.' });
  };

  const toggleActive = async (s) => {
    await runAdminAction(() => cms.entities.HeroSlide.update(s.id, { active: !s.active }), { onSuccess: refresh, successMessage: 'Status do slide atualizado.' });
  };

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-playfair font-bold text-foreground">Slides do Carrossel</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Gerencie os slides da seção hero da página inicial.</p>
        </div>
        <Button onClick={openNew} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full gap-1.5">
          <Plus className="w-4 h-4" /> Novo slide
        </Button>
      </div>

      {/* Form */}
      {editing !== null && (
        <div className="bg-card border border-border rounded-2xl p-6 mb-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-5">{editing === 'new' ? 'Novo Slide' : 'Editar Slide'}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Tag (ex: Biosite)" value={form.tag} onChange={v => set('tag', v)} />
            <Field label="Título (parte 1)" value={form.title} onChange={v => set('title', v)} />
            <Field label="Destaque (parte em cor)" value={form.highlight} onChange={v => set('highlight', v)} />
            <Field label="Texto do botão (CTA)" value={form.cta} onChange={v => set('cta', v)} />
            <div className="sm:col-span-2">
              <Field label="Descrição" value={form.desc} onChange={v => set('desc', v)} multiline />
            </div>
            <div className="sm:col-span-2">
              <Field label="Mensagem WhatsApp (já encoded)" value={form.wamsg} onChange={v => set('wamsg', v)} />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground mb-1.5 block">Cor de fundo</label>
              <div className="flex flex-wrap gap-2">
                {BG_OPTIONS.map(bg => (
                  <button
                    key={bg}
                    onClick={() => set('bg_color', bg)}
                    className={`w-8 h-8 rounded-lg bg-gradient-to-br ${bg} border-2 transition-all ${form.bg_color === bg ? 'border-primary scale-110' : 'border-transparent'}`}
                  />
                ))}
              </div>
            </div>
            <Field label="Ordem" value={String(form.order)} onChange={v => set('order', Number(v))} type="number" />
            <div className="sm:col-span-2">
              <ImageUpload label="Imagem do slide (opcional)" value={form.image_url} onChange={v => set('image_url', v)} />
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

      {/* List */}
      <div className="space-y-3">
        {[...(slides || [])].sort((a, b) => a.order - b.order).map(s => (
          <div key={s.id} className={`flex items-center gap-4 p-4 rounded-2xl border bg-gradient-to-r ${s.bg_color} ${!s.active ? 'opacity-50' : ''}`}>
            <GripVertical className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            {s.image_url && <img src={s.image_url} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />}
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">{s.tag}</span>
              <p className="text-sm font-semibold text-foreground truncate">{s.title} <span className="text-primary">{s.highlight}</span></p>
              <p className="text-xs text-muted-foreground truncate">{s.desc}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => toggleActive(s)} className="p-1.5 rounded-lg hover:bg-white/60 text-muted-foreground hover:text-foreground transition-colors">
                {s.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg hover:bg-white/60 text-muted-foreground hover:text-foreground transition-colors">
                <Pencil className="w-4 h-4" />
              </button>
              <button onClick={() => remove(s.id)} className="p-1.5 rounded-lg hover:bg-red-100 text-muted-foreground hover:text-red-600 transition-colors">
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
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      )}
    </div>
  );
}