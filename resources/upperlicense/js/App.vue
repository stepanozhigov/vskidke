<template>
	<div class="app-template min-h-screen flex flex-col">
		<!-- HEADER -->
		<app-header></app-header>
		<!-- /HEADER -->

		<!-- HOME VIEW -->
		<home v-if="!isSuccess && !isModal && !isAgreement"></home>
		<!-- /HOME VIEW -->

		<!-- SUCCESS VIEW -->
		<success v-if="isSuccess && isModal"></success>
		<!-- /SUCCESS VIEW -->

		<!-- MODAL VIEW -->
		<modal v-if="!isSuccess && isModal"></modal>
		<!-- /MODAL VIEW -->

		<!-- AGREEMENT VIEW -->
		<agreement v-if="isAgreement"></agreement>
		<!-- /AGREEMENT VIEW -->
	</div>
</template>

<script>
	import axios from "axios";
	import { mapGetters, mapActions } from "vuex";
	import Form from "./components/Form";
	import Header from "./components/Header";
	import Home from "./components/Home";
	import Success from "./components/Success";
	import Modal from "./components/Modal";
	import Agreement from "./components/Agreement";
	export default {
		name: "App",
		data: () => ({
			latitude: null,
			longitude: null,
			gettingLocation: false,
			geoError: false,
			geoErrorStr: null,
			apiKey: "izLr3tzed9tqFm2ArDXT5J0FPBZHbfuztoWv7-WwU4Q",
		}),
		components: {
			"app-header": Header,
			Home,
			Success,
			Modal,
			Form,
			Agreement,
		},
		created: function () {
			this.setUtm(this.utm);
			this.setEnv(this.environment);
			this.getAddress();
		},
		mounted: function () {
			//
			//this.setSuccess();
			//this.setModal();
			//
			this.setViewHeight();
			window.addEventListener("resize", () => {
				this.setViewHeight();
			});
			window.addEventListener("orientationchange", () => this.setViewHeight());
		},
		computed: {
			...mapGetters(["isModal", "isSuccess", "env", "isAgreement"]),
			addressUrl() {
				return `https://revgeocode.search.hereapi.com/v1/revgeocode?apiKey=${this.apiKey}&at=${this.latitude},${this.longitude}&lang=en-US`;
			},
			country() {
				return this.geoLocation.address.countryName;
			},
			city() {
				return this.geoLocation.address.city;
			},
		},
		methods: {
			...mapActions([
				"setModal",
				"unsetModal",
				"setSuccess",
				"unsetSuccess",
				"setEnv",
				"ipLocation",
				"geoLocation",
				"setUtm",
			]),
			setViewHeight: function () {
				let vh = window.innerHeight * 0.01;
				document.documentElement.style.setProperty("--vh", `${vh}px`);
				//console.log(vh);
			},
			async getCoords() {
				return new Promise((resolve, reject) => {
					if (!("geolocation" in navigator)) {
						this.geoError = true;
						reject(new Error("Geolocation is not available."));
					}

					navigator.geolocation.getCurrentPosition(
						(pos) => {
							resolve(pos);
						},
						(err) => {
							reject(err);
						}
					);
				});
			},
			async getAddress() {
				this.gettingLocation = true;
				try {
					this.gettingLocation = false;
					const location = await this.getCoords();
					this.latitude = location.coords.latitude;
					this.longitude = location.coords.longitude;
					const address_data = await axios(this.addressUrl);
					//console.log(address_data);
					if (address_data.data.items.length > 0)
						this.setGeoLocation(address_data.data.items[0]);
				} catch (e) {
					this.gettingLocation = false;
					this.errorStr = e.message;
				}
			},
		},
		props: {
			environment: {
				type: String,
				default: "",
			},
			utm: {
				type: Object,
			},
		},
	};
</script>
