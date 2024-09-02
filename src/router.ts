import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from './pages/home/Home.vue';
import Convert from './pages/convert/Convert.vue';

const routes: Array<RouteRecordRaw> = [
    { path: '/', component: Home },
    { path: '/convert', component: Convert },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
});

export default router;
