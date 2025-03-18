import { createI18n } from 'vue-i18n'
import en from '@/lange/en'
import zh from '@/lange/zh'
import ja from '@/lange/ja'


const i18n = createI18n({
    locale:'zh',
    fallbackLocale: 'en',
    globalInjection: true,
    messages: {
      en,
      ja,
      zh,
    }
  })

  export default i18n