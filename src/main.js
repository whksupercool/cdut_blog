import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载 Vant 核心组件库
import { Button, NavBar, Form, Field, Toast, CountDown, Tabbar, TabbarItem, Icon, Image as VanImage, Grid, GridItem, Cell, CellGroup, Dialog } from 'vant';

// 加载全局样式
import './styles/index.less'
// 加载动态设置 REM 基准值
import 'amfe-flexible'


// 注册使用 Vant 组件库
Vue.use(Button)
Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Toast)
Vue.use(CountDown)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Icon)
Vue.use(VanImage)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Dialog)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
