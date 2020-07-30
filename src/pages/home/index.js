import App from './home'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#FE306B',
    navigationBarTextStyle: 'white',
    navigationBarTitleText: '榜单',
    backgroundColor: '#FE306B',
  }
}