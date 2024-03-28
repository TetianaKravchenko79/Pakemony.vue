import Vue from 'vue'

import AppComponent from './components/AppComponent.vue';

import router from './router.js';

let app = new Vue({
    el: '#app',
    router,
    components: { AppComponent },
    template: '<AppComponent />'
});
