import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        env: 'local',
        agreement: false,
        modal: false,
        success: false,
        ipLocation: null,
        geoLocation: null,
        redirectTo: 'https://license.kz/en/serviceGroup/63',
        utm: {
            utm_source: false,
            utm_campaign: false,
            utm_medium: false,
            utm_term: false
        }
    },
    getters: {
        isModal: state => state.modal,
        isAgreement: state => state.agreement,
        isSuccess: state => state.success,
        ipLocation: state => state.ipLocation,
        geoLocation: state => state.geoLocation,
        redirectTo:state =>state.redirectTo,
        env:state =>state.env,
        utm : state=>state.utm
    },
    mutations: {
        SET_ENV: (state,payload) => (state.env = payload),
        SET_AGREEMENT: (state,payload) => (state.agreement = payload),
        SET_MODAL: state => (state.modal = true),
        UNSET_MODAL: state => (state.modal = false),
        SET_SUCCESS: state => (state.success = true),
        UNSET_SUCCESS: state => (state.success = false),
        SET_IP_LOCATION: (state, ipLocation) => (state.ipLocation = ipLocation),
        SET_GEO_LOCATION: (state, geoLocation) =>
            (state.geoLocation = geoLocation),
        SET_UTM: (state,payload) => {
            state.utm.utm_source = payload.utm_source,
            state.utm.utm_content = payload.utm_source,
            state.utm.utm_campaign = payload.utm_campaign,
            state.utm.utm_medium = payload.utm_medium,
            state.utm.utm_term = payload.utm_term
        }
    },
    actions: {
        setUtm: (context,utm) => {
            context.commit('SET_UTM',utm);
        },
        setEnv: (context,payload) => context.commit("SET_ENV",payload),
        setModal: context => context.commit("SET_MODAL"),
        unsetModal: context => context.commit("UNSET_MODAL"),
        setSuccess: context => context.commit("SET_SUCCESS"),
        unsetSuccess: context => context.commit("UNSET_SUCCESS"),
        toggleAgreement: context => {
            if(!context.getters.isAgreement) {
                context.commit("SET_AGREEMENT",true)
            } else {
                context.commit("SET_AGREEMENT",false)
            }
        },
        setIpLocation: (context, payload) =>
            context.commit("SET_IP_LOCATION", payload),
        setGeoLocation: (context, payload) =>
            context.commit("SET_GEO_LOCATION", payload),
    }
});
