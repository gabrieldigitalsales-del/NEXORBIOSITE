import { supabase, getSupabaseConfigStatus } from './supabaseClient';

export const TABLES = {
  HeroSlide: 'nexor_biosite_hero_slides',
  Service: 'nexor_biosite_services',
  FaqItem: 'nexor_biosite_faq_items',
  PlanItem: 'nexor_biosite_plan_items',
  SiteContent: 'nexor_biosite_site_content',
};

const READABLE_NAMES = {
  [TABLES.HeroSlide]: 'slides do carrossel',
  [TABLES.Service]: 'servicos',
  [TABLES.FaqItem]: 'FAQ',
  [TABLES.PlanItem]: 'planos',
  [TABLES.SiteContent]: 'configuracoes gerais',
};

function normalizeNumber(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function cleanPayload(payload = {}) {
  const copy = { ...payload };
  delete copy.id;
  delete copy.created_at;
  delete copy.updated_at;

  if ('order' in copy) copy.order = normalizeNumber(copy.order, 1);
  if ('active' in copy) copy.active = Boolean(copy.active);
  if ('featured' in copy) copy.featured = Boolean(copy.featured);
  if ('features' in copy && !Array.isArray(copy.features)) copy.features = [];

  Object.keys(copy).forEach((key) => {
    if (copy[key] === undefined) delete copy[key];
  });

  return copy;
}

function buildErrorMessage(error, tableName) {
  const tableLabel = READABLE_NAMES[tableName] || tableName;
  const parts = [error?.message, error?.details, error?.hint, error?.code].filter(Boolean);
  const raw = parts.join(' | ') || 'Erro desconhecido do Supabase.';

  if (raw.includes('relation') && raw.includes('does not exist')) {
    return `A tabela de ${tableLabel} ainda nao existe no Supabase. Rode o arquivo supabase/schema.sql inteiro no SQL Editor.`;
  }
  if (raw.includes('permission denied') || raw.includes('row-level security')) {
    return `O Supabase bloqueou a gravacao em ${tableLabel}. Rode novamente o supabase/schema.sql inteiro para criar as permissoes/RLS.`;
  }
  if (raw.includes('JWT') || raw.includes('Invalid API key')) {
    return 'A chave VITE_SUPABASE_ANON_KEY esta errada ou ausente na Vercel.';
  }
  return raw;
}

async function unwrap(result, tableName) {
  if (result.error) {
    const err = new Error(buildErrorMessage(result.error, tableName));
    err.original = result.error;
    throw err;
  }
  return result.data;
}

function table(tableName) {
  return supabase.from(tableName);
}

export function entity(tableName) {
  return {
    async list(orderBy = 'order', limit = 100) {
      let query = table(tableName).select('*');
      if (orderBy) query = query.order(orderBy, { ascending: true, nullsFirst: false });
      if (limit) query = query.limit(limit);
      return unwrap(await query, tableName);
    },

    async create(payload) {
      const cleaned = cleanPayload(payload);
      return unwrap(await table(tableName).insert(cleaned).select('*').single(), tableName);
    },

    async update(id, payload) {
      if (!id) throw new Error('ID ausente para atualizar registro.');
      const cleaned = cleanPayload(payload);
      return unwrap(await table(tableName).update(cleaned).eq('id', id).select('*').single(), tableName);
    },

    async delete(id) {
      if (!id) throw new Error('ID ausente para excluir registro.');
      return unwrap(await table(tableName).delete().eq('id', id), tableName);
    },
  };
}

async function upsertSiteContent(items) {
  const payload = items.map((item) => cleanPayload(item));
  return unwrap(
    await table(TABLES.SiteContent)
      .upsert(payload, { onConflict: 'section,key' })
      .select('*'),
    TABLES.SiteContent
  );
}

async function testSupabaseWrite() {
  const status = getSupabaseConfigStatus();
  if (!status.configured) {
    throw new Error('Supabase nao configurado. Confira VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY na Vercel.');
  }

  const probeKey = `probe_${Date.now()}`;
  const created = await cms.entities.SiteContent.create({
    section: 'system',
    key: probeKey,
    value: 'ok',
    value_type: 'text',
  });
  await cms.entities.SiteContent.delete(created.id);
  return true;
}

async function testTables() {
  const results = {};
  for (const [name, tableName] of Object.entries(TABLES)) {
    try {
      await entity(tableName).list(null, 1);
      results[name] = { ok: true, table: tableName };
    } catch (error) {
      results[name] = { ok: false, table: tableName, error: error.message };
    }
  }
  return results;
}

export const cms = {
  tables: TABLES,
  entities: {
    HeroSlide: entity(TABLES.HeroSlide),
    Service: entity(TABLES.Service),
    FaqItem: entity(TABLES.FaqItem),
    PlanItem: entity(TABLES.PlanItem),
    SiteContent: entity(TABLES.SiteContent),
  },
  upsertSiteContent,
  testSupabaseWrite,
  testTables,
};
