<template>
	<div>
		<app-header></app-header>
		<app-calculator></app-calculator>
		<app-footer></app-footer>
	</div>
</template>

<script>
	import axios from "axios";
	import { mapGetters, mapActions } from "vuex";
	import Header from "../components/Header";
	import Calculator from "../components/Calculator";
	import Footer from "../components/Footer";
	export default {
		name: "App",
		data: () => ({
			latitude: null,
			longitude: null,
			gettingLocation: false,
			noGeoLocation: false,
			geoDenied: false,
			geoErrorStr: null,
			apiKey: "izLr3tzed9tqFm2ArDXT5J0FPBZHbfuztoWv7-WwU4Q",
		}),
		components: {
			"app-header": Header,
			"app-calculator": Calculator,
			"app-footer": Footer,
		},
		created: function () {
			this.setEnv(this.environment);
			this.getAddress()
				.then(() => this.getCities().then((res) => this.resolveCurrentCity()))
				.catch((error) => {
					this.geoDenied = true;
				});
		},
		mounted: function () {
			this.setViewHeight();
			window.addEventListener("resize", () => {
				this.setViewHeight();
			});
			window.addEventListener("orientationchange", () => this.setViewHeight());
		},
		computed: {
			...mapGetters([
				"isModal",
				"isSuccess",
				"env",
				"geoLocation",
				"cities",
				"defaultCity",
			]),
			addressUrl() {
				return `https://revgeocode.search.hereapi.com/v1/revgeocode?apiKey=${this.apiKey}&at=${this.latitude},${this.longitude}&lang=en-US`;
			},
			geoCountryName() {
				if (!this.geoDenied) {
					return this.geoLocation.address.countryName;
				}
				return false;
			},
			geoCityName() {
				if (!this.geoDenied) {
					return this.geoLocation.address.city;
				}
				return false;
			},
		},
		methods: {
			...mapActions([
				"setModal",
				"unsetModal",
				"setSuccess",
				"unsetSuccess",
				"setEnv",
				"setGeoLocation",
				"setIpLocation",
				"setCities",
				"setCurrentCity",
			]),
			setViewHeight: function () {
				let vh = window.innerHeight * 0.01;
				document.documentElement.style.setProperty("--vh", `${vh}px`);
				//console.log(vh);
			},
			async getCities() {
				return new Promise((resolve, reject) => {
					const response = axios
						.get("https://potolki-ts.ru/api/cities")
						.then((res) => {
							this.setCities(res.data);
							resolve(res);
						})
						.catch((error) => {
							reject(error);
						});
				});
			},
			async getCoords() {
				return new Promise((resolve, reject) => {
					if (!("geolocation" in navigator)) {
						console.log("NO GEOLOCATION");
						this.noGeoLocation = true;
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
					this.setIpLocation({
						latitude: location.coords.latitude,
						longitude: location.coords.longitude,
					});
					//console.log(location);
					this.latitude = location.coords.latitude;
					this.longitude = location.coords.longitude;
					const address_data = await axios(this.addressUrl);
					if (address_data.data.items.length > 0)
						this.setGeoLocation(address_data.data.items[0]);
				} catch (e) {
					this.gettingLocation = false;
					this.errorStr = e.message;
				}
			},
			//
			resolveCurrentCity() {
				//CITY IN URL
				if (this.citycode) {
					let city = this.cities.filter((city) => {
						return city.code == this.citycode;
					});
					if (city.length > 0) {
						this.setCurrentCity(city[0]);
					} else {
						this.setCurrentCity(this.defaultCity);
					}
				}
				//NO CITY IN URL (use location)
				else {
					//GEO WORKS
					if (!this.geoDenied) {
						let city = this.cities.filter((city) => {
							return city.code == this.geoCityName;
						});
						if (city.length > 0) {
							//route to geo city
							this.$router.push({
								name: "App",
								params: { citycode: city[0].code },
							});
						} else {
							this.setCurrentCity(this.defaultCity);
						}
					}
					//GEO NOT AVAILABLE
					else {
						this.setCurrentCity(this.defaultCity);
					}
				}
			},
		},
		props: {
			environment: {
				type: String,
				default: "local",
			},
			citycode: {
				// type: String,
			},
		},
	};
</script>
