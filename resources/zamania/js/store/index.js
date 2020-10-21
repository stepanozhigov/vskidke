import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        modal: false,
        success: false,
        redirectTo: 'https://m.zamania.ru/ceny-v-moskva'
    },
    getters: {
        isModal: state => state.modal,
        isSuccess: state => state.success,
        redirectTo:state =>state.redirectTo
    },
    mutations: {
        SET_MODAL: state => (state.modal = true),
        UNSET_MODAL: state => (state.modal = false),
        SET_SUCCESS: state => (state.success = true),
        UNSET_SUCCESS: state => (state.success = false)
    },
    actions: {
        setModal: context => context.commit("SET_MODAL"),
        unsetModal: context => context.commit("UNSET_MODAL"),
        setSuccess: context => context.commit("SET_SUCCESS"),
        unsetSuccess: context => context.commit("UNSET_SUCCESS")
    }
});
