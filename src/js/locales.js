import Vue from 'vue'
import Vuei18n from 'vue-i18n'
import enMessags from '../lang/en/titles.json'
import bgMessags from '../lang/bg/titles.json'

let localStorageLocale = localStorage.getItem('locale');
if (!localStorageLocale) {
    localStorage.setItem('locale', 'en');
}

Vue.use(Vuei18n)
export const i18n = new Vuei18n({
    locale: localStorage.getItem('locale'),
    fallbackLocale: 'en',
    messages: {
        en: {
            message: enMessags
        },
        bg: {
            message: bgMessags
        }
    }
});
