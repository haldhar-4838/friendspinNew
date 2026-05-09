import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  getTranslation,
  LANGUAGE_STORAGE_KEY,
  languageOptions,
} from '../lib/translations';

const LanguageContext = createContext(null);
const LANGUAGE_SESSION_KEY = 'truthdare-language-session-selected';

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

function hasSessionLanguageSelection() {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    return window.sessionStorage.getItem(LANGUAGE_SESSION_KEY) === 'true';
  } catch {
    return false;
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => readStoredLanguage());
  const [hasSelectedLanguage, setHasSelectedLanguage] = useState(() =>
    hasSessionLanguageSelection(),
  );

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    document.documentElement.lang = language || 'en';
    document.documentElement.dataset.language = language || 'en';
  }, [language]);

  const setLanguage = (nextLanguage) => {
    setLanguageState(nextLanguage);
    setHasSelectedLanguage(true);

    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    window.sessionStorage.setItem(LANGUAGE_SESSION_KEY, 'true');
  };

  const openLanguageGate = () => {
    setHasSelectedLanguage(false);

    if (typeof window === 'undefined') {
      return;
    }

    window.sessionStorage.removeItem(LANGUAGE_SESSION_KEY);
  };

  const value = useMemo(
    () => ({
      language: language || 'en',
      hasSelectedLanguage,
      openLanguageGate,
      setLanguage,
      languageOptions,
      t: (key, params) => getTranslation(language || 'en', key, params),
    }),
    [hasSelectedLanguage, language],
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
