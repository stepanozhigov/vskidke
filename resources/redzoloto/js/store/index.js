import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        utm: false,
        referer: false,
        currentView:false,
        previousView: false,
        home: false,
        callback: false,
        success: false,
        menu: false,
        redirectTo: 'https://redzoloto.ru/',
        env: false
    },
    getters: {
        currentView: state=>{
            return state.currentView
        },
        previousView: state=> {
           return state.previousView
        },
        isHome: state => state.home,
        isCallback: state => state.callback,
        isSuccess: state => state.success,
        isMenu: state => state.menu,
        redirectTo:state =>state.redirectTo,
        env:state =>state.env,
        utm:state =>state.utm,
        referer:state =>state.referer,
    },
    mutations: {
        SET_HOME: state => {
            state.previousView = state.currentView;
            state.currentView = 'home';
            state.home = true;
            state.callback = false;
            state.success = false;
            state.menu = false;
        },
        SET_MENU: state => {
            state.previousView = state.currentView;
            state.currentView = 'menu';
            state.home = false;
            state.callback = false;
            state.success = false;
            state.menu = true;
        },
        SET_SUCCESS: state => {
            state.previousView = state.currentView;
            state.currentView = 'success';
            state.home = false;
            state.callback = false;
            state.success = true;
            state.menu = false;
        },
        SET_CALLBACK: state => {
            state.previousView = state.currentView;
            state.currentView = 'callback';
            state.home = false;
            state.callback = true;
            state.success = false;
            state.menu = false;
        },
        SET_ENV: (state,payload) => (state.env = payload),
        SET_REFERER: (state,payload) => (state.referer = payload),
        SET_UTM: (state,payload) => (state.utm = payload),
    },
    actions: {
        setEnv: (context,payload) => context.commit("SET_ENV",payload),
        setReferer: (context,payload) => context.commit("SET_REFERER",payload),
        setUtm: (context,payload) => context.commit("SET_UTM",payload),

        goBack: (context) => {
            if(context.state.previousView == 'home') context.commit("SET_HOME")
            else if(context.state.previousView == 'callback') context.commit("SET_CALLBACK")
            else if(context.state.previousView == 'success') context.commit("SET_SUCCESS")
            else if(context.state.previousView == 'menu') context.commit("SET_MENU")
            else if(!context.state.previousView) context.commit("SET_HOME")
        },

        setSuccess: context => context.commit("SET_SUCCESS"),
        setHome: context => context.commit("SET_HOME"),
        setMenu: context => context.commit("SET_MENU"),
        setCallback: context => context.commit("SET_CALLBACK"),
    }
});
