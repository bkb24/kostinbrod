<template>
    <article class="content-wrap">

        <header class="heading">
            <div class="ornament"></div>
            <div class="page-title">{{ $t(`message.pages.${$route.name}.title`) }}</div>
            <div class="ornament"></div>
        </header>

        <div class="content">
            <slot></slot>

            <div class="header-images" v-if="images[pageName]">
                <div class="article-img" v-for="(img, i) in images[pageName]" :key="i">
                    <img :src="getImage(img.src)" :alt="img.alt" />
                </div>
            </div>

            <div v-html="pageContent.body"></div>

            <footer>
                <router-link class="page-slide-wrap" to="/">
                    <div class="page-slider">
                        <div class="page-slider-text">
                            {{ $t('message.close') }}
                        </div>
                        <svg class="page-slide-line">
                            <line x1="0" y1="100%" x2="100%" y2="100%" />
                        </svg>
                    </div>
                </router-link>
                <div class="ornament"></div>
            </footer>
        </div>

    </article>
</template>

<script>
export default {
    data() {
        return {
            images: {
                "roman-past": [
                    { "src": "scretisca.jpg", "alt": "scretisca" },
                    { "src": "scretisca2.jpg", "alt": "scretisca"},
                    { "src": "scretisca3.jpg", "alt": "scretisca" }
                ],
                "niva-oil": [
                    { "src": "niva-bottle.jpg", "alt": "olio-niva" }
                ]
            }
        }
    },
    methods: {
        getImage(src) {
            return require(`./../assets/img/articles/${src}`);
        }
    },
    computed: {
        pageName() {
            return this.$router.currentRoute.name;
        },
        pageContent() {
            let locale = localStorage.getItem('locale');
            return this.$i18n.messages[locale].message[this.pageName].default;
        }
    }
}
</script>
