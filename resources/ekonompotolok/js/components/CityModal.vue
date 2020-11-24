<template>
	<section class="city-modal">
		<div class="city-modal--content">
			<div class="city-modal--content-close" @click="showCityModal">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width="18px"
					height="18px"
				>
					<path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none" />
					<path
						d="M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
					/>
				</svg>
			</div>
			<h1>Ваш город</h1>
			<div class="city-modal--content-cities">
				<div
					class="city-modal--content-cities-city"
					v-for="city in cityList"
					:key="city.code"
					@click="goToCityPage(city)"
				>
					{{ city.name }}
				</div>
			</div>
		</div>
	</section>
</template>
<script>
	import Form from "./Form";
	import vuex, { mapGetters, mapActions } from "vuex";
	export default {
		name: "Header",
		data: () => ({}),
		components: {
			"header-form": Form,
		},
		computed: {
			...mapGetters(["defaultCity", "currentCity", "cities"]),
			hrefPhone() {
				return (
					"tel:" + this.currentCity.phone.replace(/\s/g, "").replace(/\-/g, "")
				);
			},
			cityList() {
				return this.cities.filter(
					(city) => city.bx_code != this.currentCity.bx_code
				);
			},
		},
		methods: {
			...mapActions(["showCityModal", "setCurrentCity"]),
			goToCityPage(city) {
				this.setCurrentCity(city);
				this.$router.push({
					name: "App",
					params: {
						citycode: city.code,
					},
				});
				this.showCityModal();
			},
		},
	};
</script>
