<template>
    <div
            class="flex flex-col flex-grow home-view"
        >
            <div
                class="home-view-content md:flex-grow md:flex md:flex-col md:justify-center"
            >
                <h1>Интернет-магазин дизайнерских светильников «Romatti» от 9 800 ₽</h1>
                <h5>
                    Оставьте ваш номер телефона и мы вышлем на WhatsApp каталог с ценами в&nbsp;течение 5&nbsp;минут
                </h5>
                <Form />

                <!-- GOTO WEBSITE -->
                <a :href="redirectTo">Перейти на сайт</a>
            </div>

            <!-- AGREEMENT -->
            <p class="mt-auto">
                Оставляя контактную информацию, вы <span>соглашаетесь</span> на
                обработку персональных&nbsp;данных
            </p>
        </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Form from './Form'
export default {
    name: 'Home',
    data:()=> ({}),
    computed: {
        ...mapGetters(['redirectTo'])
    },
    components: {
        Form
    }
}
</script>
