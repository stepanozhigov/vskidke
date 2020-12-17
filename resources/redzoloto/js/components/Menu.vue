<template>
	<div class="menu-view">
		<div class="menu-view-content"></div>
	</div>
</template>
<script>
	import { mapGetters, mapActions } from "vuex";
	export default {
		name: "Menu",
		data: () => ({}),
		methods: {
			...mapActions(["setModal", "unsetModal", "setSuccess", "unsetSuccess"]),
		},
		computed: {
			...mapGetters(["isSuccess"]),
		},
	};
</script>