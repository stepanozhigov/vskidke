<template>
	<!-- {{--FORM--}} -->
	<form
		@submit.prevent="submitForm"
		:class="{
			'form-invalid': !formValid,
			'form-modal': isCallback,
		}"
	>
		<!-- CONTACTBY -->
		<contactby v-if="!isCallback"></contactby>

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
		<button class="button-pulse submit">
			{{ btnText }}
		</button>
	</form>
</template>

<script>
	import { required, helpers } from "vuelidate/lib/validators";
	import axios from "axios";
	import { mapActions, mapGetters } from "vuex";
	import Contactby from "./Contactby";

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
				default: "Получить каталог и консультацию",
			},
			placeholderText: {
				type: String,
				default: "Введите ваш номер*",
			},
			leadTitle: {
				type: String,
				default: "Получить каталог и консультацию",
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
				"contactBy",
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
						.post("/roistat", {
							title: this.leadTitle,
							phone: this.phone,
							contactBy: this.contactBy,
							utm: this.utm,
							referer: this.referer,
						})
						.then((response) => {
							fbq("track", "Lead");
							ym(70730425, "reachGoal", "send_form");
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
		components: { Contactby },
	};
</script>
