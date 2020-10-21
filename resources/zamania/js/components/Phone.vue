<template>
	<div class="flex flex-col app-call md:flex-row">
		<!-- {{-- Make call --}} -->
		<a href="tel:+7 495 120-40-68" class="app-call-number"> 8 495 120-40-68 </a>
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
