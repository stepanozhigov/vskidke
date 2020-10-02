<template>
  <form
    class="form-template"
    :class="{
      'type-form': type == 'form',
      'type-callback': type == 'callback',
    }"
    @submit.prevent="submitForm"
  >
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
              validate: (char) => /[0-9]/.test(char),
            },
          },
        }"
        @focus.native="(isValid = true), (onFocus = true)"
        @blur.native="onFocus = false"
      />
    </div>

    <button class="button-pulse">
      <span v-if="type == 'form'">Получить консультацию и рассчёт</span>
      <span v-if="type == 'callback'">Заказать звонок</span>
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
    url: "lmr.vskidke.ru",
    dialCode: "",
    isValid: true,
    onFocus: false,
  }),
  components: { MaskedInput },
  mounted() {
    //console.log("Component mounted.");
  },
  computed: {
    ...mapGetters(["isModal", "isSuccess"]),
    phoneNumber: function () {
      return "+" + this.dialCode + " " + this.phone;
    },
  },
  props: {
    type: {
      type: String,
      default: "none",
    },
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
            url: this.url,
          })
          .then((response) => {
            console.log(response);

            if (type == "form") {
              ym(62231704, "reachGoal", "leadmagnit-form-open-account");
              ga("send", "event", "leadmagnit-forms-accoint-in-KZ", "send");
            } else if (type == "callback") {
              ym(62231704, "reachGoal", "leadmagnit-callback-open-account");
              ga("send", "event", "leadmagnit-callback-accoint-in-KZ", "send");
            }

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
    },
  },
  validations: {
    phone: {
      required,
      phoneValidat,
    },
  },
};
</script>
