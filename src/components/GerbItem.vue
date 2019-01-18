<template>
    <div v-bind:class="['gerb-item', gerbItem.name]" :data-name="gerbItem.name">

        <div class="icon"></div>

        <div class="scroll">
            <div class="bar upper-bar"></div>
            <div class="text">{{ gerbItem.text }}</div>
            <div class="bar bottom-bar"></div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'gerb-item',
    props: ["gerbItem"]
}
</script>

<style lang="scss" scoped>
.gerb-item {
	position: absolute;

	.icon:hover {
		cursor: pointer;
	}

	.text {
		display: none;
		width: 150px;
		// background-image: url('../img/gerb/barbg.png');
		padding: 10px 15px 10px 15px;
		font-style: italic;
		// color: yellow;
	}
}
</style>

