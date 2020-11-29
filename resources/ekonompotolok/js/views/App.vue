<template>
	<div class="view-app">
		<div v-if="!showCityModal" class="view-app--no-modal">
			<app-header></app-header>
			<app-calculator></app-calculator>
		</div>
		<div v-else class="view-app--modal">
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
		data: () => ({}),
		components: {
			"app-header": Header,
			"app-calculator": Calculator,
			"app-footer": Footer,
			CityModal,
		},
		created: async function () {
			this.setEnv(this.env);
			await this.initApp();
			this.resolveCurrentCity();
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
				"setIp",
				"setIpCity",
				"getGeoLocation",
				"getCities",
			]),
			setViewHeight: function () {
				let vh = window.innerHeight * 0.01;
				document.documentElement.style.setProperty("--vh", `${vh}px`);
				//console.log(vh);
			},
			//INIT APP
			async initApp() {
				await this.setIp();
				await this.setIpCity();
				await this.getGeoLocation();
				await this.getCities();
			},

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
			citycode: {
				// type: String,
			},
		},
	};
</script>
