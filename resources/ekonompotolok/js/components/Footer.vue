<template>
	<section class="footer">
		<div class="footer--content">
			<div class="footer--content-logo">
				<img src="ekonompotolok/images/logo_footer.png" alt="logo" class="" />
			</div>
			<div class="footer--content-box city">
				<p>Москва и МО</p>
			</div>
			<div class="footer--content-box phone">
				<a href="tel:88005119715">8 800 511-97-15</a>
			</div>
			<div class="footer--content-redirect">
				<a href="#">Перейти на полную версию сайта</a>
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
			...mapGetters(["currentCity", "defaultCity"]),
		},
		methods: {},
		components: {},
	};
</script>