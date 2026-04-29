import { supabase } from './supabaseClient';

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

export function entity(tableName) {
  return {
    async list(orderBy = 'order', limit = 100) {
      let query = supabase.from(tableName).select('*');
      if (orderBy) query = query.order(orderBy, { ascending: true });
      if (limit) query = query.limit(limit);
      return assertNoError(await query);
    },

    async create(payload) {
      return assertNoError(
        await supabase.from(tableName).insert(cleanPayload(payload)).select().single()
      );
    },

    async update(id, payload) {
      return assertNoError(
        await supabase.from(tableName).update(cleanPayload(payload)).eq('id', id).select().single()
      );
    },

    async delete(id) {
      return assertNoError(await supabase.from(tableName).delete().eq('id', id));
    },
  };
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
};
