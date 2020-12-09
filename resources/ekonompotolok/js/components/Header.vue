<template>
	<section class="header">
		<div class="header--content">
			<div class="header--content-logo">
				<img src="ekonompotolok/images/logo.svg" alt="logo" class="" />
			</div>
			<div class="header--content-city">
				<div
					class="header--content-city-name"
					v-if="currentCity"
					@click="showCityModal"
				>
					{{ currentCity.name }}
				</div>
				<a
					class="header--content-city-phone"
					:href="hrefPhone"
					v-if="currentCity"
					>{{ currentCity.phone }}</a
				>
			</div>

			<div class="header--content-offer">
				<p class="header--content-offer-day">за 1 день</p>
				<h1 class="header--content-offer-ceiling">Натяжные<br />потолки</h1>
				<p class="header--content-offer-today">
					Только сегодня<br />
					ваша скидка
				</p>
				<div class="header--content-offer-calendar">
					<span class="calendar-day">{{ day }}</span>
					<img
						src="ekonompotolok/images/monday_01.png"
						alt="monday"
						class="calendar-image"
					/>
				</div>
				<p class="header--content-offer-rush">
					Осталось 7 замеров.<br />Успейте записаться!
				</p>
			</div>
			<header-form></header-form>
		</div>
	</section>
</template>
<script>
	import Form from "./Form";
	import moment from "moment";
	import vuex, { mapGetters, mapActions } from "vuex";
	export default {
		name: "Header",
		data: () => ({}),
		components: {
			"header-form": Form,
		},
		computed: {
			...mapGetters(["defaultCity", "currentCity"]),
			hrefPhone() {
				return (
					"tel:" + this.currentCity.phone.replace(/\s/g, "").replace(/\-/g, "")
				);
			},
			day() {
				return moment().locale("ru").format("dddd");
			},
		},
		methods: {
			...mapActions(["showCityModal"]),
		},
	};
</script>
