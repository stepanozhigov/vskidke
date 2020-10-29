<template>
	<div class="success-view flex-grow flex flex-col justify-center">
		<div class="success-view-content flex flex-col flex-grow">
			<h2>Спасибо!</h2>
			<h4>Ваша заявка принята</h4>
			<a :href="redirectTo" class="w-full">Перейти на сайт</a>
		</div>
	</div>
</template>
<script>
	import { mapGetters, mapActions } from "vuex";
	export default {
		name: "Success",
		data: () => ({}),
		computed: {
			...mapGetters(["redirectTo"]),
		},
	};
</script>