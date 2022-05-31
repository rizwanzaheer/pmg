<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

// components
import CardHeader from '@/components/Card/CardHeader.vue';
import CardSlider from '@/components/Card/CardSlider.vue';

// constants
import { CARD_TYPE } from '@/constants';

const store = useStore();

let trendingFilm = $(computed(() => store.state.home.trendingFilm));
const films = computed(() => store.state.home.films);
const starShips = computed(() => store.state.home.starShips);
</script>

<template>
    <CardHeader :data="trendingFilm" />
    <div style="background-color: white">
        <div class="container mx-auto p-[20px]">
            <CardSlider :type="CARD_TYPE.FILM" title="Films" :data="films" />
            <CardSlider :type="CARD_TYPE.STAR_SHIP" class="film-slider" title="Star Ships" :data="starShips" />
            <router-link class="mx-auto flex w-[130px] justify-center" to="/search?category=1">
                {{ $t('common.button.viewMore') }}
            </router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.film-slider {
    margin-bottom: 30px;
}
a {
    padding: 4px 0;
    border: 1px solid $grey;
    border-radius: 2px;
    color: $grey;
    &:hover {
        color: inherit;
    }
}
</style>
