import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  getTranslation,
  LANGUAGE_STORAGE_KEY,
  languageOptions,
} from '../lib/translations';

const LanguageContext = createContext(null);

function readStoredLanguage() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => readStoredLanguage());

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    document.documentElement.lang = language || 'en';
    document.documentElement.dataset.language = language || 'en';
  }, [language]);

  const setLanguage = (nextLanguage) => {
    setLanguageState(nextLanguage);

    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
  };

  const value = useMemo(
    () => ({
      language: language || 'en',
      hasSelectedLanguage: Boolean(language),
      setLanguage,
      languageOptions,
      t: (key, params) => getTranslation(language || 'en', key, params),
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
}
