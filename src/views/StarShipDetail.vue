<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import _ from 'lodash';
import { format } from 'date-fns';

// Components
import CardSlider from '@/components/Card/CardSlider.vue';

// images
import SWAR from '@/assets/images/ships/4.jpeg';

// constants
import { APP_DATE_FORMAT } from '@/constants';

// route
const route = useRoute();
//Store
const store = useStore();

const starShipInfo = computed(() => store.state.starShipDetail.starShipInfo);
const starShipInfoIsLoading = computed(() => store.state.starShipDetail.isLoading);
onMounted(async () => {
    const route = useRoute();

    let isError = computed(() => store.state.starShipDetail.isError);
    try {
        await store.dispatch('starShipDetail/getStarShipsById', route.params.id);
        store.dispatch('search/changeSearchInput', '');
    } catch (e) {
        console.log('e is: ', e);
    }
});
watch(
    () => route.params.id,
    async (newId) => {
        await store.dispatch('starShipDetail/getStarShipsById', newId);
    }
);
</script>

<template>
    <div style="background-color: white">
        <div v-if="!starShipInfoIsLoading" class="container mx-auto px-[20px] py-[20px] pb-[80px]">
            <a-breadcrumb separator="&#10095;">
                <a-breadcrumb-item>
                    <router-link to="/"> {{ $t('common.lable.home') }}</router-link>
                </a-breadcrumb-item>
                <a-breadcrumb-item>
                    <router-link :to="`/search?category=2`"> {{ $t('common.lable.ship') }}</router-link>
                </a-breadcrumb-item>
                <a-breadcrumb-item href>
                    <router-link :to="`/starship/${route.params.id}`">{{ starShipInfo.name || 'N/A' }}</router-link>
                </a-breadcrumb-item>
            </a-breadcrumb>

            <div class="mt-8" style="max-width: 1150px; margin-left: auto; margin-right: auto">
                <div style="display: flex; justify-content: space-between; align-items: center">
                    <h1 style="color: #00c0b5; font-size: 36px; font-weight: bold">{{ !_.isEmpty(starShipInfo.name) ? starShipInfo.name : 'N/A' }}</h1>
                    <div>
                        <span style="margin-right: 30px">
                            <span class="font-bold">Max Speed:</span> {{ !_.isEmpty(starShipInfo.max_atmosphering_speed) ? starShipInfo.max_atmosphering_speed : 'N/A' }}
                        </span>
                        <span>
                            <span class="font-bold">Model:</span>
                            {{ starShipInfo.model || 'N/A' }}</span
                        >
                    </div>
                </div>
                <div class="container">
                    <img v-if="!_.isEmpty(starShipInfo)" :src="SWAR" class="w-full drop-shadow-xl" />
                    <!-- <p class="mt-10 text-[16px]">
                        {{ starShipInfo.consumables || 'N/A' }}
                    </p> -->
                    <a-divider />
                    <label class="font-bold">Manufacturer:</label> <span>{{ starShipInfo.manufacturer || 'N/A' }}</span>
                    <a-divider />
                    <label class="font-bold">Consumables:</label> <span>{{ starShipInfo.consumables || 'N/A' }}</span>
                    <a-divider />
                    <label class="font-bold">Starship Class:</label> <span>{{ starShipInfo.starship_class || 'N/A' }}</span>
                    <a-divider />
                    <label class="font-bold">Cost in Credits:</label> <span>{{ starShipInfo.cost_in_credits || 'N/A' }}</span>
                    <a-divider />
                    <label class="font-bold">Length:</label> <span>{{ starShipInfo.length || 'N/A' }}</span>
                    <a-divider />
                    <label class="font-bold">Crew:</label> <span>{{ starShipInfo.crew || 'N/A' }}</span>
                    <a-divider />
                    <label class="font-bold">Passengers:</label> <span>{{ starShipInfo.passengers || 'N/A' }}</span>
                    <a-divider />
                    <label class="font-bold">Cargo Capacity:</label> <span>{{ starShipInfo.cargo_capacity || 'N/A' }}</span>
                    <a-divider />
                    <label class="font-bold">Consumables:</label> <span>{{ starShipInfo.consumables || 'N/A' }}</span>
                    <a-divider />
                    <label class="font-bold">MGLT:</label> <span>{{ starShipInfo.MGLT || 'N/A' }}</span>
                    <a-divider />
                </div>
                <div class="container">
                    <h3 v-if="!_.isEmpty(starShipInfo.pilots)" style="color: #00c0b5; font-size: 36px; font-weight: bold">Pilots:</h3>
                    <a v-for="(item, index) in starShipInfo.pilots" :key="index" :href="item" target="_blank">
                        <a-avatar class="flex cursor-pointer flex-row" src="https://joeschmoe.io/api/v1/random" :size="80" />
                    </a>
                </div>
                <div v-if="isError" class="error">{{ $t('common.lable.error') }}</div>
            </div>
        </div>

        <div v-if="starShipInfoIsLoading" class="flex items-center justify-center" style="min-height: 80vh">
            <a-spin size="large" />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
