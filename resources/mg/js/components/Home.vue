<template>
	<div class="home-view">
		<div class="home-view-content">
			<!-- <service></service> -->

			<div class="home-view-content-center">
				<h1>Скидка до 50%</h1>
				<h3>на подарочный сертификат<br />от салона красоты «MG»</h3>
				<h5>Купите и получите массаж в подарок!</h5>
				<Form />

				<!--  -->
				<!-- <div class="signup">
					<a href="#" @click.prevent="openModalSignup">Записаться к мастеру</a>
				</div> -->
			</div>
		</div>
		<!-- AGREEMENT -->
		<p>
			Оставляя контактную информацию, вы
			<span>соглашаетесь</span> на&nbsp;обработку персональных&nbsp;данных
		</p>
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
