<template>
	<section class="header">
		<div class="header--content">
			<div class="header--content-logo">
				<img src="ekonompotolok/images/logo.svg" alt="logo" class="" />
			</div>

			<div class="header--content-city">
				<div class="header--content-city-name">Город</div>
				<a class="header--content-city-phone" href="tel:88005119715"
					>8 800 511-97-15</a
				>
			</div>

			<div class="header--content-offer">
				<p class="header--content-offer-day">за 1 день</p>
				<h1 class="header--content-offer-ceiling">Натяжные<br />потолки</h1>
				<h3 class="header--content-offer-today">
					Только сегодня<br />
					ваша скидка
				</h3>
				<img
					src="ekonompotolok/images/monday.png"
					alt="monday"
					class="header--content-offer-monday"
				/>
				<p class="header--content-offer-rush">
					Осталось 7 замеров.<br />Успейте записаться!
				</p>
			</div>
			<form class="header--content-form">
				<input
					type="tel"
					autocomplete="off"
					required="required"
					placeholder="Введите ваш номер"
					class="form-input"
				/>
				<button class="form-button">Записаться</button>
			</form>
		</div>
	</section>
</template>
<script>
	export default {
		name: "Header",
		data: () => ({}),
	};
</script>
