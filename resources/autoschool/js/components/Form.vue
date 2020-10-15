<template>
    <!-- {{--FORM--}} -->
    <form
        @submit.prevent="submitForm"
        class="w-full flex flex-col items-center mx-auto"
    >
        <!-- {{--PHONE INPUT--}} -->

        <input
            v-model="phone"
            type="tel"
            autocomplete="off"
            class="w-full"
            placeholder="Ваш телефон*"
            v-mask="{ mask: '\+7 (999) 999-99-99', greedy: true }"
            v-on:change="maskCheck"
        />

        <!-- {{--SUBMIT PHONE--}} -->
        <button
            class="button-pulse w-full flex justify-center focus:outline-none active:outline-none"
        >
            Отправить заявку
        </button>
    </form>
</template>

<script>
import MaskedInput from "vue-masked-input";
import { required, helpers } from "vuelidate/lib/validators";
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

//валидация телефона по регулярному вырожению
const phoneValidate = helpers.regex(
    "phoneValidate",
    /^(\+)?(\(\d{2,3}\) ?\d|\d)(([ \-]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d$/
);

export default {
    data: () => ({
        phone: "",
        isValid: true,
        onFocus: false
    }),
    props: {
        
    },
    validations: {
        phone: {
            required,
            phoneValidate
        }
    },
    computed: {
        ...mapGetters(["isModal", "isSuccess","redirectTo"])
    },
    methods: {
        ...mapActions(["setModal", "unsetModal", "setSuccess", "unsetSuccess"]),
        submitForm() {
            if (this.$v.phone.$invalid) {
                this.isValid = false;
            } else {
                this.isValid = true;
                axios
                    .post("/lead", {
                        phone: this.phone,
                        tag: "Автошкола 'Лайк'"
                    })
                    .then(response => {
                        ym(68288701,'reachGoal','send_form');
                        window.location.replace(this.redirectTo);
                        // this.setSuccess();
                        // this.setModal();
                    });
            }
        },
        maskCheck: function(field) {
            if (field.target.inputmask.isComplete()) {
                this.isValid = true;
            } else {
                this.isValid = false;
            }
        }
    },
    components: { MaskedInput }
};
</script>
