<template>
	<!-- {{--FORM--}} -->
	<form @submit.prevent="submitForm" class="flex flex-col items-center">
		<!-- {{--PHONE INPUT--}} -->
		<label for="phone" class="relative block label-phone">
			<vue-tel-input
				v-model="phone"
				v-bind="settings"
				@validate="onCountryValidate"
				@onInput="onCountryInput"
				@country-changed="onCountryChange"
				placeholder="Ваш телефон *"
				autocomplete="off"
			></vue-tel-input>
			<span v-if="phoneIsValid" class="flex items-center absolute svg-valid">
				<svg
					fill="currentColor"
					xmlns="http://www.w3.org/2000/svg"
					height="24"
					viewBox="0 0 24 24"
					width="24"
				>
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
				</svg>
			</span>
		</label>

		<!-- {{--SUBMIT PHONE--}} -->
		<button
			class="flex justify-center items-center w-full button-pulse"
			:class="{ disabled: !formValid }"
			:disabled="!formValid"
		>
			<span>{{ btnText }}</span>
		</button>
	</form>
</template>

<script>
	import { VueTelInput } from "vue-tel-input";
	import axios from "axios";
	import { mapActions, mapGetters } from "vuex";

	export default {
		components: { VueTelInput },
		data: () => ({
			phone: "",
			phoneIsValid: false,
			onFocus: false,
			settings: {
				placeholder: "Ваш телефон *",
				disabledFormatting: false,
				enabledCountryCode: true,
				mode: "international",
				preferredCountries: ["fr", "us", "gb"],
				validCharactersOnly: true,
				dynamicPlaceholder: true,
				inputOptions: {
					showDialCode: false,
					tabindex: 0,
				},
			},
		}),
		props: {
			btnText: {
				type: String,
				default: "Отправить заявку",
			},
			actionType: {
				type: String,
				default: "form",
			},
		},
		computed: {
			...mapGetters([
				"isModal",
				"isSuccess",
				"redirectTo",
				"env",
				"geoLocation",
				"ipLocation",
			]),
			formValid: function () {
				return this.phoneIsValid;
			},
			geoAddress() {
				if (this.geoLocation) {
					return (
						this.geoLocation.address.countryName +
						", " +
						this.geoLocation.address.city
					);
				}
				return "";
			},
			ipAddress() {
				return this.ipLocation;
			},
		},
		methods: {
			...mapActions([
				"setModal",
				"unsetModal",
				"setSuccess",
				"unsetSuccess",
				"setIpLocation",
			]),
			submitForm() {
				if (this.formValid) {
					axios
						.post("/ammoconnect", {
							phone: this.phone,
							url: "upperlicense.vskidke.ru",
							geoLocation: this.geoAddress,
							ipLocation: this.ipAddress,
						})
						.then((response) => {
							fbq("track", "Lead");
							if (this.actionType == "form") {
								ym(62231704, "reachGoal", "leadmagnit-form-medlicense");
								ga.getAll()[0].send(
									"event",
									"leadmagnit-form-medlicense",
									"send"
								);
							} else if (this.actionType == "callback") {
								ym(62231704, "reachGoal", "leadmagnit-callback-medlicense");
								ga.getAll()[0].send(
									"event",
									"leadmagnit-callback-medlicense",
									"send"
								);
							}
							if (this.env == "production") {
								window.location.replace(this.redirectTo);
							}
							//this.setSuccess();
							//this.setModal();
						});
				}
			},

			onCountryValidate({ number, isValid, country }) {
				//console.log(number);
			},
			onCountryInput(input) {
				//console.log(input);
				this.phoneIsValid = input.isValid;
			},
			onCountryChange(country) {
				if (this.ipLocation == null) this.setIpLocation(country.name);
				//console.log(country);
				this.phone = "";
			},
		},
	};
</script>
