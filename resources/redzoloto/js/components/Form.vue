<template>
	<!-- {{--FORM--}} -->
	<form
		@submit.prevent="submitForm"
		:class="{
			'form-invalid': !formValid,
			'form-modal': isCallback,
		}"
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
		<button class="button-pulse">
			{{ btnText }}
		</button>
	</form>
</template>

<script>
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
			onFocus: false,
		}),
		props: {
			actionType: {
				type: String,
				default: "send_form",
			},
			btnText: {
				type: String,
				default: "Получить каталог и скидку",
			},
			placeholderText: {
				type: String,
				default: "Введите ваш номер*",
			},
			leadTitle: {
				type: String,
				default: "Получить прайс-лист",
			},
			redirectTo: {
				type: String,
				default: "",
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
			...mapGetters([
				"isSuccess",
				"env",
				"isCallback",
				"isHome",
				"utm",
				"referer",
			]),
			formClass() {
				if (this.isCallback || this.isSignup) {
					return "form-modal";
				}
				return "";
			},
			formValid() {
				return !this.$v.phone.$invalid;
			},
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
			submitForm() {
				if (this.formValid) {
					axios
						.post("/bx24", {
							title: this.leadTitle,
							phone: this.phone,
							utm: this.utm,
							referer: this.referer,
						})
						.then((response) => {
							fbq("track", "Lead");
							this.setSuccess();
							if (this.env == "production") {
								setTimeout(() => {
									window.location = this.$store.getters.redirectTo;
								}, 1500);
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
		components: {},
	};
</script>
