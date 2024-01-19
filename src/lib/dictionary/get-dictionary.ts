import 'server-only';
import type { Locale } from '@/lib/i18n/i18n-config';

const dictionaries = {
  en: () => import('@/translations/en.json').then((module) => module.default),
  es: () => import('@/translations/es.json').then((module) => module.default),
  pt: () => import('@/translations/pt.json').then((module) => module.default)
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
