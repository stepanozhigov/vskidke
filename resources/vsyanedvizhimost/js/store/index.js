import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        modal: false,
        success: false,
        redirectTo: 'https://knam.io/',
        env: 'local'
    },
    getters: {
        isModal: state => state.modal,
        isSuccess: state => state.success,
        redirectTo:state =>state.redirectTo,
        env:state =>state.env
    },
    mutations: {
        SET_MODAL: state => (state.modal = true),
        UNSET_MODAL: state => (state.modal = false),
        SET_SUCCESS: state => (state.success = true),
        UNSET_SUCCESS: state => (state.success = false),
        SET_ENV: (state,payload) => (state.env = payload),
    },
    actions: {
        setEnv: (context,payload) => context.commit("SET_ENV",payload),
        setModal: context => context.commit("SET_MODAL"),
        unsetModal: context => context.commit("UNSET_MODAL"),
        setSuccess: context => context.commit("SET_SUCCESS"),
        unsetSuccess: context => context.commit("UNSET_SUCCESS"),
        dropFbPixel: (context) => {
            new Promise((resolve,reject) => {
                try {
                    fbq("track", "Lead");
                    console.log("FB resolved");
                    resolve(true);
                } catch (err) {
                    console.log("FB error");
                    setTimeout(() => {
                        context.dispatch('dropFbPixel')
                    },3000)
                }
            })
        }

    }
});
