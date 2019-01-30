import Vue from 'vue'
import Kostinbrod from './components/Kostinbrod'
import router from './router'
import { i18n } from './lang/locales'

new Vue({
    el: '#kostinbrod',
    router,
    i18n,
    render: h => h(Kostinbrod)
});
