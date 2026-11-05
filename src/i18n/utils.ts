import es from './es.json';
import en from './en.json';

export const languages = {
  es: 'Español',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'es';

export const translations = { es, en } as const;

export type Translations = typeof es;

export function useTranslations(lang: Lang | string = defaultLang): Translations {
  const currentLang = (lang in translations ? lang : defaultLang) as Lang;
  return translations[currentLang] as Translations;
}

export function getLocalePath(targetLang: Lang, hash = ''): string {
  const base = targetLang === defaultLang ? '/' : `/${targetLang}/`;
  return hash ? `${base}${hash.startsWith('#') ? hash : '#' + hash}` : base;
}
