import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './views/App'
// import Home from './views/Home'

const routes =[
    {
        path: '/:citycode?',
        name: 'App',
        component: App,
        props: (route) => ({
            utm_source: route.query.utm_source,
            utm_campaign: route.query.utm_campaign,
            utm_medium: route.query.utm_medium,
            utm_term: route.query.utm_term
        })
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router