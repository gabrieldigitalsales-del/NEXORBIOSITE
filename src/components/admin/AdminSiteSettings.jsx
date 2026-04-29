import React, { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { cms } from '@/api/cmsService';
import { useSiteContent } from '@/lib/useSiteData';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageUpload from './ImageUpload';
import { toast } from 'sonner';

const SECTIONS = [
  { id: 'general', label: 'Geral', fields: [
    { key: 'whatsapp_number', label: 'Número do WhatsApp (com DDI, ex: 553198261608)', type: 'text' },
    { key: 'instagram_handle', label: 'Instagram (sem @)', type: 'text' },
    { key: 'logo_url', label: 'Logo', type: 'image' },
  ] },
  { id: 'hero', label: 'Seção Hero', fields: [
    { key: 'badge_text', label: 'Texto do badge acima do título', type: 'text' },
  ] },
  { id: 'cta', label: 'Seção CTA (Banner Final)', fields: [
    { key: 'title', label: 'Título principal', type: 'text' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text' },
    { key: 'button_text', label: 'Texto do botão', type: 'text' },
    { key: 'wamsg', label: 'Mensagem WhatsApp (encoded)', type: 'text' },
  ] },
  { id: 'footer', label: 'Rodapé', fields: [
    { key: 'tagline', label: 'Tagline da empresa', type: 'text' },
    { key: 'copyright', label: 'Texto de copyright', type: 'text' },
  ] },
  { id: 'process', label: 'Como Funciona', fields: [
    { key: 'title', label: 'Título da seção', type: 'text' },
    { key: 'subtitle', label: 'Subtítulo', type: 'text' },
    { key: 'step1_title', label: 'Passo 1 - Título', type: 'text' },
    { key: 'step1_desc', label: 'Passo 1 - Descrição', type: 'text' },
    { key: 'step2_title', label: 'Passo 2 - Título', type: 'text' },
    { key: 'step2_desc', label: 'Passo 2 - Descrição', type: 'text' },
    { key: 'step3_title', label: 'Passo 3 - Título', type: 'text' },
    { key: 'step3_desc', label: 'Passo 3 - Descrição', type: 'text' },
    { key: 'step4_title', label: 'Passo 4 - Título', type: 'text' },
    { key: 'step4_desc', label: 'Passo 4 - Descrição', type: 'text' },
  ] },
];

const getValueType = (type) => (type === 'image' ? 'image_url' : 'text');

export default function AdminSiteSettings() {
  const { data: settings, isLoading } = useSiteContent();
  const qc = useQueryClient();
  const [localSettings, setLocalSettings] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!settings) return;
    const flat = {};
    Object.entries(settings).forEach(([section, fields]) => {
      Object.entries(fields).forEach(([key, item]) => {
        flat[`${section}__${key}`] = item.value;
      });
    });
    setLocalSettings(flat);
  }, [settings]);

  const getValue = (section, key) => localSettings[`${section}__${key}`] ?? '';
  const setValue = (section, key, value) => setLocalSettings(prev => ({ ...prev, [`${section}__${key}`]: value }));

  const saveAll = async () => {
    setSaving(true);
    try {
      const promises = [];
      for (const section of SECTIONS) {
        for (const field of section.fields) {
          const existing = settings?.[section.id]?.[field.key];
          const payload = {
            section: section.id,
            key: field.key,
            value: getValue(section.id, field.key),
            value_type: getValueType(field.type),
          };
          promises.push(existing ? cms.entities.SiteContent.update(existing.id, payload) : cms.entities.SiteContent.create(payload));
        }
      }
      await Promise.all(promises);
      await qc.invalidateQueries({ queryKey: ['site-settings'] });
      toast.success('Configurações salvas!');
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Não foi possível salvar as configurações.');
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) return <div className="text-muted-foreground text-sm">Carregando...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-playfair font-bold text-foreground">Configurações Gerais</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Edite os textos e configurações do site.</p>
        </div>
        <Button onClick={saveAll} disabled={saving} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full gap-1.5">
          <Save className="w-4 h-4" /> {saving ? 'Salvando...' : 'Salvar tudo'}
        </Button>
      </div>

      <div className="space-y-6">
        {SECTIONS.map(section => (
          <div key={section.id} className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold text-foreground mb-4">{section.label}</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {section.fields.map(field => (
                <div key={field.key} className={field.type === 'image' ? 'sm:col-span-2' : ''}>
                  {field.type === 'image' ? (
                    <ImageUpload label={field.label} value={getValue(section.id, field.key)} onChange={v => setValue(section.id, field.key, v)} />
                  ) : (
                    <div>
                      <label className="text-xs font-medium text-foreground mb-1.5 block">{field.label}</label>
                      <input type="text" value={getValue(section.id, field.key)} onChange={e => setValue(section.id, field.key, e.target.value)} className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
