/*
 * @Description:
 * @Version: 1.0
 * @Autor: Li Cheng
 * @Date: 2024-06-24 09:52:27
 * @LastEditors: Li Cheng
 * @LastEditTime: 2024-06-25 14:16:46
 */
import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import './style.css';
import App from './App.vue';
import router from './router';
import pinia from './store';
import "./tailwindcss.css"
import 'ant-design-vue/dist/reset.css';

createApp(App).use(Antd).use(pinia).use(router).mount('#app');
