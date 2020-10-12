<template>
    <div class="app-template flex flex-col" :class="localeClass">
        <!-- HEADER -->
        <header class="app-header flex flex-row justify-between items-center">
            <!-- {{-- SVG --}} -->
            <div class="app-header-logo">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="208"
                    class="h-full"
                    viewBox="0 0 208 48"
                >
                    <g>
                        <g>
                            <g>
                                <path
                                    fill="#13100d"
                                    d="M50.19 31.032V9.07h4.526v22.717c0 1.802.98 2.939 2.723 2.939a2.586 2.586 0 0 0 2.723-2.94V9.07h4.575v21.962c0 5.29-2.772 7.837-7.298 7.837s-7.249-2.547-7.249-7.837z"
                                />
                            </g>
                            <g>
                                <path
                                    fill="#13100d"
                                    d="M74.007 23.852v-10.57h2.297c1.721 0 2.6.97 2.6 2.86v4.899c0 1.831-.879 2.811-2.6 2.811zM69.55 38.458h4.496V28.152h2.175c4.526 0 7.249-2.635 7.249-7.836v-3.41c0-5.318-2.723-7.836-7.249-7.836H69.55z"
                                />
                            </g>
                            <g>
                                <path
                                    fill="#13100d"
                                    d="M91.696 23.852v-10.57h2.336c1.721 0 2.6.97 2.6 2.86v4.899c0 1.831-.879 2.811-2.6 2.811zM87.18 38.458h4.555V28.152h2.106c4.536 0 7.259-2.635 7.259-7.836v-3.41c0-5.318-2.723-7.836-7.259-7.836H87.18z"
                                />
                            </g>
                            <g>
                                <path
                                    fill="#13100d"
                                    d="M104.87 9.07h12.49v4.242h-7.964v8.238h6.798v4.202h-6.798v8.445h7.964v4.231h-12.49z"
                                />
                            </g>
                            <g>
                                <path
                                    fill="#13100d"
                                    d="M126.524 23.303v-9.991h2.263c1.714 0 2.556.97 2.556 2.86v4.28c0 1.872-.842 2.851-2.556 2.851zm-4.614 15.155h4.526V27.143h1.47l3.27 11.334h4.576l-3.82-11.96c2.576-1.049 3.918-3.155 3.918-6.926v-2.684c0-5.32-2.596-7.837-7.132-7.837h-6.788z"
                                />
                            </g>
                            <g>
                                <path
                                    fill="#13100d"
                                    d="M139.5 31.072V16.467c0-5.212 2.762-7.837 7.17-7.837 4.409 0 7.25 2.527 7.25 7.768v2.116h-4.575v-2.84c0-1.803-.794-2.851-2.635-2.851-1.842 0-2.714 1.077-2.714 2.85v16.154a2.576 2.576 0 0 0 2.812 2.86 2.488 2.488 0 0 0 2.762-2.811v-3.184h4.575v2.42c0 5.25-2.939 7.768-7.386 7.768-4.448 0-7.259-2.557-7.259-7.808z"
                                />
                            </g>
                            <g>
                                <path
                                    fill="#13100d"
                                    d="M162.565 24.49v-8.62a2.715 2.715 0 0 1 1.279-2.541 2.704 2.704 0 0 1 2.84 0 2.715 2.715 0 0 1 1.279 2.54v8.621zm-4.486 13.969h4.535v-9.796h5.359v9.796h4.565V16.546c0-5.29-2.802-7.896-7.288-7.896-4.487 0-7.22 2.606-7.22 7.896z"
                                />
                            </g>
                            <g>
                                <path
                                    fill="#13100d"
                                    d="M176.61 31.112v-2.429h4.526v3.194c0 1.802.803 2.85 2.645 2.85 2.096 0 2.684-1.43 2.684-3.526v-1.137c0-2.596-.98-3.487-2.94-4.32l-1.723-.715c-3.262-1.303-5.065-3.36-5.065-7.474v-1.048c0-5.33 2.596-7.837 7.122-7.837s7.043 2.44 7.043 7.768v2.106h-4.565v-2.87c0-1.802-.715-2.772-2.517-2.772-1.803 0-2.596 1.038-2.596 3.144v1.47c0 2.096.627 2.89 3.017 3.82l1.675.666c3.566 1.391 5.114 3.703 5.114 7.73v.92c0 5.8-2.724 8.229-7.25 8.229-4.525 0-7.17-2.557-7.17-7.769z"
                                />
                            </g>
                            <g>
                                <path
                                    fill="#13100d"
                                    d="M195.23 9.07h12.5v4.242h-7.974v8.238h6.798v4.202h-6.798v8.445h7.974v4.231h-12.5z"
                                />
                            </g>
                            <g>
                                <path
                                    fill="#13100d"
                                    d="M.06 29.64l20.327 11.755 15.252-8.816v5.877l-15.252 8.817L.06 35.518V29.64z"
                                />
                            </g>
                            <g>
                                <path
                                    fill="#13100d"
                                    d="M10.22 29.638l10.168-5.878v5.878l-5.084 2.938-5.084-2.938z"
                                />
                            </g>
                            <g>
                                <path
                                    fill="#13100d"
                                    d="M.06 6.13l20.327 11.755L35.639 9.07v5.877l-15.252 8.817L.06 12.008V6.13z"
                                />
                            </g>
                            <g>
                                <path
                                    fill="#13100d"
                                    d="M10.22.25l15.252 8.816-5.084 2.94L10.23 6.127 10.22.25z"
                                />
                            </g>
                        </g>
                    </g>
                </svg>
            </div>
            <!-- {{-- Phone call --}} -->
            <div class="app-call flex flex-col md:flex-row">
                <!-- {{-- Make call --}} -->
                <a href="tel:8 910 235-89-36" class="app-call-number">
                    +7 967 069-04-29
                </a>

                <!-- {{-- Book call --}} -->
                <span v-if="isRu" @click="toggleModal()" class="app-call-book">
                    Заказать звонок
                </span>
                <span
                    v-else-if="isEn"
                    @click="toggleModal()"
                    class="app-call-book"
                >
                    Request a callback
                </span>
            </div>
        </header>
        <!-- /HEADER -->

        <!-- HOME VIEW -->
        <div
            v-if="!isSuccess && !isModal"
            class="home-view flex-grow flex flex-col"
        >
            <!-- CONTENT -->
            <section class="home-view-content flex flex-col flex-grow">
                <div class="flex-grow md:flex md:flex-col md:justify-center">
                    <!-- H1 -->
                    <h1 v-if="isRu">Открытие банковских счетов</h1>
                    <h1 v-else-if="isEn">Secure Bank Accounts</h1>

                    <!-- H3 -->
                    <h3 v-if="isRu">
                        за 10 дней для&nbsp;офшорных компаний в&nbsp;Казахстане
                        и&nbsp;Кыргызстане
                    </h3>
                    <h3 v-else-if="isEn">
                        for offshore companies in&nbsp;Kazakhstan and Kyrgyzstan
                        in&nbsp;10&nbsp;days!
                    </h3>

                    <!-- H5 -->
                    <h5 v-if="isRu">
                        Оставьте номер телефона и&nbsp;получите подробную
                        консультацию в течение<br />
                        5&nbsp;минут по&nbsp;телефону или&nbsp;WhatsApp
                    </h5>
                    <h5 v-if="isEn">
                        Leave your contacts and get consultation from our
                        experts<br />
                        in&nbsp;5&nbsp;minutes! Phone and WhatsApp consultation
                        available
                    </h5>

                    <!-- FORM -->
                    <Form type="form" />

                    <!-- A -->
                    <a v-if="isRu" href="http://uppercase.group/"
                        >Перейти на сайт</a
                    >
                    <a v-if="isEn" href="http://uppercase.group/"
                        >Go to the Website</a
                    >
                </div>

                <!-- P -->
                <p v-if="isRu">
                    Оставляя контактную информацию, вы
                    <span>соглашаетесь</span> на обработку персональных данных
                </p>
                <p v-else-if="isEn">
                    I agree to Terms and Conditions and personal data consent
                    form.
                </p>
            </section>
            <!-- /CONTENT -->
        </div>
        <!-- /HOME VIEW -->

        <!-- SUCCESS VIEW -->
        <div
            v-if="isSuccess && isModal"
            class="success-view flex-grow flex flex-col justify-center"
        >
            <h2>Спасибо!</h2>
            <h4>Ваша заявка принята</h4>
            <a
                href="http://uppercase.group/"
                class="flex justify-center items-center button-pulse"
                >Перейти на сайт</a
            >
        </div>
        <!-- /SUCCESS VIEW -->

        <!-- MODAL VIEW -->
        <div
            v-if="!isSuccess && isModal"
            class="modal-view mx-auto relative flex-grow flex flex-col justify-center"
        >
            <div
                @click="toggleModal"
                class="absolute top-1 right-1 cursor-pointer"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 18 18"
                >
                    <path
                        fill="none"
                        stroke="#d9d7d7"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="20"
                        stroke-width="1.5"
                        d="M1 1l16 16"
                    />
                    <path
                        fill="none"
                        stroke="#d9d7d7"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="20"
                        stroke-width="1.5"
                        d="M17 1L1 17"
                    />
                </svg>
            </div>
            <Form type="callback" />
        </div>
        <!-- /MODAL VIEW -->
    </div>
