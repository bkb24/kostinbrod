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

        <main id="wrapper">

            <gerb></gerb>

            <!-- Nav with button for articles -->
            <div id="scroll-section" ref="navigation">

                <nav id="main-nav">
                    <router-link v-for="pageRoute in pageRoutes"
                        :key="pageRoute"
                        class="nav-item"
                        :to="`/${pageRoute}`"
                    >
                        <div v-bind:class="['nav-button', `${pageRoute}-button`]"></div>
                        <div class="page-name">{{ $t(`message.pages.${pageRoute}.name`) }}</div>
                        <svg class="nav-item-line">
                            <line x1="0" y1="100%" x2="100%" y2="100%" />
                        </svg>
                    </router-link>
                </nav>

                <!-- article -->
                <div ref="article">
                    <transition
                        name="slide"
                        mode="out-in"
                        @beforeLeave="beforeLeave"
                        @enter="enter"
                    >
                        <router-view :key="$route.path"></router-view>
                    </transition>
                </div>

            </div>

        </main>

        <div class="slider"></div>

    </div>

</template>

<script>
import '../assets/scss/styles.scss'
import Gerb from './Gerb'
import image from '../assets/img/gerb/gerb-bg.png'

export default {
    name: 'kostinbrod',
    data() {
        return {
            locales: [
                { locale: 'bg', name: 'бг' },
                { locale: 'en', name: 'en' }
            ],
            pageRoutes: ['history', 'roman-past', 'theaters', 'niva-oil'],
            prevHeight: 0
        }
    },
    mounted() {
        if (this.$router.currentRoute.name) {
            const { height } = getComputedStyle(this.$refs.article.firstChild);
            this.prevHeight = 0;
            this.$refs.article.firstChild.style.height = (parseInt(height) + 64) + 'px';

            window.scrollTo({
                top: window.pageYOffset + this.$refs.navigation.getBoundingClientRect().top,
                behavior: 'smooth'
            });
        }
    },
    methods: {
        beforeLeave(element) {
            this.prevHeight = 0;
        },
        enter(element) {
            let content = Array.from(element.childNodes).find(child => child.className == 'content');
            const { height } = getComputedStyle(element);

            element.style.height = this.prevHeight;

            setTimeout(() => {
                element.style.height = (parseInt(height) + 64) + 'px';
            });

            setTimeout(() => {
                window.scrollTo({
                    top: window.pageYOffset + this.$refs.navigation.getBoundingClientRect().top,
                    behavior: 'smooth'
                });
            }, 1000);
        },
        changeLocale(locale) {
            let storageLocale = localStorage.getItem('locale');
            if (storageLocale != locale) {
                localStorage.setItem('locale', locale);
                location.reload();
            }
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
    components: { Gerb }
}
</script>

<style lang="scss" scoped>

.slide-enter-active,
.slide-leave-active {
    transition-duration: 3s;
    transition-property: all;
    transition-timing-function: ease;
    overflow: hidden;
}

.slide-leave-active {
    transition-duration: 1.5s;
}

.slide-leave-active {
    height: 0px!important;
}

</style>
