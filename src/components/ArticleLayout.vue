<template>
    <article class="content-wrap">

        <header class="heading">
            <div class="ornament"></div>
            <div class="page-title">{{ $t(`message.pages.${$route.name}.title`) }}</div>
            <div class="ornament"></div>
        </header>

        <div class="content">
            <slot></slot>

            <div v-if="images[pageName]">
                <img v-for="(img, i) in images[pageName]" :key="i" :src="getImage(img.src)" :alt="img.alt" />
            </div>

            <div v-html="pageContent.body"></div>

            <footer>
                <router-link class="page-slide" to="/">{{ $t('message.close') }}</router-link>
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
            return require(`./../assets/img/nav/${src}`);
        }
    },
    computed: {
        pageName() {
            return this.$router.currentRoute.name;
        },
        pageContent() {
            let locale = localStorage.getItem('locale');
            return this.$i18n.messages[locale].message[this.pageName].default;
        },
        image() {
            return require('./../assets/img/nav/' + this.pageName + '-text.png');
        }
    }
}
</script>
