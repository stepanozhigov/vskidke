<template>
	<div class="flex flex-col app-call tablet:flex-row">
		<!-- {{-- Make call --}} -->
		<a href="tel:+74994550520" class="app-call-number">+7 (499) 455-05-20</a>
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
