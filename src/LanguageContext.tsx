
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations, dishTranslations, categoryTranslations, zoneTranslations } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['en']) => string;
  td: (dishName: string) => string;
  tc: (categoryName: string) => string;
  tz: (zoneName: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('dhruvtaara_language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('dhruvtaara_language', language);
  }, [language]);

  const t = (key: keyof typeof translations['en']): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  const td = (dishName: string): string => {
    if (language === 'en') return dishName;
    return dishTranslations[dishName] || dishName;
  };

  const tc = (categoryName: string): string => {
    if (language === 'en') return categoryName;
    return categoryTranslations[categoryName] || categoryName;
  };

  const tz = (zoneName: string): string => {
    if (language === 'en') return zoneName;
    return zoneTranslations[zoneName] || zoneName;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, td, tc, tz }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
