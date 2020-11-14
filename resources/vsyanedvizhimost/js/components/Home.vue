<template>
	<div class="flex flex-col flex-grow home-view">
		<div class="home-view-content tablet:flex-grow tablet:flex tablet:flex-col">
			<h1>
				Продажа жилых комплексов комфорт и бизнес-класса
				от&nbsp;7,9&nbsp;млн.&nbsp;руб. в&nbsp;Москве
			</h1>
			<h3>
				Оставьте ваш WhatsApp номер и получите ценное предложение от&nbsp;ЖК с
				лучшими ценами в&nbsp;течении&nbsp;5&nbsp;минут!
			</h3>
			<Form />

			<!-- GOTO WEBSITE -->
			<div>
				<a :href="redirectTo">Перейти на сайт</a>
			</div>
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
