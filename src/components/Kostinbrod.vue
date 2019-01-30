<template>
    <div id="wrap-all">
        <header class="main-header">
            <div class="lang-bar">
                <div
                    v-for="(lang, i) in locales"
                    :key="i"
                    v-bind:class="['lang', `lang-${lang.locale}`, { 'active': locale === lang.locale }]"
                    @click="changeLocale(lang.locale)"
                >
                    {{ lang.name }}
                </div>
            </div>
            <div class="main-heading">{{ $t('message.kostinbrod') }}</div>
        </header>

        <main>
            <gerb />
            <pages />
        </main>

        <div class="slider-wrap">
            <div class="slider sprite sprite-edge"></div>
        </div>

        <div v-bind:class="[{ 'hidden': scrollTopHidden }]" id="scroll-to-top" @click="scrollTop">
            <div class="inner-wrap">
                <div class="arrow"></div>
            </div>
        </div>
    </div>
</template>

<script>
import '../assets/scss/styles.scss'
import Gerb from './Gerb'
import Pages from './Pages'

export default {
    name: 'kostinbrod',
    data() {
        return {
            locales: [
                { locale: 'bg', name: 'бг' },
                { locale: 'en', name: 'en' }
            ],
            scrollTopHidden: true
        }
    },
    methods: {
        changeLocale(locale) {
            let storageLocale = localStorage.getItem('locale');
            if (storageLocale != locale) {
                localStorage.setItem('locale', locale);
                location.reload();
            }
        },
        scrollTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    },
    computed: {
        locale() {
            if (localStorage.getItem('locale') === null) {
                localStorage.setItem('locale', 'en');
            }
            return localStorage.getItem('locale');
        }
    },
    mounted() {
        window.onscroll = e => {
            this.scrollTopHidden =
                window.pageYOffset < 300;
        }
    },
    components: { Gerb, Pages }
}
</script>
