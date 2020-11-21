<template>
	<section class="calculator">
		<div class="calculator--content">
			<h2 class="calculator--content-title">
				Получите точный расчёт<br />без замера <span>за 5 минут!</span>
			</h2>
			<p class="calculator--content-area">
				Укажите общую площадь ваших<br />потолков, перемещая ползунок
			</p>

			<!-- slider here-->
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
						type="radio"
						name="radio"
						value="whatsapp"
						v-model="contactBy"
						@click="setContactBy('whatsapp')"
					/>
					<span class="checkbox-checkmark"></span>
					На WhatsApp
				</label>
				<label class="checkbox-container">
					<input
						type="radio"
						value="phone"
						v-model="contactBy"
						name="radio"
						@click="setContactBy('phone')"
					/>
					<span class="checkbox-checkmark"></span>
					По телефону
				</label>
			</div>
		</div>
	</section>
</template>
<script>
	import VueSlider from "vue-slider-component";
	export default {
		name: "Calculator",
		data() {
			return {
				area: 20,
				selected: false,
				contactBy: false,
			};
		},
		methods: {
			lengthTooltip: function (value) {
				return value + " ";
			},
			setContactBy: function (val) {
				if (val != this.contactBy) {
					this.contactBy = val;
				} else {
					this.contactBy = false;
				}
			},
		},
		components: {
			VueSlider,
		},
	};
</script>