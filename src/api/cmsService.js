import { supabase, SUPABASE_SCHEMA } from './supabaseClient';

const TABLES = {
  HeroSlide: 'hero_slides',
  Service: 'services',
  FaqItem: 'faq_items',
  PlanItem: 'plan_items',
  SiteContent: 'site_content',
};

function cleanPayload(payload = {}) {
  const copy = { ...payload };
  delete copy.id;
  delete copy.created_at;
  delete copy.updated_at;
  return copy;
}

async function assertNoError(result) {
  if (result.error) throw result.error;
  return result.data;
}

function table(tableName) {
  return supabase.schema(SUPABASE_SCHEMA).from(tableName);
}

export function entity(tableName) {
  return {
    async list(orderBy = 'order', limit = 100) {
      let query = table(tableName).select('*');
      if (orderBy) query = query.order(orderBy, { ascending: true });
      if (limit) query = query.limit(limit);
      return assertNoError(await query);
    },

    async create(payload) {
      return assertNoError(
        await table(tableName).insert(cleanPayload(payload)).select().single()
      );
    },

    async update(id, payload) {
      return assertNoError(
        await table(tableName).update(cleanPayload(payload)).eq('id', id).select().single()
      );
    },

    async delete(id) {
      return assertNoError(await table(tableName).delete().eq('id', id));
    },
  };
}

export const cms = {
  schema: SUPABASE_SCHEMA,
  tables: TABLES,
  entities: {
    HeroSlide: entity(TABLES.HeroSlide),
    Service: entity(TABLES.Service),
    FaqItem: entity(TABLES.FaqItem),
    PlanItem: entity(TABLES.PlanItem),
    SiteContent: entity(TABLES.SiteContent),
  },
};
