<template>
	<div class="flex flex-col flex-grow home-view">
		<h1>Огромный выбор | Доставка</h1>
		<div
			class="home-view-content tablet:flex-grow tablet:flex tablet:flex-col tablet:justify-center"
		>
			<h3>
				Интернет-магазин дизайнерских светильников «Romatti»
				от&nbsp;9&nbsp;800&nbsp;₽
			</h3>
			<h5>
				Оставьте ваш номер телефона и мы вышлем на WhatsApp каталог
				с&nbsp;ценами в&nbsp;течение&nbsp;5&nbsp;минут
			</h5>
			<Form />

			<!-- GOTO WEBSITE -->
			<a :href="redirectTo">Перейти на сайт</a>
		</div>

		<!-- AGREEMENT -->
		<p>
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
