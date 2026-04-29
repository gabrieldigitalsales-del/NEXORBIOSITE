import { useQuery } from '@tanstack/react-query';
import { cms } from '@/api/cmsService';

const QUERY_OPTIONS = {
  staleTime: 1000 * 60 * 5,
  retry: 1,
};

export function useHeroSlides() {
  return useQuery({
    queryKey: ['hero-slides'],
    queryFn: () => cms.entities.HeroSlide.list('order', 50),
    initialData: [],
    ...QUERY_OPTIONS,
  });
}

export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: () => cms.entities.Service.list('order', 50),
    initialData: [],
    ...QUERY_OPTIONS,
  });
}

export function useFaqItems() {
  return useQuery({
    queryKey: ['faq-items'],
    queryFn: () => cms.entities.FaqItem.list('order', 50),
    initialData: [],
    ...QUERY_OPTIONS,
  });
}

export function usePlanItems() {
  return useQuery({
    queryKey: ['plan-items'],
    queryFn: () => cms.entities.PlanItem.list('order', 50),
    initialData: [],
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
    initialData: {},
    ...QUERY_OPTIONS,
  });
}
