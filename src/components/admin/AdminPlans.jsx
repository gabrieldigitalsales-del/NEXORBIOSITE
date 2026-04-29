import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { cms } from '@/api/cmsService';
import { usePlanItems } from '@/lib/useSiteData';
import { Plus, Pencil, Trash2, Eye, EyeOff, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const empty = { name: '', featured: false, features: [''], order: 1, active: true };

export default function AdminPlans() {
  const { data: plans } = usePlanItems();
  const qc = useQueryClient();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  const refresh = () => qc.invalidateQueries({ queryKey: ['plan-items'] });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const openNew = () => { setForm({ ...empty, order: (plans?.length || 0) + 1 }); setEditing('new'); };
  const openEdit = (p) => { setForm({ ...p, features: [...(p.features || [])] }); setEditing(p.id); };
  const cancel = () => setEditing(null);

  const save = async () => {
    setSaving(true);
    const data = { ...form, features: form.features.filter(f => f.trim()) };
    if (editing === 'new') await cms.entities.PlanItem.create(data);
    else await cms.entities.PlanItem.update(editing, data);
    await refresh();
    setSaving(false);
    setEditing(null);
  };

  const remove = async (id) => {
    if (!confirm('Excluir este plano?')) return;
    await cms.entities.PlanItem.delete(id);
    refresh();
  };

  const toggleActive = async (p) => {
    await cms.entities.PlanItem.update(p.id, { active: !p.active });
    refresh();
  };

  const addFeature = () => set('features', [...form.features, '']);
  const setFeature = (i, v) => set('features', form.features.map((f, idx) => idx === i ? v : f));
  const removeFeature = (i) => set('features', form.features.filter((_, idx) => idx !== i));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-playfair font-bold text-foreground">Planos</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Gerencie os planos exibidos na página inicial.</p>
        </div>
        <Button onClick={openNew} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full gap-1.5">
          <Plus className="w-4 h-4" /> Novo plano
        </Button>
      </div>

      {editing !== null && (
        <div className="bg-card border border-border rounded-2xl p-6 mb-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-5">{editing === 'new' ? 'Novo Plano' : 'Editar Plano'}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-foreground mb-1.5 block">Nome do plano</label>
              <input value={form.name} onChange={e => set('name', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground mb-1.5 block">Ordem</label>
              <input type="number" value={form.order} onChange={e => set('order', Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="featured" checked={form.featured} onChange={e => set('featured', e.target.checked)} className="rounded" />
              <label htmlFor="featured" className="text-sm text-foreground">Destaque (Mais escolhido)</label>
            </div>
          </div>

          <div className="mt-4">
            <label className="text-xs font-medium text-foreground mb-2 block">Funcionalidades</label>
            <div className="space-y-2">
              {form.features.map((f, i) => (
                <div key={i} className="flex gap-2">
                  <input value={f} onChange={e => setFeature(i, e.target.value)}
                    placeholder={`Funcionalidade ${i + 1}`}
                    className="flex-1 px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  <button onClick={() => removeFeature(i)} className="p-2 rounded-xl hover:bg-red-100 text-muted-foreground hover:text-red-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button onClick={addFeature} className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 font-medium">
                <Plus className="w-4 h-4" /> Adicionar funcionalidade
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...(plans || [])].sort((a, b) => a.order - b.order).map(p => (
          <div key={p.id} className={`p-5 rounded-2xl border bg-card ${p.featured ? 'border-primary/40 bg-primary/5' : 'border-border'} ${!p.active ? 'opacity-50' : ''}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-playfair font-bold text-foreground">{p.name}</h3>
                {p.featured && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">Destaque</span>}
              </div>
              <div className="flex gap-1.5">
                <button onClick={() => toggleActive(p)} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground">
                  {p.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => remove(p.id)} className="p-1.5 rounded-lg hover:bg-red-100 text-muted-foreground hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <ul className="space-y-1">
              {(p.features || []).map((f, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}