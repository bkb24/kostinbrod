<template>
    <div id="gerb-wrap">
        <div
            id="gerb"
            ref="gerb"
            v-bind:class="[
                openedItem ? `${openedItem.name}-opened` : '',
                { 'closing': openedItem ? !openedItem.isOpened : '' }
            ]"
        >

            <gerb-item @clicked="toggleScroll" :gerbItem="gerbItems.fort" />
            <gerb-item @clicked="toggleScroll" :gerbItem="gerbItems.sun" />

            <div class="gerb-bottom">
                <gerb-item @clicked="toggleScroll" :gerbItem="gerbItems.key" />
                <gerb-item @clicked="toggleScroll" :gerbItem="gerbItems.bird" />
            </div>

        </div>

    </div>
</template>

<script>
import GerbItem from './GerbItem'

export default {
    data() {
        return {
            gerbItems: {
                fort: { name: 'fort', isOpened: false, height: 0, closeTaretClass: 'bird' },
                sun: { name: 'sun', isOpened: false, height: 0, closeTaretClass: 'bird' },
                key: { name: 'key', isOpened: false, height: 0, closeTaretClass: 'bird' },
                bird: { name: 'bird', isOpened: false, height: 0, closeTaretClass: 'key' }
            },
            nextItem: null,
            openedItem: null
        }
    },
    mounted() {
        this.$refs.gerb.addEventListener('transitionend', e => {
            if (this.nextItem && this.$refs.gerb.className.includes('closing')) {
                if (e.target.className.includes(this.openedItem.closeTaretClass)) {
                    this.gerbItems[this.nextItem.name].isOpened = true;
                    this.openedItem = this.gerbItems[this.nextItem.name];
                    this.nextItem = null;
                }
            }
        })
    },
    methods: {
        toggleScroll(data) {
            let opened = this.isOpened();

            if (opened) {
                if (data.name === this.openedItem.name) {
                    this.gerbItems[data.name].isOpened = false;
                } else {
                    this.nextItem = data;
                    this.gerbItems[this.openedItem.name].isOpened = false;
                }
            } else {
                this.openedItem = data;
                this.gerbItems[data.name].isOpened = true;
            }
        },
        isOpened() {
            return Object.keys(this.gerbItems).find(item => {
                if (this.gerbItems[item].isOpened)
                    return this.gerbItems[item];
            });
        }
    },
    components: { GerbItem }
}
</script>
