import App from './index'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
  config: {
    navigationBarBackgroundColor: '#FE306B',
    navigationBarTextStyle: 'white',
    navigationBarTitleText: '打榜',
    backgroundColor: '#FFFEFB'
  }
}