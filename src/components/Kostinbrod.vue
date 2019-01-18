<template>

    <div id="wrap-all">

        <header class="main-header">
            <div class="header-image"></div>
        </header>

        <div id="wrapper">

            <div id="gerb-wrap">

                <div id="gerb">
                    <gerb-item :gerbItem="gerbItems.fort" />
                    <gerb-item :gerbItem="gerbItems.sun" />
                    <gerb-item :gerbItem="gerbItems.key" />
                    <gerb-item :gerbItem="gerbItems.bird" />
                </div><!-- gerb -->

            </div><!-- gerb-wrap -->

            <!-- Nav with button for articles -->
            <div id="scroll-section" ref="navigation">

                <div id="main-nav">
                    <router-link class="nav-item history-button" to="/history">
                        <svg class="nav-item-line">
                            <line x1="0" y1="100%" x2="100%" y2="100%" />
                        </svg>
                    </router-link>
                    <router-link class="nav-item roman-button" to="/roman-past">
                        <svg class="nav-item-line">
                            <line x1="0" y1="100%" x2="100%" y2="100%" />
                        </svg>
                    </router-link>
                    <router-link class="nav-item theaters-button" to="/theaters">
                        <svg class="nav-item-line">
                            <line x1="0" y1="100%" x2="100%" y2="100%" />
                        </svg>
                    </router-link>
                    <router-link class="nav-item niva-button" to="/niva-oil">
                        <svg class="nav-item-line">
                            <line x1="0" y1="100%" x2="100%" y2="100%" />
                        </svg>
                    </router-link>
                </div>

                <!-- article -->
                <div ref="article">
                    <transition
                        name="slide"
                        mode="out-in"
                        @beforeLeave="beforeLeave"
                        @enter="enter"
                        @afterEnter="afterEnter"
                    >
                        <router-view></router-view>
                    </transition>
                </div>

            </div>

        </div><!-- wrapper -->

        <!-- edge of the scroll -->
        <div class="slider"></div>

    </div>

</template>

<script>
import '../assets/scss/styles.scss'
import GerbItem from './GerbItem'
import image from '../assets/img/gerb/gerb-bg.png'

export default {
    name: 'kostinbrod',
    data() {
        return {
            message: 'Works',
            gerbItems: {
                fort: {
                    name: 'fort',
                    text: `Костинброд е построен в местност, където е била разположена
                        римска резиденция и крепостна стена.
                        Символ за това е част от крепостна кула.`
                },
                sun: {
                    name: 'sun',
                    text: `Слънцето е един от най-хубавите и оптимистични
                        хералдични символи и не случайно доминира в герба.
                        Петелът и слъчогледът са и символи на зараждащата се икономика
                        на Костинборд, включваща силно развито птицевъдство
                        и емблематичната марка олио "Нива".`
                },
                key: {
                    name: 'key',
                    text: `Ключът, освен символ на гостоприемство, означава
                        път, кръстопът, проход, в случая брод. Затова е поставен над река.`
                },
                bird: {
                    name: 'bird',
                    text: `Петелът е познат като емблема на гордост,
                        храброст и чест. Той е и една от емблемите на
                        Христос, подчертаващи неговата соларна символика –
                        светлина и възкресение.`
                }
            },
            prevHeight: 0,
        }
    },
    mounted() {
        if (this.$router.currentRoute.name) {
            const { height } = getComputedStyle(this.$refs.article.firstChild);
            this.prevHeight = 0;
            this.$refs.article.firstChild.style.height = (parseInt(height) + 64) + 'px';

            window.scrollTo({
                top: this.$refs.navigation.getBoundingClientRect().top,
                behavior: 'smooth'
            });
        }
    },
    methods: {
        beforeLeave(element) {
            this.prevHeight = 0;
        },
        enter(element) {
            const { height } = getComputedStyle(element);

            element.style.height = this.prevHeight;

            setTimeout(() => {
                element.style.height = (parseInt(height) + 64) + 'px';
            });

            setTimeout(() => {
                window.scrollTo({
                    top: this.$refs.navigation.getBoundingClientRect().top,
                    behavior: 'smooth'
                });
            }, 1000);
        },
        afterEnter(element) {
            // alert(123);
        }
    },
    components: { GerbItem }
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
