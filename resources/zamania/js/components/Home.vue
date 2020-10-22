<template>
	<div class="flex flex-col flex-grow home-view">
		<div
			class="home-view-content md:flex-grow md:flex md:flex-col md:justify-center"
		>
			<h1>Семейные парки в ТЦ Москвы</h1>
			<h3>
				Организация детских<br />праздников от 900
				<span class="rouble">&#8381;</span><br />
				<span>Билет в парк от 590 <span class="rouble">₽</span></span>
			</h3>
			<h5>
				Оставьте ваш WhatsApp номер, куда мы<br />вышлем расписание работы
				парков<br />и любимого праздника «Хэллоуин»!
			</h5>
			<Form />

			<!-- GOTO WEBSITE -->
			<a :href="redirectTo">Купить билет</a>
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
