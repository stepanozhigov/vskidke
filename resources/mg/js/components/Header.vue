<template>
	<header class="app-header" :class="{ modal: !isHome }">
		<logo></logo>
		<img
			class="app-header-image"
			v-if="isHome"
			src="/beflight/images/Christmas_Balls.png"
			alt=""
		/>
		<phone></phone>
	</header>
</template>
<script>
	import { mapGetters, mapActions } from "vuex";
	import Logo from "./Logo";
	import Phone from "./Phone";
	export default {
		name: "Header",
		data: () => ({}),
		components: {
			Logo,
			Phone,
		},
		computed: {
			...mapGetters([
				"isModal",
				"isSuccess",
				"env",
				"isCallback",
				"isSignup",
				"isHome",
			]),
		},
		methods: {
			...mapActions([
				"setEnv",
				"setModal",
				"unsetModal",
				"setSuccess",
				"unsetSuccess",
				"setCallback",
				"unsetCallback",
				"setSuccess",
				"setSignup",
				"unsetSignup",
				"setHome",
				"unsetHome",
			]),
		},
	};
</script>