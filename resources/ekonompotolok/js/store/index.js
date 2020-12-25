import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        env: 'local',
        modal: false,
        success: false,
        ip:false,
        ipLocation: null,
        geoCoordinates: {
            latitude: null,
            longitude:null
        },
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
        contactByPhone: false,
        utm: {
            utm_source: false,
            utm_campaign: false,
            utm_medium: false,
            utm_term: false
        }
    },
    getters: {
        isModal: state => state.modal,
        isSuccess: state => state.success,
        ip: state => state.ip,
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
        hereapiUrl: state=>`https://revgeocode.search.hereapi.com/v1/revgeocode?apiKey=${state.hereapiKey}&at=${state.geoCoordinates.latitude},${state.geoCoordinates.longitude}&lang=ru`,
        utm : state=>state.utm
    },
    mutations: {
        SET_ENV: (state,payload) => (state.env = payload),
        SET_MODAL: state => (state.modal = true),
        UNSET_MODAL: state => (state.modal = false),
        SET_SUCCESS: state => (state.success = true),
        UNSET_SUCCESS: state => (state.success = false),
        SET_IP: (state,payload) => (state.ip = payload),
        SET_IP_LOCATION: (state, ipLocation) => (state.ipLocation = ipLocation),
        SET_GEO_COORDINATES: (state, geoCoordinates) => (state.geoCoordinates = geoCoordinates),
        SET_GEO_LOCATION: (state, geoLocation) =>
            (state.geoLocation = geoLocation),
        SET_CITIES: (state,payload) => (state.cities = payload),
        SET_CURRENT_CITY: (state,payload) => (state.currentCity = payload),
        SET_AREA: (state,payload) => (state.area = payload),
        SET_CONTACTBY_WHATSAPP: (state,payload) => (state.contactByWhatsapp = payload),
        SET_CONTACTBY_PHONE: (state,payload) => (state.contactByPhone = payload),
        SHOW_CITY_MODAL: (state,payload) => (state.showCityModal = payload),
        SET_UTM: (state,payload) => {
            state.utm.utm_source = payload.utm_source,
            state.utm.utm_campaign = payload.utm_campaign,
            state.utm.utm_medium = payload.utm_medium,
            state.utm.utm_term = payload.utm_term
        }
    },
    actions: {
        setEnv: (context,payload) => context.commit("SET_ENV",payload),
        setModal: context => context.commit("SET_MODAL"),
        unsetModal: context => context.commit("UNSET_MODAL"),
        setSuccess: context => context.commit("SET_SUCCESS"),
        unsetSuccess: context => context.commit("UNSET_SUCCESS"),

        //get IP from https://api.ipify.org?format=jso
        getIp: async (context) => {
            return await new Promise((resolve, reject) => {
                const response = axios
                    .get("https://api.ipify.org?format=json")
                    .then((res) => {
                        context.commit('SET_IP',res.data.ip);
                        resolve(res.data.ip);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        //http://ip-api.com/json/193.42.108.94?lang=ru
        getIpCity: async (context) => {
            return await new Promise((resolve, reject) => {
                const response = axios
                    .get("/api/ipapi?ip=" + context.getters.ip)
                    .then((res) => {
                        console.log(res.data);
                        context.commit("SET_IP_LOCATION",res.data);
                        resolve(res.data.city);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },

        //Coords
         getCoords: async (context) => {
            return await new Promise((resolve, reject) => {
                if (!("geolocation" in navigator)) {
                    console.log("NO GEOLOCATION");
                    reject(new Error("Geolocation is not available."));
                }

                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        context.commit('SET_GEO_COORDINATES',{
                            latitude: pos.coords.latitude,
                            longitude: pos.coords.longitude,
                        });
                        resolve(pos);
                    },
                    (err) => {
                        resolve(false);
                    }
                );
            });
        },

        //GeoLocation
        getGeoLocation: async (context) => {
            
            const location = await context.dispatch('getCoords');
            console.log(location);
            if(location) {
                console.log('no location');
                const queryStr = new URLSearchParams({
                    latitude : context.getters.geoCoordinates.latitude,
                    longitude : context.getters.geoCoordinates.longitude,
                });
                const address = await axios.get('/api/hereapi?'+queryStr.toString());
                context.commit('SET_GEO_LOCATION',address.data.address.city);
            }
            
        },

        //GET CITIES
        getCities: async (context) => {
            return await new Promise((resolve, reject) => {
                const response = axios
                    .get("https://potolki-ts.ru/api/cities")
                    .then((res) => {
                        const otherCity = {
                            'bx_code': 792,
                            'name' : 'Другой',
                            'code': 'drugoy',
                            'phone' : '8 800 511-97-15',
                            'sort' : 0
                        };
                        let cities = res.data;
                        cities.push(otherCity);
                        context.commit("SET_CITIES",cities);
                        resolve(res);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },

        setCurrentCity: (context, payload) => {
            context.commit("SET_CURRENT_CITY", payload)
        },
        setArea: (context, payload) => {
            context.commit("SET_AREA", payload)
        },
        showCityModal: (context) => {
            context.commit('SHOW_CITY_MODAL',!context.getters.showCityModal);
        },
        setUtm: (context,utm) => {
            context.commit('SET_UTM',utm);
        }

    }
});
