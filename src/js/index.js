// import文を使ってSassファイルを読み込む。
import "../css/style.scss";

import { hello } from "../_scripts/test";

hello('test');

import Vue from 'vue'
import App from '../_scripts/components/App.vue'

new Vue({
  render: (h) => h(App)
}).$mount('#app')