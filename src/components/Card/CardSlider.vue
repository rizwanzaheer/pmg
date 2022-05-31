<script setup>
import { format } from 'date-fns';
import { ChevronRightIcon } from '@heroicons/vue/outline';
import _ from 'lodash';

import CardGrid from './CardGrid.vue';

defineProps({
    title: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        default: '',
    },
    discoverLink: {
        type: String,
        default: '',
    },
    data: {
        type: Array,
        default: [],
    },
});
</script>

<template>
    <div class="slider">
        <div class="flex items-center justify-between">
            <h1 class="slider__title">{{ title }}</h1>
            <router-link class="slider__discover" v-if="discoverLink" :to="discoverLink">{{ $t('common.button.viewAll') }}</router-link>
        </div>
        <div class="slider__scroll flex">
            <!-- <div v-if="_.isEmpty(data)">Loading...</div> -->
            <CardGrid :type="type" v-for="val in data" :key="val.id" :data="val" />
            <router-link v-if="data.length >= 10" class="slider__more flex items-center justify-center" to="/search?category=1">
                <div>
                    <ChevronRightIcon />
                    <span>{{ $t('common.button.viewMore') }}</span>
                </div>
            </router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.slider {
    margin-bottom: 20px;

    &:last-child {
        margin-bottom: 0;
    }

    &__title {
        font-weight: 600;
        padding: 0 10px;
        margin: 0;
        font-size: 32px;
        color: $lighterBlue;
    }

    &__discover {
        border: 1.5px solid $darkGrey;
        border-radius: 2px;
        padding: 4px 14px;
        font-weight: 400;
        color: $darkGrey;
    }

    &__scroll {
        padding: 10px;
        overflow-x: scroll;
        scrollbar-width: none;

        &::-webkit-scrollbar {
            display: none;
        }

        div,
        a {
            &:first-child {
                margin-left: 0;
            }
            margin-left: 20px;
        }
    }

    &__more {
        width: 250px;
        min-width: 250px;
        height: 500px;

        border-radius: 2px;

        box-shadow: $box-shadow;
        color: $lighterBlue;

        svg {
            border: 2px solid $lighterBlue;
            width: 45px;
            padding: 4px;
            margin: auto;
            border-radius: 50%;
        }

        span {
            font-size: 16px;
        }
    }
}
</style>
