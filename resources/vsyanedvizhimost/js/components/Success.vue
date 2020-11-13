<template>
	<div class="success-view flex-grow flex flex-col justify-center">
		<div
			class="success-view-content flex flex-col flex-grow tablet:justify-center"
		>
			<h2>Спасибо!</h2>
			<h4>Ваша заявка принята</h4>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from "vuex";
	export default {
		name: "Success",
		data: () => ({}),
		computed: {
			...mapGetters(["redirectTo"]),
		},
	};
</script>