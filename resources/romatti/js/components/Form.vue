<template>
	<!-- {{--FORM--}} -->
	<form
		@submit.prevent="submitForm"
		class="flex flex-col items-center tablet:items-start"
	>
		<!-- {{--PHONE INPUT--}} -->

		<input
			v-model="phone"
			type="tel"
			autocomplete="off"
			class="w-full"
			:placeholder="placeholderText"
			v-mask="{ mask: '\+7 (999) 999-99-99', greedy: true }"
			v-on:change="maskCheck"
		/>

		<!-- {{--SUBMIT PHONE--}} -->
		<button class="flex justify-center items-center w-full button-pulse">
			{{ btnText }}
		</button>
	</form>
</template>

<script>
	import MaskedInput from "vue-masked-input";
	import { required, helpers } from "vuelidate/lib/validators";
	import axios from "axios";
	import { mapActions, mapGetters } from "vuex";

	//валидация телефона по регулярному вырожению
	const phoneValidate = helpers.regex(
		"phoneValidate",
		/^(\+)?(\(\d{2,3}\) ?\d|\d)(([ \-]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d$/
	);

	export default {
		data: () => ({
			phone: "",
			isValid: true,
			onFocus: false,
		}),
		props: {
			btnText: {
				type: String,
				default: "Получить каталог и скидку",
			},
			placeholderText: {
				type: String,
				default: "Введите ваш номер*",
			},
		},
		validations: {
			phone: {
				required,
				phoneValidate,
			},
		},
		computed: {
			...mapGetters(["isModal", "isSuccess", "redirectTo"]),
		},
		methods: {
			...mapActions(["setModal", "unsetModal", "setSuccess", "unsetSuccess"]),
			submitForm() {
				if (this.$v.phone.$invalid) {
					this.isValid = false;
				} else {
					this.isValid = true;
					axios
						.post("/lead", {
							phone: this.phone,
						})
						.then((response) => {
							fbq("track", "Лид передан успешно");
							ym(68586496,'reachGoal','send form');
							window.location.replace(this.redirectTo);
							// this.setSuccess();
							// this.setModal();
						});
				}
			},
			maskCheck: function (field) {
				if (field.target.inputmask.isComplete()) {
					this.isValid = true;
				} else {
					this.isValid = false;
				}
			},
		},
		components: { MaskedInput },
	};
</script>
