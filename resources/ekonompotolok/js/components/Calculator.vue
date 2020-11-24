<template>
	<section class="calculator">
		<div class="calculator--content">
			<h2 class="calculator--content-title">
				Получите точный расчёт<br />без замера <span>за 5 минут!</span>
			</h2>
			<p class="calculator--content-area">
				Укажите общую площадь ваших<br />потолков, перемещая ползунок
			</p>

			<div class="calculator--content-slider">
				<vue-slider
					class="slider"
					tooltip="always"
					:min="1"
					:max="150"
					:step="1"
					v-model="area"
					:tooltip-formatter="lengthTooltip"
				>
				</vue-slider>
			</div>

			<p class="calculator--content-contact">
				Как вам удобнее получить расчёт<br />и консультацию?
			</p>

			<div class="calculator--content-contactby">
				<label class="checkbox-container">
					<input
						type="checkbox"
						name="whatsapp"
						value="whatsapp"
						v-model="contactByWhatsapp"
					/>
					<span class="checkbox-checkmark"></span>
					На WhatsApp
				</label>
				<label class="checkbox-container">
					<input
						type="checkbox"
						name="phone"
						value="phone"
						v-model="contactByPhone"
					/>
					<span class="checkbox-checkmark"></span>
					По телефону
				</label>
			</div>

			<calculator-form></calculator-form>
		</div>
	</section>
</template>
<script>
	import { mapGetters, mapActions, mapMutations } from "vuex";
	import VueSlider from "vue-slider-component";
	import CalculatorForm from "./CalculatorForm";
	export default {
		name: "Calculator",
		data() {
			return {
				// contactByWhatsapp: false,
				// contactByPhone: false,
				//lengthTooltip: "{value}%",
			};
		},
		methods: {
			...mapActions(["setArea"]),
			lengthTooltip: function (value) {
				return value + " кв.м";
			},
		},
		computed: {
			area: {
				get() {
					return this.$store.getters.area;
				},
				set(value) {
					this.$store.dispatch("setArea", value);
				},
			},
			contactByWhatsapp: {
				get() {
					return this.$store.getters.contactByWhatsapp;
				},
				set(value) {
					this.$store.commit("SET_CONTACTBY_WHATSAPP", value);
				},
			},
			contactByPhone: {
				get() {
					return this.$store.getters.contactByPhone;
				},
				set(value) {
					this.$store.commit("SET_CONTACTBY_PHONE", value);
				},
			},
		},
		components: {
			VueSlider,
			CalculatorForm,
		},
	};
</script>