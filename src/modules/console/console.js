import Vue from 'vue'
import Console from './Console.vue'
import router from './router'

Vue.use(require('vue-wechat-title'))

new Vue({
    router,
    render: h => h(Console)
}).$mount('#console')