import es from './es.json';
import en from './en.json';
import fr from './fr.json';
import de from './de.json';
import ru from './ru.json';

export const languages = {
  es: 'Español',
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  ru: 'Русский',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'es';

export const translations = { es, en, fr, de, ru } as const;

export type Translations = typeof es;

export function useTranslations(lang: Lang | string = defaultLang): Translations {
  const currentLang = (lang in translations ? lang : defaultLang) as Lang;
  return translations[currentLang] as Translations;
}

export function getLocalePath(targetLang: Lang, hash = ''): string {
  const base = targetLang === defaultLang ? '/' : `/${targetLang}/`;
  return hash ? `${base}${hash.startsWith('#') ? hash : '#' + hash}` : base;
}
