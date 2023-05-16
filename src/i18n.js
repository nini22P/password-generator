import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      caches: []
    },
    resources: {
      en: {
        translation: {
          uppercase: 'Uppercase',
          lowercase: 'Lowercase',
          numbers: 'Number',
          symbols: 'Symbols',
          length: 'Length',
          copy: 'Copy',
        }
      },
      zh: {
        translation: {
          uppercase: '大写字母',
          lowercase: '小写字母',
          numbers: '数字',
          symbols: '符号',
          length: '长度',
          copy: '复制',
        }
      }
    },
  })

export default i18next