</template>

<script>
import axios from "axios";
import Form from "./components/Form";
import { mapGetters, mapActions } from "vuex";
export default {
    name: "App",
    data: () => ({
        latitude: null,
        longitude: null,
        gettingLocation: false,
        geoError: false,
        geoErrorStr: null,
        apiKey: "izLr3tzed9tqFm2ArDXT5J0FPBZHbfuztoWv7-WwU4Q"
    }),
    components: {
        Form
    },
    // CREATED
    created() {
        this.getDomainLocale();
        this.getAddress();
    },
    mounted: function() {
        this.setViewHeight();
        window.addEventListener("resize", () => {
            this.setViewHeight();
        });
        window.addEventListener("orientationchange", () =>
            this.setViewHeight()
        );
    },
    computed: {
        ...mapGetters([
            "isModal",
            "isSuccess",
            "ipLocation",
            "geoLocation",
            "locale"
        ]),
        addressUrl() {
            return `https://revgeocode.search.hereapi.com/v1/revgeocode?apiKey=${this.apiKey}&at=${this.latitude},${this.longitude}&lang=en-US`;
        },
        country() {
            return this.geoLocation.address.countryName;
        },
        city() {
            return this.geoLocation.address.city;
        },
        localeClass() {
            return "locale-" + this.locale;
        },
        isRu() {
            return this.locale == "ru";
        },
        isEn() {
            return this.locale == "en";
        }
    },
    methods: {
        ...mapActions([
            "setModal",
            "unsetModal",
            "setSuccess",
            "unsetSuccess",
            "setIpLocation",
            "setGeoLocation",
            "setLocale"
        ]),
        setViewHeight: function() {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);
            //console.log(vh);
        },
        getDomainLocale() {
            if (location.hostname.includes("lmr")) {
                this.setLocale("ru");
            } else if (location.hostname.includes("lme")) {
                this.setLocale("en");
            } else {
                this.setLocale("en");
            }
        },
        toggleModal() {
            if (this.isModal) {
                this.unsetModal();
            } else {
                this.setModal();
            }
            this.unsetSuccess();
        },

        async getCoords() {
            return new Promise((resolve, reject) => {
                if (!("geolocation" in navigator)) {
                    this.geoError = true;
                    reject(new Error("Geolocation is not available."));
                }

                navigator.geolocation.getCurrentPosition(
                    pos => {
                        resolve(pos);
                    },
                    err => {
                        reject(err);
                    }
                );
            });
        },

        async getAddress() {
            this.gettingLocation = true;
            try {
                this.gettingLocation = false;
                const location = await this.getCoords();
                this.latitude = location.coords.latitude;
                this.longitude = location.coords.longitude;
                const address_data = await axios(this.addressUrl);
                if (address_data.data.items.length > 0)
                    this.setGeoLocation(address_data.data.items[0]);
            } catch (e) {
                this.gettingLocation = false;
                this.errorStr = e.message;
            }
        }
    }
};
</script>
