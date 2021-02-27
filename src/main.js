import Vue from 'vue';
import ViewUI from 'view-design';

import router from './router';
import i18n from './i18n/';

import App from './App.vue';

// import style
import 'view-design/dist/styles/iview.css';


Vue.use(ViewUI);

new Vue({
    el: "#app",
    router: router,
    i18n: i18n,
    render: h => h(App)
});
