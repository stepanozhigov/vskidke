<template>
	<section class="header">
		<div class="header--content">
			<div class="header--content-logo">
				<img src="ekonompotolok/images/logo.svg" alt="logo" class="" />
			</div>
			<div class="header--content-city">
				<div class="header--content-city-name" v-if="currentCity">
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
				<img
					src="ekonompotolok/images/monday.png"
					alt="monday"
					class="header--content-offer-monday"
				/>
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
	import vuex, { mapGetters } from "vuex";
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
				//return this.currentCity.phone;
			},
		},
	};
</script>
