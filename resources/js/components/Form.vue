<template>
  <form
    class="form-template"
    @submit.prevent="submitForm"
    :class="{ 'form-callback': type == 'callback' }"
  >
    <label for="phone" class="relative block label-phone">
      <vue-tel-input
        v-model="phone"
        v-bind="settings"
        @validate="onCountryValidate"
        @onInput="onCountryInput"
        @country-changed="onCountryChange"
        :placeholder="phonePlaceholder"
        autocomplete="off"
      ></vue-tel-input>
      <span v-if="phoneIsValid" class="flex items-center absolute svg-valid">
        <svg
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
        </svg>
      </span>
    </label>

    <label for="email" class="relative block label-email">
      <input
        type="email"
        name="email"
        class="email"
        v-model="email"
        :placeholder="emailPlaceholder"
        autocomplete="off"
        required
      />
      <span
        v-if="!$v.email.$invalid"
        class="flex items-center absolute svg-valid"
      >
        <svg
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
        </svg>
      </span>
    </label>

    <label class="relative block label-submit">
      <button
        class="button-pulse block"
        :class="{ disabled: !formValid }"
        :disabled="!formValid"
      >
        <span v-if="type == 'form' && locale == 'ru'"
          >Получить консультацию и рассчёт</span
        >
        <span v-if="type == 'form' && locale == 'en'"
          >Get Consultation and Price</span
        >

        <span v-if="type == 'callback' && locale == 'ru'">Заказать звонок</span>
        <span v-if="type == 'callback' && locale == 'en'"
          >Request a callback</span
        >
      </button>
      <span v-if="formValid" class="flex items-center absolute svg-submit">
        <svg
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
        </svg>
      </span>
    </label>
  </form>
</template>

<script>
import { VueTelInput } from "vue-tel-input";
import { email, required, helpers } from "vuelidate/lib/validators";
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    email: "",
    phone: "",
    dialCode: "",
    phoneIsValid: false,
    onFocus: false,
    settings: {
      placeholder: "Ваш телефон *",
      disabledFormatting: false,
      enabledCountryCode: true,
      mode: "international",
      preferredCountries: ["fr", "us", "gb"],
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
    ...mapGetters([
      "isModal",
      "isSuccess",
      "geoLocation",
      "ipLocation",
      "locale",
      "redirectTo",
    ]),
    formValid: function () {
      return !this.$v.email.$invalid && this.phoneIsValid;
    },
    geoAddress() {
      if (this.geoLocation) {
        return (
          this.geoLocation.address.countryName +
          ", " +
          this.geoLocation.address.city
        );
      }
      return "";
    },
    ipAddress() {
      //return this.ipLocation;
      return this.ipLocation;
    },
    url() {
      switch (this.locale) {
        case "ru":
          return "lmr.vskidke.ru";
        case "en":
          return "lme.vskidke.ru";
      }
    },
    emailPlaceholder() {
      switch (this.locale) {
        case "ru":
          return "Электронная Почта *";
        case "en":
          return "Your E-mail *";
      }
    },
    phonePlaceholder() {
      switch (this.locale) {
        case "ru":
          return "Ваш телефон *";
        case "en":
          return "Your phone number *";
      }
    },
  },
  methods: {
    ...mapActions([
      "setModal",
      "unsetModal",
      "setSuccess",
      "unsetSuccess",
      "setIpLocation",
    ]),
    submitForm() {
      if (this.formValid) {
        axios
          .post("api/lead", {
            phone: this.phone,
            url: this.url,
            email: this.email,
            geoLocation: this.geoAddress,
            ipLocation: this.ipAddress,
          })
          .then((response) => {
            console.log(response);
            fbq("track", "Lead");
            if (this.type == "form") {
              ym(62231704, "reachGoal", "leadmagnit-form-open-account");
              ga("send", "event", "leadmagnit-forms-accoint-in-KZ", "send");
            } else if (this.type == "callback") {
              ym(62231704, "reachGoal", "leadmagnit-callback-open-account");
              ga("send", "event", "leadmagnit-callback-accoint-in-KZ", "send");
            }
            this.phone = "";
            //window.location.replace(this.redirectTo);
            this.setSuccess();
            this.setModal();
          });
      }
    },
    onCountryValidate({ number, isValid, country }) {
      //console.log(number);
    },
    onCountryInput(input) {
      //console.log(input);
      this.phoneIsValid = input.isValid;
    },
    onCountryChange(country) {
      if (this.ipLocation == null) this.setIpLocation(country.name);
      //console.log(country);
      this.phone = "";
    },
  },
  validations: {
    email: {
      email,
      required,
    },
  },
};
</script>
