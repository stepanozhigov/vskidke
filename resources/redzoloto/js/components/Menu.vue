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
			...mapActions(["setModal", "setSuccess"]),
		},
		computed: {
			...mapGetters(["isSuccess"]),
		},
	};
</script>