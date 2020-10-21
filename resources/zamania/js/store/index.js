import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        env: 'local',
        modal: false,
        success: false,
        redirectTo: 'https://m.zamania.ru/ceny-v-moskva'
    },
    getters: {
        isModal: state => state.modal,
        isSuccess: state => state.success,
        redirectTo:state =>state.redirectTo,
        env:state =>state.env
    },
    mutations: {
        SET_ENV: (state,payload) => (state.env = payload),
        SET_MODAL: state => (state.modal = true),
        UNSET_MODAL: state => (state.modal = false),
        SET_SUCCESS: state => (state.success = true),
        UNSET_SUCCESS: state => (state.success = false)
    },
    actions: {
        setEnv: (context,payload) => context.commit("SET_ENV",payload),
        setModal: context => context.commit("SET_MODAL"),
        unsetModal: context => context.commit("UNSET_MODAL"),
        setSuccess: context => context.commit("SET_SUCCESS"),
        unsetSuccess: context => context.commit("UNSET_SUCCESS")
    }
});
