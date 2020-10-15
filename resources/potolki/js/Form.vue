<template>
    <form class="form" @submit.prevent="submitForm">
        <div class="input_field">
            <!--<masked-input
                type="tel"
                autocomplete="off"
                placeholder="Ваш телефон"
                class="input"
                :class="{ 'error': !isValid }"
                v-model="$v.phone.$model"
                :mask="{
                    pattern: '\+7 (V11) 111-11-11',
                    formatCharacters: {
                        'V': {
                            validate: char => /[9 | 4]/.test(char)
                        },
                    },
                }"
                @focus.native="isValid = true"
            />-->
            <input
                type="tel"
                autocomplete="off"
                placeholder="Ваш телефон"
                class="input"
                :class="{ 'error': !isValid }"
                v-mask="{mask: '+7 (999) 999-99-99'}"
                v-model="$v.phone.$model"
                v-on:change="maskCheck"
                @focus="isValid = true"
            />
            <div v-if="!isValid" class="error_wrapper">
                <span class="error_alert">некорректный телефон</span>
            </div>

        </div>
        <div class="input_field">
            <button class="btn btn_purple btn_pulse"><span>{{buttonName}}</span></button>
        </div>
    </form>
</template>
<script>
    import MaskedInput from 'vue-masked-input'
    import { required, helpers } from 'vuelidate/lib/validators'
    import axios from 'axios';

    //валидация телефона по регулярному вырожению
    const phoneValidat = helpers.regex('phoneValidat', /^(\+)?(\(\d{2,3}\) ?\d|\d)(([ \-]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d$/)

    export default {
        data: () => ({
            phone: '',
            isValid: true,
        }),
        props: {
            buttonName: {
                type: String,
                default: 'Заказать'
            },
            title: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: ''
            }
        },
        validations: {
            phone: {
                required,
                phoneValidat
            }
        },
        methods:{
            maskCheck: function (field){
                if (field.target.inputmask.isComplete() || field.target.inputmask.isValid()) {
                    this.isValid = true
                } else {
                    this.isValid = false
                }
            },
            submitForm() {
                if(this.$v.phone.$invalid){
                    this.isValid = false
                }else{
                    this.isValid = true
                    if(this.type === 'callback'){
                        ga.getAll()[0].send('event', 'callback', 'send');
                        ym(40202559,'reachGoal','form-sub')
                    }else{
                        ga.getAll()[0].send('event', 'lead', 'send')
                        ym(40202559,'reachGoal','lead')
                    }
                    fbq('track', 'Lead');
                    window.pixel.Event('lead');
                    window.pixel.Add(32528967);

                    axios.post('/forms/add-lead', {
                        phone: this.phone,
                        name: 'Лидмагнит потолки',
                        city: this.$store.state.city.bx_code,
                        city_name: this.$store.state.city.name
                    }).then(response => (
                        this.phone = '',
                            this.$store.state.isSuccess = true,
                            this.$store.state.isModal = true
                    ))
                }
            }
        },
        components: { MaskedInput }
    }
</script>
