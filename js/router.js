import Vue from 'vue'
import VueRouter from 'vue-router';

import MainComponent from './components/MainComponent.vue';

import UserComponent from './components/UserComponent.vue';

Vue.use(VueRouter);

const routes = [
    {
		path: '/',
		name: 'MainComponent',
        component: MainComponent,
    },
    {path: '/user/:id', name: 'UserComponent', component: UserComponent},
]

export default new VueRouter({ routes });

