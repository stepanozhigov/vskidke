<template>
  <form
    class="form-template"
    @submit.prevent="submitForm"
    :class="{ 'form-callback': type == 'callback' }"
  >
    <vue-tel-input
      v-model="phone"
      v-bind="settings"
      @validate="onValidate"
      @onInput="onInput"
      @country-changed="onCountryChange"
    ></vue-tel-input>

    <button
      class="button-pulse"
      :class="{ disabled: !inputValid }"
      v-bind:disabled="!inputValid"
    >
      <span v-if="type == 'form'">Получить консультацию и рассчёт</span>
      <span v-if="type == 'callback'">Заказать звонок</span>
    </button>
  </form>
</template>

<script>
import { VueTelInput } from "vue-tel-input";
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    phone: "",
    url: "lme.vskidke.ru",
    dialCode: "",
    isValid: false,
    onFocus: false,
    settings: {
      placeholder: "Ваш телефон *",
      disabledFormatting: false,
      enabledCountryCode: false,
      mode: "international",
      preferredCountries: ["fr", "es", "gb"],
      validCharactersOnly: true,
      dynamicPlaceholder: true,
      inputOptions: {
        showDialCode: false,
        tabindex: 0,
      },
    },
  }),
  props: {
    type: {
      type: String,
      default: "none",
    },
  },
  components: { VueTelInput },
  mounted() {
    //console.log("Component mounted.");
  },
  computed: {
    ...mapGetters(["isModal", "isSuccess"]),
    inputValid: function () {
      return this.phone.length > 0 && this.isValid;
    },
  },
  methods: {
    ...mapActions(["setModal", "unsetModal", "setSuccess", "unsetSuccess"]),
    submitForm() {
      if (this.isValid) {
        axios
          .post("api/lead", {
            phone: this.phone,
            url: this.url,
          })
          .then((response) => {
            if (this.type == "form") {
              ym(62231704, "reachGoal", "leadmagnit-form-open-account");
              ga("send", "event", "leadmagnit-forms-accoint-in-KZ", "send");
            } else if (this.type == "callback") {
              ym(62231704, "reachGoal", "leadmagnit-callback-open-account");
              ga("send", "event", "leadmagnit-callback-accoint-in-KZ", "send");
            }

            this.phone = "";
            this.setSuccess();
            this.setModal();
          });
      }
    },
    onValidate({ number, isValid, country }) {
      //console.log(number);
    },
    onInput(input) {
      //console.log(input);
      this.isValid = input.isValid;
    },
    onCountryChange(country) {
      //console.log(country);
      this.phone = "";
    },
  },
};
</script>
