import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        env: 'production',
        modal: false,
        success: false,
        ipLocation: null,
        geoCoordinates: null,
        geoLocation: null,
        redirectTo: 'https://xn----stbbddfgbcabi4bzk.xn--p1acf',
        cities: null,
        currentCity: null,
        defaultCity: {
            bx_code:792,
            code:"russia",
            name:"Россия",
            phone:"8 800 511-97-15",
            sort:0
        },
        showCityModal:false,
        area: 20,
        contactByWhatsapp: false,
        contactByPhone: false
    },
    getters: {
        isModal: state => state.modal,
        isSuccess: state => state.success,
        ipLocation: state => state.ipLocation,
        geoCoordinates: state => state.geoCoordinates,
        geoLocation: state => state.geoLocation,
        redirectTo:state =>state.redirectTo,
        env:state =>state.env,
        cities: state =>state.cities,
        currentCity: state=>state.currentCity,
        defaultCity: state=>state.defaultCity,
        area: state=>state.area,
        contactByWhatsapp: state=>state.contactByWhatsapp,
        contactByPhone: state=>state.contactByPhone,
        showCityModal: state=>state.showCityModal,
    },
    mutations: {
        SET_ENV: (state,payload) => (state.env = payload),
        SET_MODAL: state => (state.modal = true),
        UNSET_MODAL: state => (state.modal = false),
        SET_SUCCESS: state => (state.success = true),
        UNSET_SUCCESS: state => (state.success = false),
        SET_IP_LOCATION: (state, ipLocation) => (state.ipLocation = ipLocation),
        SET_GEO_COORDINATES: (state, geoCoordinates) => (state.geoCoordinates = geoCoordinates),
        SET_GEO_LOCATION: (state, geoLocation) =>
            (state.geoLocation = geoLocation),
        SET_CITIES: (state,payload) => (state.cities = payload),
        SET_CURRENT_CITY: (state,payload) => (state.currentCity = payload),
        SET_AREA: (state,payload) => (state.area = payload),
        SET_CONTACTBY_WHATSAPP: (state,payload) => (state.contactByWhatsapp = payload),
        SET_CONTACTBY_PHONE: (state,payload) => (state.contactByPhone = payload),
        SHOW_CITY_MODAL: (state,payload) => (state.showCityModal = payload)
    },
    actions: {
        setEnv: (context,payload) => context.commit("SET_ENV",payload),
        setModal: context => context.commit("SET_MODAL"),
        unsetModal: context => context.commit("UNSET_MODAL"),
        setSuccess: context => context.commit("SET_SUCCESS"),
        unsetSuccess: context => context.commit("UNSET_SUCCESS"),
        setIpLocation: (context, payload) =>
            context.commit("SET_IP_LOCATION", payload),
        setGeoLocation: (context, payload) =>
            context.commit("SET_GEO_LOCATION", payload),
        setGeoCoordinates: (context, payload) =>
            context.commit("SET_GEO_COORDINATES", payload),
        setCities: (context,payload) => {
            const otherCity = {
                'bx_code': 792,
                'name' : 'Другой',
                'code': 'drugoy',
                'phone' : '8 800 511-97-15',
                'sort' : 0
            }
            payload.push(otherCity);
            context.commit("SET_CITIES",payload)
        },
        setCurrentCity: (context, payload) => {
            context.commit("SET_CURRENT_CITY", payload)
        },
        setArea: (context, payload) => {
            context.commit("SET_AREA", payload)
        },
        showCityModal: (context) => {
            context.commit('SHOW_CITY_MODAL',!context.getters.showCityModal);
        }

    }
});
