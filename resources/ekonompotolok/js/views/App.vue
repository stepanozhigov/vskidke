<template>
	<div>
		<div v-if="!showCityModal">
			<app-header></app-header>
			<app-calculator></app-calculator>
		</div>
		<div v-else>
			<city-modal></city-modal>
		</div>
		<app-footer></app-footer>
	</div>
</template>

<script>
	import axios from "axios";
	import { mapGetters, mapActions, mapMutations } from "vuex";
	import Header from "../components/Header";
	import Calculator from "../components/Calculator";
	import Footer from "../components/Footer";
	import CityModal from "../components/CityModal";
	export default {
		name: "App",
		data: () => ({
			ip: null,
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
			CityModal,
		},
		created: function () {
			this.setEnv(this.environment);
			this.initApp().then(() => this.resolveCurrentCity());
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
				"ipLocation",
				"showCityModal",
			]),
			addressUrl() {
				return `https://revgeocode.search.hereapi.com/v1/revgeocode?apiKey=${this.apiKey}&at=${this.latitude},${this.longitude}&lang=ru`;
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
				"setGeoCoordinates",
			]),
			setViewHeight: function () {
				let vh = window.innerHeight * 0.01;
				document.documentElement.style.setProperty("--vh", `${vh}px`);
				//console.log(vh);
			},
			//INIT APP
			async initApp() {
				// await this.getIp();
				// await this.getIpCity();
				await this.getGeoLocation();
				await this.getCities();
			},
			//
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
						//console.log("NO GEOLOCATION");
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
			async getGeoLocation() {
				this.gettingLocation = true;
				try {
					this.gettingLocation = false;
					const location = await this.getCoords();
					this.setGeoCoordinates({
						latitude: location.coords.latitude,
						longitude: location.coords.longitude,
					});
					this.latitude = location.coords.latitude;
					this.longitude = location.coords.longitude;
					const address_data = await axios(this.addressUrl);
					if (address_data.data.items.length > 0)
						console.log(address_data.data.items[0].address.city);
					this.setGeoLocation(address_data.data.items[0].address.city);
				} catch (e) {
					this.gettingLocation = false;
					this.errorStr = e.message;
				}
			},
			async getIp() {
				return await new Promise((resolve, reject) => {
					const response = axios
						.get("https://api.ipify.org?format=json")
						.then((res) => {
							console.log(res.data.ip);
							this.ip = res.data.ip;
							resolve(res.data.ip);
						})
						.catch((error) => {
							reject(error);
						});
				});
			},
			//http://ip-api.com/json/193.42.108.94?lang=ru
			async getIpCity(ip) {
				return await new Promise((resolve, reject) => {
					const response = axios
						.get("http://ip-api.com/json/" + this.ip + "?lang=ru")
						.then((res) => {
							console.log(res.data.city);
							this.setIpLocation(res.data.city);
							resolve(res.data.city);
						})
						.catch((error) => {
							reject(error);
						});
				});
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
						this.$router.push({
							name: "App",
							params: { citycode: "" },
						});
					}
				}
				//NO CITY IN URL (use location)
				else {
					//IP LOCATION RECEIVED
					if (this.ipLocation) {
						console.log("USE IP LOCATION");
						let city = this.cities.filter((city) => {
							return city.name == this.ipLocation;
						});
						//LOCATION IN THE LIST
						if (city.length > 0) {
							this.setCurrentCity(city[0]);
							this.$router.push({
								name: "App",
								params: { citycode: city[0].code },
							});
						}
						//LOCATION NOT IN THE LIST
						else {
							this.setCurrentCity(this.defaultCity);
						}
					}
					//NO IP LOCATION
					//use geo location
					else {
						console.log("NO IP/USE GEO LOCATION");
						//IF GEO LOCATED
						if (this.geoLocation) {
							console.log("GEO LOCATED");
							//
							let city = this.cities.filter((city) => {
								return city.name == this.geoLocation;
							});
							if (city.length > 0) {
								//route to geo city
								this.$router.push({
									name: "App",
									params: { citycode: city[0].code },
								});
							} else {
								console.log("GEO LOCATION NOT AVAILABLE");
								this.setCurrentCity(this.defaultCity);
							}
						}
						//NO GEO LOCATION
						else {
							console.log("GEO NOT LOCATED");
							this.setCurrentCity(this.defaultCity);
						}
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
