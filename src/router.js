import Vue from 'vue'
import VueRouter from 'vue-router'

// Router components
import { i18n } from './js/locales';
import ArticleLayout from './components/ArticleLayout'

Vue.use(VueRouter);

window.i18n = i18n;

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/history',
            name: 'history',
            component: ArticleLayout
        },
        {
            path: '/roman-past',
            name: 'roman-past',
            component: ArticleLayout
        },
        {
            path: '/theaters',
            name: 'theaters',
            component: ArticleLayout
        },
        {
            path: '/niva-oil',
            name: 'niva-oil',
            component: ArticleLayout
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.name === null) return next();

    if (i18n.messages[to.name]) return next();

    let locale = localStorage.getItem('locale');
    import(`./lang/${locale}/pages/${to.name}`)
        .then(page => {
            i18n.setLocaleMessage(locale, {
                message: {
                    ...i18n.messages[locale].message,
                    [to.name]: page
                }
            });

            return next();
        })
})

export default router