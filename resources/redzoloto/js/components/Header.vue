<template>
	<header class="app-header" :class="{ modal: !isHome }">
		<div class="app-header-menu">
			<a class="menu-icon" href="#" @click.prevent="toggleMenu">
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
		<div class="app-header-links">
			<ul>
				<li>
					<a
						href="https://redzoloto.ru/%D0%A5%D0%98%D0%A2-%D0%A6%D0%95%D0%9D%D0%AB-c49446184"
						>ХИТ-ЦЕНЫ
					</a>
				</li>
				<li>
					<a
						href="https://redzoloto.ru/%D0%A1%D0%95%D0%A0%D0%AC%D0%93%D0%98-c47783210"
						>Серьги</a
					>
				</li>
				<li>
					<a
						href="https://redzoloto.ru/%D0%9A%D0%9E%D0%9B%D0%AC%D0%A6%D0%90-c47783208"
						>Кольца</a
					>
				</li>
				<li>
					<a
						href="https://redzoloto.ru/%D0%9F%D0%9E%D0%94%D0%92%D0%95%D0%A1%D0%9A%D0%98-c47783207"
						>Подвески</a
					>
				</li>
			</ul>
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