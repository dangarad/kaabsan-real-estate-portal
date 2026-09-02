import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Language, 
  TranslationDictionary, 
  translations, 
  loadMergedTranslations, 
  saveCustomTranslations as saveTranslationsUtil,
  resetTranslationsToDefault as resetTranslationsUtil
} from '../utils/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
  translationsData: Record<Language, TranslationDictionary>;
  isRTL: boolean;
  saveTranslations: (updated: Record<Language, TranslationDictionary>) => void;
  resetTranslations: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem('kaabsan_language');
      if (stored === 'en' || stored === 'so' || stored === 'ar') {
        return stored;
      }
      return 'en';
    } catch {
      return 'en';
    }
  });

  const [translationsData, setTranslationsData] = useState<Record<Language, TranslationDictionary>>(() => {
    return loadMergedTranslations();
  });

  useEffect(() => {
    const handleTranslationsUpdated = () => {
      setTranslationsData(loadMergedTranslations());
    };
    window.addEventListener('kaabsan_translations_updated', handleTranslationsUpdated);
    return () => window.removeEventListener('kaabsan_translations_updated', handleTranslationsUpdated);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('kaabsan_language', lang);
      document.documentElement.lang = lang;
      if (lang === 'ar') {
        document.documentElement.dir = 'rtl';
      } else {
        document.documentElement.dir = 'ltr';
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
    if (language === 'ar') {
      document.documentElement.dir = 'rtl';
      document.title = 'شركة كابسان العقارية | المجتمعات السكنية الفاخرة والفلل في هرجيسا - مجموعة تيليسوم';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', 'البوابة الرسمية لشركة كابسان العقارية (إحدى شركات مجموعة تيليسوم). استكشف مشاريع روغسان جاردنز، قرية أراغسان، بليكسان إستيت، وشقق مصلى الفاخرة في هرجيسا مع خيارات التمويل الإسلامي حتى 60 شهراً.');
      }
    } else if (language === 'so') {
      document.documentElement.dir = 'ltr';
      document.title = 'Kaabsan Real Estate | Guryaha Raaxada & Mashaariicda Casriga ah ee Hargeysa - Telesom Group';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', 'Bogga rasmiga ah ee Kaabsan Real Estate (Telesom Group). Ka dhex baadh mashaariicda Rugsan Gardens, Aragsan Village, Bilicsan Village & Masallaha Luxury Apartments oo leh maalgelin Islaami ah oo 5 sano ah.');
      }
    } else {
      document.documentElement.dir = 'ltr';
      document.title = 'Kaabsan Real Estate | Premier Real Estate & Luxury Master Communities in Hargeisa - Telesom Group';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', 'Official portal of Kaabsan Real Estate (kaabsanrealestate.com), part of Telesom Group. Discover master-planned communities: Rugsan Gardens, Aragsan Village, Masallaha Apartments, and Bilicsan Village in Hargeisa, Somaliland. 60-month flexible Islamic financing.');
      }
    }
  }, [language]);

  const saveTranslations = (updated: Record<Language, TranslationDictionary>) => {
    saveTranslationsUtil(updated);
    setTranslationsData(updated);
  };

  const resetTranslations = () => {
    const def = resetTranslationsUtil();
    setTranslationsData(def);
  };

  const t = translationsData[language] || translationsData.en || translations.en;
  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        translationsData,
        isRTL,
        saveTranslations,
        resetTranslations
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const useTranslation = () => {
  const { t, language, setLanguage, isRTL } = useLanguage();
  return { t, language, setLanguage, isRTL };
};
