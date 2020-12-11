<template>
	<div class="app-template">
		<!-- HEADER -->
		<app-header v-if="!isSuccess"></app-header>
		<!-- /HEADER -->

		<!-- HOME VIEW -->
		<home v-if="isHome"></home>
		<!-- /HOME VIEW -->

		<!-- MODAL VIEW -->
		<modal v-if="isSignup || isCallback"></modal>
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
	export default {
		name: "App",
		data: () => ({}),
		components: {
			"app-header": Header,
			Home,
			Success,
			Modal,
			Form,
		},
		props: {
			environment: {
				type: String,
				default: "",
			},
		},
		mounted: function () {
			this.setEnv(this.environment);
			this.setHome();
			// this.setSuccess();
			//this.setModal();
			//
			this.setViewHeight();
			window.addEventListener("resize", () => {
				this.setViewHeight();
			});
			window.addEventListener("orientationchange", () => this.setViewHeight());
		},
		computed: {
			...mapGetters(["isSuccess", "env", "isCallback", "isSignup", "isHome"]),
		},
		methods: {
			...mapActions([
				"setEnv",
				"setSuccess",
				"unsetSuccess",
				"setCallback",
				"unsetCallback",
				"setSuccess",
				"setSignup",
				"unsetSignup",
				"setHome",
				"unsetHome",
			]),
			setViewHeight: function () {
				let vh = window.innerHeight * 0.01;
				document.documentElement.style.setProperty("--vh", `${vh}px`);
				//console.log(vh);
			},
		},
	};
</script>
