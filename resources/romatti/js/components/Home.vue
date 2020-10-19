<template>
    <div
            class="home-view flex-grow flex flex-col"
        >
            <div
                class="home-view-content md:flex-grow md:flex md:flex-col md:justify-center"
            >
                <h1>Обучение вождению</h1>
                <h3>
                    <span>— по современной методике</span>
                    <span>— в автошколе Перми</span>
                    <span>— от 10800 ₽</span>
                </h3>
                <h5>
                    Оставьте номер телефона и мы отправим специальное предложение на&nbsp;WhatsApp в&nbsp;течении 5&nbsp;минут
                </h5>
                <Form />
                <a :href="redirectTo">Перейти в Instagram</a>
            </div>

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