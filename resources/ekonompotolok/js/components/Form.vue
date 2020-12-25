<template>
	<!-- {{--FORM--}} -->
	<form @submit.prevent="submitForm" class="header--content-form">
		<!-- {{--PHONE INPUT--}} -->
		<input
			v-model="$v.phone.$model"
			type="tel"
			autocomplete="off"
			required="required"
			class="form-input"
			:placeholder="placeholderText"
			v-mask="{ mask: '\+7 (999) 999-99-99', greedy: true }"
			v-on:change="maskCheck"
		/>

		<!-- {{--SUBMIT PHONE--}} -->
		<button class="form-button" type="submit" :disabled="disabled">
			{{ btnText }}
		</button>
	</form>
</template>

<script>
	import VueCookies from "vue-cookies";
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
		}),
		props: {
			leadTitle: {
				type: String,
				default: "ЭП Замер",
			},
			btnText: {
				type: String,
				default: "Записаться",
			},
			placeholderText: {
				type: String,
				default: "Введите ваш номер",
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
				"isModal",
				"isSuccess",
				"redirectTo",
				"env",
				"apiService",
				"currentCity",
				"ip",
				"ipLocation",
				"geoLocation",
				"utm",
			]),
			disabled() {
				return this.$v.phone.$invalid;
			},
			status() {
				if (this.env != "local") {
					return "Не обработан";
				}
				return "JUNK";
			},
		},
		methods: {
			...mapActions(["setModal", "unsetModal", "setSuccess", "unsetSuccess"]),
			submitTest() {
				console.log(this.isValid);
			},
			submitForm() {
				if (this.$v.phone.$invalid) {
					this.isValid = false;
				} else {
					this.isValid = true;
					//console.log("SEND FORM");
					axios
						.post("bx24", {
							title: this.leadTitle,
							phone: this.phone,
							city: this.currentCity.bx_code,
							ip: this.ip,
							ipLocation: this.ipLocation,
							geoLocation: this.geoLocation,
							comments: false,
							location: true,
							utm_source: this.utm.utm_source ? this.utm.utm_source : "",
							utm_campaign: this.utm.utm_campaign ? this.utm.utm_campaign : "",
							utm_medium: this.utm.utm_medium ? this.utm.utm_medium : "",
							utm_term: this.utm.utm_term ? this.utm.utm_term : "",
						})
						.then((response) => {
							fbq("track", "Lead");
							console.log(this.currentCity);
							// ga.getAll()[0].send("event", "lead", this.actionType);
							// ym(68586496, "reachGoal", "send form");
							// if (this.env != "local") {
							// 	window.location.replace(this.redirectTo);
							// }
							this.$router.push({
								name: "Thanks",
								params: { citycode: this.currentCity.code },
							});
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
		components: { MaskedInput, VueCookies },
	};
</script>
