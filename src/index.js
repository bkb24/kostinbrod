import Vue from 'vue'
import Kostinbrod from './components/Kostinbrod'
import VueRouter from 'vue-router'

import ArticleLayout from './components/ArticleLayout'

// Router components
import History from './views/History'
import RomanPast from './views/RomanPast'
import Theaters from './views/Theaters'
import NivaOil from './views/NivaOil'

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/history',
            name: 'history',
            component: History
        },
        {
            path: '/roman-past',
            name: 'roman-past',
            component: RomanPast
        },
        {
            path: '/theaters',
            name: 'theaters',
            component: Theaters
        },
        {
            path: '/niva-oil',
            name: 'niva-oil',
            component: NivaOil
        }
    ]
});

Vue.component('article-layout', ArticleLayout)

new Vue({
    el: '#kostinbrod',
    router,
    render: h => h(Kostinbrod)
});
