<template>
	<div class="flex flex-col flex-grow home-view">
		<div
			class="home-view-content phone:flex-grow phone:flex phone:flex-col phone:justify-center"
		>
			<h1>Cпецтехника с водителем</h1>
			<h3>Аренда экскаватора-погрузчика в Москве и МО, от 1 650 ₽/час</h3>
			<h5>
				Оставьте ваш номер телефона и мы свяжемся с вами в течение 5 минут для
				подробной консультации
			</h5>
			<Form />
			<a :href="redirectTo">Купить билет</a>
			<!-- AGREEMENT -->
			<p>
				Оставляя контактную информацию, вы <span>соглашаетесь</span> на
				обработку персональных&nbsp;данных
			</p>
		</div>
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
