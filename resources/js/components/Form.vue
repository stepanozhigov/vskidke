<template>
    <form class="form-template" @submit.prevent="submitForm">
        <div class="flex flex-row">
            <vue-country-code @onSelect="onCountrySelect" />
            <masked-input
                type="tel"
                autocomplete="off"
                placeholder="Ваш телефон*"
                class="w-full ml-4 pl-4"
                v-model="$v.phone.$model"
                :mask="{
                    pattern: '(V11) 111-11-11',
                    formatCharacters: {
                        V: {
                            validate: char => /[0-9]/.test(char)
                        }
                    }
                }"
                @focus.native="(isValid = true), (onFocus = true)"
                @blur.native="onFocus = false"
            />
        </div>

        <button class="button-pulse">
            <span>Получить консультацию и рассчёт</span>
        </button>
    </form>
</template>

<script>
import MaskedInput from "vue-masked-input";
import { required, helpers } from "vuelidate/lib/validators";
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

//валидация телефона по регулярному вырожению
///^(\+)?(\(\d{2,3}\) ?\d|\d)(([ \-]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d$/
const phoneValidat = helpers.regex(
    "phoneValidat",
    /^(\+)?(\(\d{2,3}\) ?\d|\d)(([ \-]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d$/
);

export default {
    data: () => ({
        phone: "",
        dialCode: "",
        isValid: true,
        onFocus: false
    }),
    components: { MaskedInput },
    mounted() {
        //console.log("Component mounted.");
    },
    computed: {
        ...mapGetters(["isModal", "isSuccess"]),
        phoneNumber: function() {
            return "+" + this.dialCode + " " + this.phone;
        }
    },
    methods: {
        ...mapActions(["setModal", "unsetModal", "setSuccess", "unsetSuccess"]),
        submitForm() {
            if (this.$v.phone.$invalid) {
                this.isValid = false;
            } else {
                this.isValid = true;
                //fbq("track", "Lead");
                axios
                    .post("api/lead", {
                        phone: this.phoneNumber,
                        tag: "Uppercase"
                    })
                    .then(response => {
                        console.log(response);

                        this.phone = "";
                        this.setSuccess();
                        this.setModal();
                    });
                // this.phone = "";
                // this.setSuccess();
                // this.setModal();
            }
        },
        onCountrySelect({ name, iso2, dialCode }) {
            this.dialCode = dialCode;
        }
    },
    validations: {
        phone: {
            required,
            phoneValidat
        }
    }
};
</script>
