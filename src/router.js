import Vue from 'vue'
import VueRouter from 'vue-router'
import { i18n } from './lang/locales';
import Page from './components/Page'

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/history',
            name: 'history',
            component: Page
        },
        {
            path: '/roman-past',
            name: 'roman-past',
            component: Page
        },
        {
            path: '/theaters',
            name: 'theaters',
            component: Page
        },
        {
            path: '/niva-oil',
            name: 'niva-oil',
            component: Page
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