import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        home: false,
        modal: false,
        signup: false,
        callback: false,
        success: false,
        redirectTo: 'https://instagram.com/mg_beauty_spa',
        env: false
    },
    getters: {
        isHome: state => state.home,
        isModal: state => state.modal,
        isCallback: state => state.callback,
        isSignup: state => state.signup,
        isSuccess: state => state.success,
        redirectTo:state =>state.redirectTo,
        env:state =>state.env
    },
    mutations: {
        SET_HOME: state => (state.home = true),
        UNSET_HOME: state => (state.home = false),
        SET_MODAL: state => (state.modal = true),
        UNSET_MODAL: state => (state.modal = false),
        SET_SUCCESS: state => (state.success = true),
        UNSET_SUCCESS: state => (state.success = false),
        SET_CALLBACK: state => (state.callback = true),
        UNSET_CALLBACK: state => (state.callback = false),
        SET_SIGNUP: state => (state.signup = true),
        UNSET_SIGNUP: state => (state.signup = false),
        SET_ENV: (state,payload) => (state.env = payload),
    },
    actions: {
        setEnv: (context,payload) => context.commit("SET_ENV",payload),
        setModal: context => context.commit("SET_MODAL"),
        unsetModal: context => context.commit("UNSET_MODAL"),
        setSuccess: context => context.commit("SET_SUCCESS"),
        unsetSuccess: context => context.commit("UNSET_CALLBACK"),


        setHome: context => context.commit("SET_HOME"),
        unsetHome: context => context.commit("UNSET_HOME"),


        setCallback: context => context.commit("SET_CALLBACK"),
        unsetCallback: context => context.commit("UNSET_CALLBACK"),

        setSignup: context => context.commit("SET_SIGNUP"),
        unsetSignup: context => context.commit("UNSET_SIGNUP"),

        dropFbPixel: (context) => {
            new Promise((resolve) => {
                try {
                    fbq("track", "Lead");
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
