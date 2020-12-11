<template>
	<header class="app-header">
		<logo></logo>
		<img src="/beflight/images/Christmas_Balls.png" alt="" />
		<phone></phone>
	</header>
</template>
<script>
	import Logo from "./Logo";
	import Phone from "./Phone";
	export default {
		name: "Header",
		data: () => ({}),
		components: {
			Logo,
			Phone,
		},
	};
</script>