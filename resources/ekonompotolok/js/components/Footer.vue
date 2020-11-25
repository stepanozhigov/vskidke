<template>
	<section class="footer">
		<div class="footer--content">
			<div class="footer--content-logo">
				<img src="ekonompotolok/images/logo_footer.svg" alt="logo" class="" />
			</div>
			<div class="footer--content-box city" v-if="currentCity">
				<p>{{ currentCity.name }}</p>
			</div>
			<div class="footer--content-box phone" v-if="currentCity">
				<a :href="hrefPhone">{{ currentCity.phone }}</a>
			</div>
			<div class="footer--content-redirect">
				<a :href="redirectTo">Перейти на полную версию сайта</a>
			</div>
			<div class="footer--content-rights">
				<p>2003-2020 © ООО «Эконом Потолок». Все права защищены.</p>
			</div>
		</div>
	</section>
</template>
<script>
	import vuex, { mapGetters } from "vuex";
	export default {
		name: "Footer",
		data() {
			return {};
		},
		computed: {
			...mapGetters(["currentCity", "defaultCity", "redirectTo"]),
		},
		methods: {
			hrefPhone() {
				return (
					"tel:" + this.currentCity.phone.replace(/\s/g, "").replace(/\-/g, "")
				);
			},
		},
		components: {},
	};
</script>
<style lang="scss" scoped>
	//
	// Avenir Next Cyr Medium
	//
	@font-face {
		font-family: "Avenir Next Cyr Medium";
		font-display: swap;
		font-style: normal;
		font-weight: 500;
		src: url("../../../_webfonts/AvenirNextCyr-Medium.eot");
		src: url("../../../_webfonts/AvenirNextCyr-Medium.ttf") format("truetype"),
			url("../../../_webfonts/AvenirNextCyr-Medium.woff") format("woff");
	}
	//
	// Jost*
	//
	@font-face {
		font-family: "Jost *";
		font-display: swap;
		font-style: normal;
		font-weight: 500;
		src: url("../../../_webfonts/Jost-500-Medium.otf") format("opentype"),
			url("../../../_webfonts/Jost-500-Medium.ttf") format("truetype");
	}
</style>