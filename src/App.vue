<script setup>
import { useStore } from 'vuex';
import Footer from '@/components/Footer/Footer.vue';
import Header from '@/components/Header/Header.vue';

const store = useStore();
store.dispatch('home/getTrendingFilm');
store.dispatch('home/getFilms');
store.dispatch('home/getStarShips');
</script>

<template>
    <main>
        <Header />
        <router-view />
        <Footer />
    </main>
</template>
