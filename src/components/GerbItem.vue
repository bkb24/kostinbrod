<template>
    <div v-bind:class="['gerb-item', gerbItem.name, { 'active': gerbItem.isOpened }]">

        <div v-bind:class="['icon sprite', `sprite-${gerbItem.name}`]" @click="toggleScroll"></div>

        <div class="scroll">
            <div class="upper-bar sprite sprite-bar"></div>
            <div
                ref="text"
                v-bind:class="['text', { 'hidden': hidden }]"
                v-bind:style="{ height: textHeight }"
            >
                {{ $t(`message.gerb-items.${gerbItem.name}`) }}
            </div>
            <div class="bottom-bar sprite sprite-bar" @click="toggleScroll"></div>
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
