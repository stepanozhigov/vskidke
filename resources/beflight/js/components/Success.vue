<template>
	<div class="success-view">
		<div
			class="success-view-content flex flex-col flex-grow tablet:justify-center"
		>
			<h5>Спасибо!</h5>
			<h6>Ваша заявка принята</h6>
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