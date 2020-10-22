<template>
	<div class="app-template flex flex-col">
		<!-- HEADER -->
		<app-header></app-header>
		<!-- /HEADER -->

		<!-- HOME VIEW -->
		<home v-if="!isSuccess && !isModal"></home>
		<!-- /HOME VIEW -->

		<!-- SUCCESS VIEW -->
		<success v-if="isSuccess && isModal"></success>
		<!-- /SUCCESS VIEW -->

		<!-- MODAL VIEW -->
		<modal v-if="!isSuccess && isModal"></modal>
		<!-- /MODAL VIEW -->
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
		mounted: function () {
			//
			//this.setSuccess();
			//this.setModal();
			//
			this.setViewHeight();
			window.addEventListener("resize", () => {
				this.setViewHeight();
			});
			window.addEventListener("orientationchange", () => this.setViewHeight());
		},
		computed: {
			...mapGetters(["isModal", "isSuccess"]),
		},
		methods: {
			...mapActions(["setModal", "unsetModal", "setSuccess", "unsetSuccess"]),
			setViewHeight: function () {
				let vh = window.innerHeight * 0.01;
				document.documentElement.style.setProperty("--vh", `${vh}px`);
				//console.log(vh);
			},
		},
	};
</script>
