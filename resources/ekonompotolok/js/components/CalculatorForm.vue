<template>
	<!-- {{--FORM--}} -->
	<form @submit.prevent="submitForm" class="calculator--content-form">
		<!-- {{--PHONE INPUT--}} -->
		<input
			v-model="$v.phone.$model"
			type="tel"
			autocomplete="off"
			required="required"
			class="form-phone"
			:placeholder="placeholderText"
			v-mask="{ mask: '\+7 (999) 999-99-99', greedy: true }"
			v-on:change="maskCheck"
		/>

		<!-- {{--SUBMIT PHONE--}} -->
		<button class="form-submit" type="submit" :disabled="disabled">
			{{ btnText }}
		</button>

		<p class="form-agreement">
			Оставляя контактную информацию, вы соглашаетесь на обработку персональных
			данных
		</p>
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
			btnText: {
				type: String,
				default: "Получить расчёт и подарок",
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
				"currentCity",
				"area",
				"contactByWhatsapp",
				"contactByPhone",
				"ip",
				"ipLocation",
				"geoLocation",
			]),
			disabled() {
				return this.$v.phone.$invalid;
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
					axios
						.post("/bx24", {
							title: "Расчет",
							phone: this.phone,
							city: this.currentCity.bx_code,
							area: this.area,
							contactByWhatsapp: this.contactByWhatsapp,
							contactByPhone: this.contactByPhone,
							ip: this.ip,
							ipLocation: this.ipLocation,
							geoLocation: this.geoLocation,
							comments: true,
							location: true,
						})
						.then((response) => {
							// fbq("track", "Lead");
							// ga.getAll()[0].send("event", "lead", this.actionType);
							// ym(68586496, "reachGoal", "send form");
							if (this.env != "local") {
								window.location.replace(this.redirectTo);
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
		components: { MaskedInput, VueCookies },
	};
</script>
