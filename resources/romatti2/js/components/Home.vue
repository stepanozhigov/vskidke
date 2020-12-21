<template>
	<div class="home-view">
		<div class="home-view-content">
			<div class="home-view-content-center">
				<h1>
					Дизайнерские<br />светильники, мебель и<br />декор оптом и в розницу
				</h1>
				<h1 class="h1-tablet">
					Дизайнерские<br />светильники, мебель<br />и декор оптом<br />и в
					розницу
				</h1>
				<h1 class="h1-laptop">
					Дизайнерские светильники, мебель<br />и декор оптом и в розницу
				</h1>
				<!-- <h3>
					Оставьте номер телефона и мы вышлем<br />на&nbsp;WhatsApp полный
					каталог, а&nbsp;при&nbsp;заказе<br />вы&nbsp;получите подвеску в
					подарок
				</h3>
				<Form />

				<div class="redirect">
					<a :href="redirectTo">Перейти на сайт</a>
				</div> -->
			</div>

			<!-- AGREEMENT -->
			<p>
				Оставляя контактную информацию, вы <span>соглашаетесь</span> на
				обработку персональных данных
			</p>
		</div>
	</div>
</template>
<script>
	import { mapGetters, mapActions } from "vuex";
	import Form from "./Form";
	export default {
		name: "Home",
		data: () => ({}),
		computed: {
			...mapGetters(["redirectTo", "isSuccess", "env", "isCallback", "isHome"]),
		},
		methods: {
			...mapActions([
				"setEnv",
				"setSuccess",
				"unsetSuccess",
				"setCallback",
				"unsetCallback",
				"setSuccess",
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
		},
	};
</script>
