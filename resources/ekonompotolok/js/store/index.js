import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        env: 'local',
        modal: false,
        success: false,
        ipLocation: null,
        geoLocation: null,
        redirectTo: '',
        cities: []
    },
    getters: {
        isModal: state => state.modal,
        isSuccess: state => state.success,
        ipLocation: state => state.ipLocation,
        geoLocation: state => state.geoLocation,
        redirectTo:state =>state.redirectTo,
        env:state =>state.env,
        cities: state =>state.cities
    },
    mutations: {
        SET_ENV: (state,payload) => (state.env = payload),
        SET_MODAL: state => (state.modal = true),
        UNSET_MODAL: state => (state.modal = false),
        SET_SUCCESS: state => (state.success = true),
        UNSET_SUCCESS: state => (state.success = false),
        SET_IP_LOCATION: (state, ipLocation) => (state.ipLocation = ipLocation),
        SET_GEO_LOCATION: (state, geoLocation) =>
            (state.geoLocation = geoLocation),
        SET_CITIES: (state,payload) => (state.cities = payload)
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
        setCities: (context,payload) => {
            const otherCity = {
                'bx_code': 792,
                'name' : 'Другой',
                'phone' : '8 800 511-97-15',
                'sort' : 0
            }
            payload.push(otherCity);
            context.commit("SET_CITIES",payload)
        }
    }
});
