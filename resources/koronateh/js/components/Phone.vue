<template>
	<div class="flex flex-col tablet:flex-row app-call">
		<!-- {{-- Make call --}} -->
		<a href="tel:+79507560175" class="app-call-number">+7 950 756-01-75</a>
		<!-- {{-- Book call --}} -->
		<span @click="toggleModal" class="app-call-book">Заказать звонок</span>
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
