<template>
	<div class="home-view">
		<div class="home-view-content">
			<service></service>

			<div class="home-view-content-center">
				<h1>
					Услуги салона красоты<br />с бесплатным выездом<br />на дом в Москве и
					МО
				</h1>
				<h3>
					Оставьте номер телефона и мы вышлем<br />на WhatsApp прайс-лист наших
					услуг
				</h3>
				<Form />

				<!--  -->
				<div class="signup">
					<a href="#" @click.prevent="openModalSignup">Записаться к мастеру</a>
				</div>
			</div>

			<!-- AGREEMENT -->
			<p>
				Оставляя контактную информацию, вы <span>соглашаетесь</span> на
				обработку персональных&nbsp;данных
			</p>
		</div>
	</div>
</template>
<script>
	import { mapGetters, mapActions } from "vuex";
	import Form from "./Form";
	import Service from "./Service.vue";
	export default {
		name: "Home",
		data: () => ({}),
		computed: {
			...mapGetters(["isSuccess", "env", "isCallback", "isSignup", "isHome"]),
		},
		methods: {
			...mapActions([
				"setEnv",
				"setSuccess",
				"unsetSuccess",
				"setCallback",
				"unsetCallback",
				"setSuccess",
				"setSignup",
				"unsetSignup",
				"setHome",
				"unsetHome",
			]),
			openModalSignup() {
				this.unsetHome();
				this.setSignup();
			},
		},
		components: {
			Form,
			Service,
		},
	};
</script>
