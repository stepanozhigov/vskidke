<template>
	<div class="app-call">
		<!-- {{-- Make call --}} -->
		<a href="tel:+74992292212" class="app-call-number">8 499 229-22-12</a>
		<!-- {{-- Book call --}} -->
		<span @click="toggleModal" class="app-call-book"> Заказать звонок </span>
	</div>
</template>
<script>
	import { mapGetters, mapActions } from "vuex";
	export default {
		name: "Phone",
		data: () => ({}),
		computed: {
			...mapGetters(["isModal", "isSuccess"]),
		},
		methods: {
			...mapActions(["setModal", "unsetModal", "setSuccess", "unsetSuccess"]),
			toggleModal() {
				if (this.isModal) {
					this.unsetModal();
				} else {
					this.setModal();
				}
				this.unsetSuccess();
			},
		},
	};
</script>
