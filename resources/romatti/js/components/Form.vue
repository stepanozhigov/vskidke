<template>
	<!-- {{--FORM--}} -->
	<form
		id="form"
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
			isValid: true,
			onFocus: false,
			roistatVisit: VueCookies.get("roistat_visit") || "nocookie",
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
						// .post("/bx24", {
						// 	phone: this.phone,
						// })
						.post("/roistat", {
							phone: this.phone,
							roistat: this.roistatVisit,
						})
						.then((response) => {
							fbq("track", "Lead");
							ga.getAll()[0].send("event", "lead", this.actionType);
							ym(68586496, "reachGoal", "send form");
							if (this.env == "production") {
								window.location.replace(this.redirectTo);
							}
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
		components: { MaskedInput, VueCookies },
	};
</script>
