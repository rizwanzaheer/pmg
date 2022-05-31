<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import _ from 'lodash';
import { format } from 'date-fns';

// Components
import CardSlider from '@/components/Card/CardSlider.vue';

// images
import SWAR from '@/assets/images/films/swar.jpeg';

// constants
import { APP_DATE_FORMAT } from '@/constants';

// route
const route = useRoute();
//Store
const store = useStore();

const filmInfo = computed(() => store.state.filmDetail.filmInfo);
const filmInfoIsLoading = computed(() => store.state.filmDetail.isLoading);
onMounted(async () => {
    const route = useRoute();

    let isError = computed(() => store.state.filmDetail.isError);
    try {
        await store.dispatch('filmDetail/getFilmById', route.params.id);
        store.dispatch('search/changeSearchInput', '');
    } catch (e) {
        console.log('e is: ', e);
    }
});
watch(
    () => route.params.id,
    async (newId) => {
        await store.dispatch('filmDetail/getFilmById', newId);
    }
);
</script>

<template>
    <div style="background-color: white">
        <div v-if="!filmInfoIsLoading" class="container mx-auto px-[20px] py-[20px] pb-[80px]">
            <a-breadcrumb separator="&#10095;">
                <a-breadcrumb-item>
                    <router-link to="/"> {{ $t('common.lable.home') }}</router-link>
                </a-breadcrumb-item>
                <a-breadcrumb-item>
                    <router-link :to="`/search?category=1`"> {{ $t('common.lable.film') }}</router-link>
                </a-breadcrumb-item>
                <a-breadcrumb-item>
                    <router-link :to="`/film/${route.params.id}`">{{ filmInfo.title || 'N/A' }}</router-link>
                </a-breadcrumb-item>
            </a-breadcrumb>

            <div class="mt-8" style="max-width: 1150px; margin-left: auto; margin-right: auto">
                <div style="display: flex; justify-content: space-between; align-items: center">
                    <h1 style="color: #00c0b5; font-size: 36px; font-weight: bold">{{ !_.isEmpty(filmInfo.title) ? filmInfo.title : 'N/A' }}</h1>
                    <div>
                        <span style="margin-right: 30px"> <span class="font-bold">Episode:</span> {{ filmInfo.episode_id || 'N/A' }}</span>
                        <span><span class="font-bold">Release at:</span> {{ !_.isEmpty(filmInfo.release_date) ? format(new Date(filmInfo.release_date), APP_DATE_FORMAT) : 'N/A' }} </span>
                    </div>
                </div>
                <div class="container">
                    <img :src="SWAR" class="w-full cursor-pointer drop-shadow-xl" />
                    <p class="mt-10 text-[16px]">
                        {{ filmInfo.opening_crawl || 'N/A' }}
                    </p>
                    <a-divider />
                    <label class="font-bold">Director:</label> <span>{{ filmInfo.director || 'N/A' }}</span>
                    <a-divider />
                    <label class="font-bold">Producer:</label> <span>{{ filmInfo.producer || 'N/A' }}</span>
                    <a-divider />
                    <label class="font-bold">Planets:</label> <span>{{ filmInfo.planets.length || 'N/A' }}</span>
                    <a-divider />
                    <label class="font-bold">Species:</label> <span>{{ filmInfo.species.length || 'N/A' }}</span>
                    <a-divider />
                    <label class="font-bold">Star Ships:</label> <span>{{ filmInfo.starships.length || 'N/A' }}</span>
                    <a-divider />
                </div>
                <div class="container">
                    <h3 style="color: #00c0b5; font-size: 36px; font-weight: bold">Top cast:</h3>
                    <a v-for="(item, index) in filmInfo.characters" :key="index" :href="item" target="_blank">
                        <a-avatar class="flex cursor-pointer flex-row" src="https://joeschmoe.io/api/v1/random" :size="80" />
                    </a>
                </div>
                <div v-if="isError" class="error">{{ $t('common.lable.error') || 'N/A' }}</div>
            </div>
        </div>

        <div v-if="filmInfoIsLoading" class="flex items-center justify-center" style="min-height: 80vh">
            <a-spin size="large" />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
