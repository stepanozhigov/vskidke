<template>
	<div class="modal-view">
		<div class="modal-view-content">
			<h5>{{ this.title }}</h5>
			<div @click="closeModal" class="modal-view-content-close">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 18 18"
				>
					<path
						fill="none"
						stroke="#d9d7d7"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-miterlimit="20"
						stroke-width="1.5"
						d="M1 1l16 16"
					/>
					<path
						fill="none"
						stroke="#d9d7d7"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-miterlimit="20"
						stroke-width="1.5"
						d="M17 1L1 17"
					/>
				</svg>
			</div>
			<Form
				:leadTitle="title"
				actionType="callback"
				btnText="Отправить заявку"
				placeholderText="Ваш телефон"
			/>
			<a href="#" @click.prevent="closeModal">Закрыть</a>
		</div>
	</div>
</template>
<script>
	import { mapGetters, mapActions } from "vuex";
	import Form from "./Form";
	export default {
		name: "Modal",
		data: () => ({}),
		components: {
			Form,
		},
		methods: {
			...mapActions([
				"setEnv",
				"setSuccess",
				"unsetSuccess",
				"setCallback",
				"unsetCallback",
				"setSuccess",
				"setHome",
				"unsetHome",
			]),
			closeModal() {
				this.unsetSignup();
				this.unsetCallback();
				this.setHome();
			},
		},
		computed: {
			...mapGetters(["isSuccess", "env", "isCallback", "isHome"]),
			title() {
				if (this.isCallback) {
					return "Заказать звонок";
				}
				return "";
			},
		},
	};
</script>