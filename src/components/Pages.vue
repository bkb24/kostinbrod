<template>
    <div id="scroll-section" ref="navigation">

        <nav id="main-nav">
            <router-link v-for="pageRoute in pageRoutes"
                :key="pageRoute"
                class="nav-item"
                :to="`/${pageRoute}`"
            >
                <div v-bind:class="['nav-button sprite', `sprite-${pageRoute}`]"></div>
                <div class="page-name">{{ $t(`message.pages.${pageRoute}.name`) }}</div>
                <svg class="nav-item-line">
                    <line x1="0" y1="100%" x2="100%" y2="100%" />
                </svg>
            </router-link>
        </nav>

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
</template>

<script>
export default {
    data() {
        return {
            pageRoutes: ['history', 'roman-past', 'theaters', 'niva-oil'],
            prevHeight: 0
        }
    },
    mounted() {
        this.resizeArticle();

        if (this.$router.currentRoute.name) {
            window.scrollTo({
                top: window.pageYOffset + this.$refs.navigation.getBoundingClientRect().top,
                behavior: 'smooth'
            });
        }

        window.onresize = e => {
            this.resizeArticle();
        }
    },
    methods: {
        resizeArticle() {
            if (this.$router.currentRoute.name) {
                let articleHeight = 0;
                this.$refs.article.firstChild.childNodes.forEach(item => {
                    if (item.nodeType === Node.TEXT_NODE) return;

                    let { height } = getComputedStyle(item);
                    articleHeight += parseInt(height);
                })

                this.prevHeight = 0;
                this.$refs.article.firstChild.style.height = (articleHeight + 64) + 'px';
            }
        },
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
    }
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
