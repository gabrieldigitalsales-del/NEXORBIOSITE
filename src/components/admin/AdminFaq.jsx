import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { cms } from '@/api/cmsService';
import { useFaqItems } from '@/lib/useSiteData';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { runAdminAction, refreshQueries } from './adminUtils';

const empty = { question: '', answer: '', order: 1, active: true };

export default function AdminFaq() {
  const { data: items } = useFaqItems();
  const qc = useQueryClient();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  const refresh = () => refreshQueries(qc, ['faq-items']);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const openNew = () => { setForm({ ...empty, order: (items?.length || 0) + 1 }); setEditing('new'); };
  const openEdit = (item) => { setForm({ ...item }); setEditing(item.id); };
  const cancel = () => setEditing(null);

  const save = async () => {
    setSaving(true);
    try {
      await runAdminAction(async () => {
        if (editing === 'new') await cms.entities.FaqItem.create(form);
        else await cms.entities.FaqItem.update(editing, form);
      }, { onSuccess: refresh, successMessage: 'FAQ salvo e publicado no Supabase.' });
      setEditing(null);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!confirm('Excluir esta pergunta?')) return;
    await runAdminAction(() => cms.entities.FaqItem.delete(id), { onSuccess: refresh, successMessage: 'Pergunta excluida.' });
  };

  const toggleActive = async (item) => {
    await runAdminAction(() => cms.entities.FaqItem.update(item.id, { active: !item.active }), { onSuccess: refresh, successMessage: 'Status atualizado.' });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-playfair font-bold text-foreground">Perguntas Frequentes (FAQ)</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Gerencie as dúvidas exibidas na página inicial.</p>
        </div>
        <Button onClick={openNew} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full gap-1.5">
          <Plus className="w-4 h-4" /> Nova pergunta
        </Button>
      </div>

      {editing !== null && (
        <div className="bg-card border border-border rounded-2xl p-6 mb-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-5">{editing === 'new' ? 'Nova Pergunta' : 'Editar Pergunta'}</h3>
          <div className="space-y-4">
            <Field label="Pergunta" value={form.question} onChange={v => set('question', v)} />
            <Field label="Resposta" value={form.answer} onChange={v => set('answer', v)} multiline />
            <Field label="Ordem" value={String(form.order)} onChange={v => set('order', Number(v))} type="number" />
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
        {[...(items || [])].sort((a, b) => a.order - b.order).map(item => (
          <div key={item.id} className={`flex items-start gap-4 p-4 rounded-2xl border border-border bg-card ${!item.active ? 'opacity-50' : ''}`}>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground text-sm">{item.question}</p>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.answer}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => toggleActive(item)} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                {item.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                <Pencil className="w-4 h-4" />
              </button>
              <button onClick={() => remove(item.id)} className="p-1.5 rounded-lg hover:bg-red-100 text-muted-foreground hover:text-red-600 transition-colors">
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