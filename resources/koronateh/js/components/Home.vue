<template>
	<div class="flex flex-col flex-grow home-view">
		<div
			class="home-view-content phone:flex-grow phone:flex phone:flex-col phone:justify-center"
		>
			<h1>Cпецтехника&nbsp;с&nbsp;водителем</h1>
			<h3>
				Аренда экскаватора-погрузчика в&nbsp;Москве и&nbsp;МО,
				от&nbsp;1&nbsp;650&nbsp;₽/час
			</h3>
			<h5>
				Оставьте ваш номер телефона и мы&nbsp;свяжемся с&nbsp;вами
				в&nbsp;течение 5&nbsp;минут для подробной консультации
			</h5>
			<Form />
			<a :href="redirectTo">Перейти на сайт</a>
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
