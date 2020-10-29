<template>
	<!-- {{--FORM--}} -->
	<form @submit.prevent="submitForm" class="flex flex-col items-center">
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
				default: "Получить консультацию",
			},
			placeholderText: {
				type: String,
				default: "Введите ваш номер*",
			},
			ymAction: {
				type: String,
				default: "send_form",
			},
			gaAction: {
				type: String,
				default: "send_form",
			},
		},
		validations: {
			phone: {
				required,
				phoneValidate,
			},
		},
		mounted: function () {},
		computed: {
			...mapGetters(["isModal", "isSuccess", "redirectTo", "env"]),
		},
		methods: {
			...mapActions(["setModal", "unsetModal", "setSuccess", "unsetSuccess"]),
			submitForm() {
				if (this.$v.phone.$invalid) {
					this.isValid = false;
				} else {
					this.isValid = true;
					axios
						.post("/mail", {
							phone: this.phone,
						})
						.then((response) => {
							ym(68785867, "reachGoal", this.ymAction);
							ga.getAll()[0].send("event", this.gaAction, "send");
							this.setSuccess();
							this.setModal();
							if (this.env == "production") {
								setTimeout(window.location.replace(this.redirectTo), 2000);
							}
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
