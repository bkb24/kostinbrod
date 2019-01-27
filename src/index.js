import Vue from 'vue'
import Kostinbrod from './components/Kostinbrod'
import router from './router'
import { i18n } from './js/locales'

import ArticleLayout from './components/ArticleLayout'

Vue.component('article-layout', ArticleLayout)

new Vue({
    el: '#kostinbrod',
    router,
    i18n,
    render: h => h(Kostinbrod)
});
