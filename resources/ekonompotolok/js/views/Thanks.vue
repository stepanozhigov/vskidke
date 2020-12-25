<template>
	<div class="view-thanks">
		<div class="view-thanks_center">
			<h1>Спасибо!</h1>
			<h3>Ваша заявка принята</h3>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from "vuex";
	export default {
		name: "Thanks",
		computed: {
			...mapGetters(["env", "redirectTo"]),
		},
		mounted() {
			if (this.env != "local") {
				setTimeout(() => (window.location.href = this.redirectTo), 1500);
			}
		},
	};
</script>