<script setup>
import { computed, onMounted, ref, watch, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

import _ from 'lodash';

// Components
import Filter from '@/components/Filter/Filter.vue';
import CardGrid from '@/components/Card/CardGrid.vue';
import FilterSearch from '@/components/Filter/FilterSearch.vue';

// Constants
import CardList from '@/components/Card/CardList.vue';

// Variables
const searchText = ref('');
// route
const route = useRoute();
console.log('routes is: ', route.query);
//Store
const store = useStore();

let films = $(computed(() => store.state.home.films));

// Lifecycle Hooks
onMounted(async () => {});

function onSearchInputChange(e) {
    console.log('e is: ', e.target.value);
    store.dispatch('search/changeSearchInput', e.target.value);
}

function onScroll({ target: { scrollTop, clientHeight, scrollHeight } }) {
    if (scrollTop + clientHeight >= scrollHeight) {
        console.log('Reached at the bottom');
    }
}
</script>

<template>
    <div style="background-color: white" class="min-h-[74.5vh]">
        <FilterSearch />
        <Filter />
        <div class="container mx-auto px-[0] pb-[40px]">
            <a-breadcrumb separator="&#10095;">
                <a-breadcrumb-item>
                    <router-link to="/">
                        {{ $t('common.lable.home') }}
                    </router-link>
                </a-breadcrumb-item>
                <a-breadcrumb-item>
                    {{ $t('common.lable.film') }}
                </a-breadcrumb-item>
            </a-breadcrumb>

            <div class="film-search-scroll mt-4" @scroll="onScroll" style="overflow-y: scroll; max-height: 1000px">
                <div v-if="$store.state.app.cardLayout" class="m-auto grid grid-cols-3 gap-5">
                    <CardGrid v-for="(data, i) in films" :key="i" :data="data" />
                </div>
                <div v-else>
                    <CardList v-for="(data, i) in films" :key="i" :data="data" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.film-search-scroll {
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
}
</style>
