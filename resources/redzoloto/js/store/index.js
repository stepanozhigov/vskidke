import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        home: false,
        callback: false,
        success: false,
        menu: false,
        redirectTo: 'https://redzoloto.ru/',
        env: false
    },
    getters: {
        currentView: state=>{
            if(state.home) return 'home'
            else if(state.callback) return 'modal'
            else if(state.success) return 'success'
            else if(state.menu) return 'menu'
        },
        isHome: state => state.home,
        isCallback: state => state.callback,
        isSuccess: state => state.success,
        isMenu: state => state.menu,
        redirectTo:state =>state.redirectTo,
        env:state =>state.env
    },
    mutations: {
        SET_HOME: state => {
            state.home = true;
        },
        UNSET_HOME: state => (state.home = false),
        SET_MENU: state => (state.menu = true),
        UNSET_MENU: state => (state.menu = false),
        SET_SUCCESS: state => (state.success = true),
        UNSET_SUCCESS: state => (state.success = false),
        SET_CALLBACK: state => (state.callback = true),
        UNSET_CALLBACK: state => (state.callback = false),
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

        setMenu: context => context.commit("SET_MENU"),
        unsetMenu: context => context.commit("UNSET_MENU"),

        setCallback: context => context.commit("SET_CALLBACK"),
        unsetCallback: context => context.commit("UNSET_CALLBACK"),

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
