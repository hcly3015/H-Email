// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import moment from 'moment'
import './common/DialogDrag' // 引入dialog可拖拽

import './mock.js' // 模拟数据
import axios from 'axios'

import Element from 'element-ui'
import './styles/element-variables.scss'

import 'font-awesome-sass/assets/stylesheets/_font-awesome.scss'
import 'normalize.css/normalize.css'

import './styles/index.scss'

Vue.filter('moment', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss'
  return moment.unix(value).format(formatString) // 这是时间戳转时间
})
Vue.prototype.$moment = moment

Vue.prototype.emailText = function (value) {
  return value.replace('\n', '').replace('<br>', '').replace('<p><br/></p<p>', '').replace('<p>', '').replace('</p>', '').replace('<table><tbody>', '').replace('<tr class="firstRow">', '')
}

Vue.prototype.$axios = axios // 全局注册，使用方法为:this.$axios

Vue.use(Element, {
  size: 'medium'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
