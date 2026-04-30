import { useQuery } from '@tanstack/react-query';
import { cms } from '@/api/cmsService';

// IMPORTANTE:
// Nao use initialData aqui. Com staleTime, o React Query considera o array inicial
// como dado valido e pode nao buscar o Supabase na primeira renderizacao.
// Isso fazia o front continuar exibindo os textos/imagens fallback mesmo depois de salvar no admin.
const QUERY_OPTIONS = {
  staleTime: 0,
  gcTime: 1000 * 60 * 10,
  retry: 1,
  refetchOnMount: 'always',
  refetchOnReconnect: true,
};

export function useHeroSlides() {
  return useQuery({
    queryKey: ['hero-slides'],
    queryFn: () => cms.entities.HeroSlide.list('order', 50),
    placeholderData: [],
    ...QUERY_OPTIONS,
  });
}

export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: () => cms.entities.Service.list('order', 50),
    placeholderData: [],
    ...QUERY_OPTIONS,
  });
}

export function useFaqItems() {
  return useQuery({
    queryKey: ['faq-items'],
    queryFn: () => cms.entities.FaqItem.list('order', 50),
    placeholderData: [],
    ...QUERY_OPTIONS,
  });
}

export function usePlanItems() {
  return useQuery({
    queryKey: ['plan-items'],
    queryFn: () => cms.entities.PlanItem.list('order', 50),
    placeholderData: [],
    ...QUERY_OPTIONS,
  });
}

export function useSiteContent() {
  return useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const items = await cms.entities.SiteContent.list(null, 500);
      const map = {};
      (items || []).forEach((item) => {
        if (!map[item.section]) map[item.section] = {};
        map[item.section][item.key] = { ...item };
      });
      return map;
    },
    placeholderData: {},
    ...QUERY_OPTIONS,
  });
}
