<template>
	<div class="app-call">
		<!-- {{-- Make call --}} -->
		<a href="tel:+74994330580" class="app-call-number">8 (499) 433-05-80</a>
		<!-- {{-- Book call --}} -->
		<span @click="toggleCallback" class="app-call-book"> Заказать звонок </span>
	</div>
</template>
<script>
	import { mapGetters, mapActions } from "vuex";
	export default {
		name: "Phone",
		data: () => ({}),
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
				"setContactBy",
			]),
			toggleCallback() {
				this.setContactBy("phone");
				if (this.isCallback) {
					this.setHome();
				} else {
					this.setCallback();
				}
			},
		},
	};
</script>
