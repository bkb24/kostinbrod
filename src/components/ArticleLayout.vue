<template>
    <article class="content-wrap">

        <header class="heading">
            <div class="ornament"></div>
            <div class="title-img"><img :src="image" alt="" srcset=""></div>
            <div class="ornament"></div>
        </header>

        <div class="content">
            <slot></slot>

            <footer>
                <router-link id="page-slide" class="center" to="/">Затвори</router-link>
                <div class="ornament"></div>
            </footer>
        </div>

    </article>
</template>

<script>
export default {
    computed: {
        image() {
            return require('./../assets/img/nav/' + this.$router.currentRoute.name + '-text.png');
        }
    }
}
</script>
