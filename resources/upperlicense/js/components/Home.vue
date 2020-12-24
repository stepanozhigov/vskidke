<template>
	<div class="flex flex-col flex-grow home-view">
		<div
			class="home-view-content phone:flex-grow phone:flex phone:flex-col phone:justify-center"
		>
			<h1>
				Полное сопровождение получения лицензий в&nbsp;сфере здравоохранения
				в&nbsp;Казахстане
			</h1>
			<h5>
				Для получения полной консультации и расчёта оставьте номер телефона и мы
				перезвоним в&nbsp;течение&nbsp;5&nbsp;минут
			</h5>
			<Form />

			<!-- REDIRECT -->
			<a class="redirect" href="https://www.license.kz/serviceGroup/63">
				Перейти на сайт
			</a>

			<!-- AGREEMENT -->
			<a class="agreement" href="#" @click.prevent="toggleAgreement">
				Оставляя контактную информацию, вы соглашаетесь на обработку
				персональных&nbsp;данных
			</a>
		</div>
	</div>
</template>
<script>
	import { mapActions, mapGetters } from "vuex";
	import Form from "./Form";
	export default {
		name: "Home",
		data: () => ({}),
		computed: {
			...mapGetters(["redirectTo"]),
		},
		methods: {
			...mapActions(["toggleAgreement"]),
		},
		components: {
			Form,
		},
	};
</script>
