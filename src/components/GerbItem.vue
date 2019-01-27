<template>
    <div v-bind:class="['gerb-item', gerbItem.name]">

        <div class="icon" @click="toggleScroll"></div>

        <div class="scroll">
            <div class="bar upper-bar"></div>
            <div
                ref="text"
                v-bind:class="['text', { 'hidden': hidden }]"
                v-bind:style="{ height: textHeight }"
            >
                {{ $t(`message.gerb-items.${gerbItem.name}`) }}
            </div>
            <div class="bar bottom-bar" @click="toggleScroll"></div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'gerb-item',
    props: ["gerbItem"],
    data() {
        return {
            hidden: true
        }
    },
    mounted() {
        this.gerbItem.height = this.$refs.text.offsetHeight;
        this.hidden = false;
    },
    methods: {
        toggleScroll(e) {
            this.$emit('clicked', this.gerbItem);
        }
    },
    computed: {
        textHeight() {
            return this.gerbItem.isOpened ?
                (this.gerbItem.height + 'px') : (this.hidden ? 'auto' : 0);
        }
    }
}
</script>

<style lang="scss" scoped>
.gerb-item {
    position: relative;

    &:after {
        // content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 100%;
        z-index: 9999;
    }

	.icon:hover {
		cursor: pointer;
    }

    .scroll {
        opacity: 0;
    }

	.text {
        display: flex;
        align-items: center;
        justify-content: center;
		width: 180px;
		background-image: url('../assets/img/gerb/barbg.png');
        overflow: hidden;
        height: 0;
        padding: 0 15px;
        font-style: italic;
        transition: all .5s ease-in-out;
        color: #ffeeb9;
        text-shadow:
            1px 1px 0px rgb(66, 8, 8),
            -1px -1px 0 rgb(66, 8, 8),
            1px -1px 0 rgb(66, 8, 8),
            -1px 1px 0 rgb(66, 8, 8),
            1px 1px 0 rgb(66, 8, 8);
        font-size: 16px;
        letter-spacing: 1px;

        &.hidden {
            height: auto;
            padding: 10px 15px;
            visibility: hidden;
            position: absolute;
        }
    }

    .icon {
        margin: auto;
    }

    .scroll > * {
        margin: auto;
    }
}
</style>
