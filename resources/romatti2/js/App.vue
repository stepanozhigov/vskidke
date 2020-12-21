<template>
	<div class="app-template">
		<!-- HEADER -->
		<app-header></app-header>
		<!-- /HEADER -->

		<!-- HOME VIEW -->
		<home v-if="isHome"></home>
		<!-- /HOME VIEW -->

		<!-- MENU VIEW -->
		<app-menu v-if="isMenu"></app-menu>
		<!-- /MENU VIEW -->

		<!--VIEW -->
		<modal v-if="isCallback"></modal>
		<!-- /MODAL VIEW -->

		<!-- SUCCESS VIEW -->
		<success v-if="isSuccess"></success>
		<!-- /SUCCESS VIEW -->
	</div>
</template>

<script>
	import axios from "axios";
	import { mapGetters, mapActions } from "vuex";
	import Form from "./components/Form";
	import Header from "./components/Header";
	import Home from "./components/Home";
	import Success from "./components/Success";
	import Modal from "./components/Modal";
	import Menu from "./components/Menu";
	export default {
		name: "App",
		data: () => ({}),
		components: {
			"app-header": Header,
			Home,
			Success,
			Modal,
			Form,
			"app-menu": Menu,
		},
		props: {
			environment: {
				type: String,
				default: "",
			},
			utm: {
				type: Object,
			},
			referer: {},
		},
		mounted: function () {
			this.setEnv(this.environment);
			this.setReferer(this.referer);
			this.setUtm(this.utm);
			this.setHome();
			// this.setMenu();
			//this.setSuccess();
			//this.setCallback();
			//
			this.setViewHeight();
			window.addEventListener("resize", () => {
				this.setViewHeight();
			});
			window.addEventListener("orientationchange", () => this.setViewHeight());
		},
		computed: {
			...mapGetters(["isMenu", "isSuccess", "env", "isCallback", "isHome"]),
		},
		methods: {
			...mapActions([
				"setEnv",
				"setSuccess",
				"unsetSuccess",
				"setCallback",
				"unsetCallback",
				"setSuccess",
				"setHome",
				"unsetHome",
				"setMenu",
				"unsetMenu",
				"setReferer",
				"setUtm",
			]),
			setViewHeight: function () {
				let vh = window.innerHeight * 0.01;
				document.documentElement.style.setProperty("--vh", `${vh}px`);
				//console.log(vh);
			},
		},
	};
</script>
