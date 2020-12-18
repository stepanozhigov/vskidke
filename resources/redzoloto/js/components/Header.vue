<template>
	<header class="app-header" :class="{ modal: !isHome }">
		<div class="app-header-menu">
			<a href="#" @click.prevent="toggleMenu">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="15"
					height="11"
					viewBox="0 0 15 11"
				>
					<g>
						<g>
							<g>
								<path
									fill="none"
									stroke="#2a2828"
									stroke-linecap="round"
									stroke-miterlimit="20"
									stroke-width="2"
									d="M1.5 1.5h12"
								/>
							</g>
							<g>
								<path
									fill="none"
									stroke="#2a2828"
									stroke-linecap="round"
									stroke-miterlimit="20"
									stroke-width="2"
									d="M1.5 5.5h12"
								/>
							</g>
							<g>
								<path
									fill="none"
									stroke="#2a2828"
									stroke-linecap="round"
									stroke-miterlimit="20"
									stroke-width="2"
									d="M1.5 9.5h8"
								/>
							</g>
						</g>
					</g>
				</svg>
			</a>
			<logo></logo>
		</div>
		<phone></phone>
	</header>
</template>
<script>
	import { mapGetters, mapActions } from "vuex";
	import Logo from "./Logo";
	import Phone from "./Phone";
	export default {
		name: "Header",
		data: () => ({}),
		components: {
			Logo,
			Phone,
		},
		computed: {
			...mapGetters(["isSuccess", "env", "isCallback", "isHome", "isMenu"]),
		},
		methods: {
			...mapActions([
				"currentView",
				"setEnv",
				"setModal",
				"setSuccess",
				"setCallback",
				"setSuccess",
				"setSignup",
				"setHome",
				"setMenu",
				"setCurrentView",
				"goBack",
			]),
			toggleMenu() {
				if (this.isMenu) {
					this.goBack();
				} else this.setMenu();
			},
		},
	};
</script>