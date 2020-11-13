<template>
	<div class="modal-view mx-auto flex-grow flex flex-col">
		<div
			class="modal-view-content relative w-full flex flex-col flex-grow items-center"
		>
			<h1>Заказать звонок</h1>
			<div
				@click="toggleModal"
				class="absolute modal-view-close cursor-pointer"
			>
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
				actionType="callback"
				btnText="Отправить заявку"
				placeholderText="Ваш телефон*"
			/>
			<a href="#" @click.prevent="toggleModal">Закрыть</a>
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
		computed: {
			...mapGetters(["isModal", "isSuccess"]),
		},
	};
</script>