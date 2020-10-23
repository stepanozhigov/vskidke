<template>
	<div class="flex flex-col flex-grow home-view">
		<div
			class="home-view-content md:flex-grow md:flex md:flex-col md:justify-center"
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
		</div>

		<!-- AGREEMENT -->
		<p class="mt-auto">
			Оставляя контактную информацию, вы <span>соглашаетесь</span> на обработку
			персональных&nbsp;данных
		</p>
	</div>
</template>
<script>
	import { mapGetters } from "vuex";
	import Form from "./Form";
	export default {
		name: "Home",
		data: () => ({}),
		computed: {
			...mapGetters(["redirectTo"]),
		},
		components: {
			Form,
		},
	};
</script>
