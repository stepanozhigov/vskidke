<template>
	<div class="flex flex-col flex-grow home-view">
		<div class="home-view-content phone:flex-grow phone:flex phone:flex-col">
			<h1>
				Продажа квартир в&nbsp;лучших&nbsp;ЖК&nbsp;Москвы
				от&nbsp;7,9&nbsp;млн.&nbsp;рублей
			</h1>
			<h3>
				Оставьте ваш номер телефона и мы вышлем вам на WhatsApp лучшие
				предложения в&nbsp;течение&nbsp;5&nbsp;минут
			</h3>
			<Form />

			<!-- GOTO WEBSITE -->
			<div>
				<a :href="redirectTo">Перейти на сайт</a>
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
