import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
    { path: '/', name: 'home', component: Home, meta: { title: 'Home' } },
    {
        path: '/film/:id',
        name: 'filmById',
        meta: { title: 'Film Detail' },
        component: () => import('@/views/FilmDetail.vue'),
    },
    {
        path: '/ship/:id',
        name: 'starShipById',
        meta: { title: 'Star Ship Detail' },
        component: () => import('@/views/StarShipDetail.vue'),
    },
    {
        path: '/search',
        name: 'films/search',
        meta: { title: 'Search' },
        component: () => import('@/views/Search.vue'),
    },
    {
        path: '/about',
        name: 'about',
        meta: { title: 'About' },
        component: () => import('@/views/About.vue'),
        // example of route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import('./views/About.vue')
    },
    { path: '/:path(.*)', name: 'notFound', component: () => import('@/views/NotFound.vue') },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return {
            x: 0,
            y: 0,
            behavior: 'smooth',
        };
    },
});

export default router;
