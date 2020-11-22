import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './views/App'
// import Home from './views/Home'

const routes =[
    {
        path: '/:citycode?',
        name: 'App',
        component: App,
        props: true
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router