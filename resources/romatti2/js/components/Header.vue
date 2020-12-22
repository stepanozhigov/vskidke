<template>
	<header class="app-header" :class="{ modal: !isHome }">
		<div class="app-header-menu">
			<a class="menu-icon" href="#" @click.prevent="toggleMenu">
				<svg
					v-if="!isMenu"
					xmlns="http://www.w3.org/2000/svg"
					class="icon-menu"
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
				<svg
					xmlns="http://www.w3.org/2000/svg"
					v-if="isMenu"
					class="menu-close"
					viewBox="0 0 15 15"
				>
					<g>
						<g>
							<g>
								<path
									fill="none"
									stroke="#332d2e"
									stroke-linecap="round"
									stroke-miterlimit="20"
									stroke-width="2"
									d="M1.5 4.5h12"
								/>
							</g>
							<g>
								<path
									fill="none"
									stroke="#332d2e"
									stroke-linecap="round"
									stroke-miterlimit="20"
									stroke-width="2"
									d="M1.5 8.5h12"
								/>
							</g>
							<g>
								<path
									fill="none"
									stroke="#332d2e"
									stroke-linecap="round"
									stroke-miterlimit="20"
									stroke-width="2"
									d="M1.5 12.5h8"
								/>
							</g>
						</g>
						<g><path fill="#fff" d="M0 0h15v15H0z" /></g>
						<g>
							<g transform="rotate(-45 6.5 7.5)">
								<path
									fill="none"
									stroke="#332d2e"
									stroke-linecap="round"
									stroke-miterlimit="20"
									stroke-width="2"
									d="M.5 7.5h12"
								/>
							</g>
							<g transform="rotate(45 6.5 7.5)">
								<path
									fill="none"
									stroke="#332d2e"
									stroke-linecap="round"
									stroke-miterlimit="20"
									stroke-width="2"
									d="M.5 7.5h12"
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
					<a href="https://romatti.ru/offers/">Акции</a>
				</li>
				<li>
					<a href="https://romatti.ru/catalog/">Каталог</a>
				</li>
				<li>
					<a href="https://romatti.ru/new/">Новинки</a>
				</li>
				<li>
					<a href="https://romatti.ru/sale/">Распродажа</a>
				</li>
				<li>
					<a href="https://romatti.ru/contact/">Контакты</a>
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