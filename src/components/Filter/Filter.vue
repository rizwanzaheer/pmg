<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

import _ from 'lodash';

// Icons
import { ViewListIcon, ChevronUpIcon } from '@heroicons/vue/solid';
import { ViewGridIcon } from '@heroicons/vue/outline';

// Assets
import ListSelectedIcon from '@/assets/images/list_selected.svg';
import ListNotSelectedIcon from '@/assets/images/list_not_selected.svg';
import GridSelectedIcon from '@/assets/images/grid_selected.svg';
import GridNotSelectedIcon from '@/assets/images/grid_not_selected.svg';

// Init store
const store = useStore();

let cardLayout = $(computed(() => store.state.app.cardLayout));
let totalResultCount = $(computed(() => store.state.search.totalResultCount));

let filtersShow = $(ref(true));
let isGridView = $(ref(true));

let searchText = $(computed(() => store.state.search.searchText));
let films = $(computed(() => store.state.home.films));

// Apply filter
function applyFilter() {}

// On clear Filter
function onClearFilter() {}

function changeCardLayout(val) {
    store.dispatch('app/changeCardLayout', val);
}
</script>

<template>
    <div class="filter-bar bg-[#f0f0f0]">
        <div class="container mx-auto flex items-center justify-between py-[6px]">
            <div>
                <h1>{{ $t('common.lable.film') }}</h1>
            </div>
            <div class="flex items-center">
                <div class="filter-bar__filters">
                    <a-button @click="applyFilter"> Apply Filter </a-button>
                    <a-button @click="onClearFilter"> Clear Filter </a-button>
                </div>

                <div class="filter-bar__layout flex items-center">
                    <span> {{ $t('common.lable.layout') }}</span>
                    <a-button
                        :class="!$store.state.app.cardLayout && 'selected'"
                        @click="
                            () => {
                                changeCardLayout(false);
                            }
                        "
                    >
                        <!-- <ViewListIcon /> -->
                        <img :src="!cardLayout ? ListSelectedIcon : ListNotSelectedIcon" />
                    </a-button>
                    <a-button
                        :class="$store.state.app.cardLayout && 'selected'"
                        @click="
                            () => {
                                changeCardLayout(true);
                            }
                        "
                    >
                        <!-- <ViewGridIcon /> -->

                        <img :src="cardLayout ? GridSelectedIcon : GridNotSelectedIcon" />
                    </a-button>
                </div>

                <a-button class="filter-bar__toggle !flex !items-center" @click="() => (filtersShow = !filtersShow)">
                    <span>{{ filtersShow ? 'Hide' : 'Show' }} {{ $t('common.lable.filters') }}</span>
                    <ChevronUpIcon :style="{ transform: `rotate(${filtersShow ? '0' : '180deg'})` }" />
                </a-button>
            </div>
        </div>
    </div>

    <div class="filter-count container mx-auto my-3 mt-5">
        <h1>
            {{ $t('common.lable.showing') }} {{ films.length }} {{ $t('common.lable.results') }}
            {{ _.isEmpty(totalResultCount) ? '' : `for "${$store.state.search.searchText}"` }}
        </h1>
    </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.filter-tags {
    overflow: hidden;
    padding: 20px 10px;

    &--close {
        padding: 0;
        height: 0;
    }
}

.filter-bar {
    h1 {
        font-size: 14px;
        margin: 0;
        font-weight: 400;
    }

    &__filters {
        margin-right: 40px;
        button {
            background-color: transparent;
            border: none;
            &:hover,
            &:focus {
                color: inherit;
            }
            &:first-of-type {
                border-radius: 2px;
                background-color: $lighterBlue;
                color: white;
                font-weight: 300;
                margin-right: 4px;
            }
        }
    }

    &__layout {
        margin-right: 40px;
        span {
            margin-right: 10px;
            font-weight: 400;
        }
        button {
            background-color: transparent;
            border: none;
            padding: 0;
            &:hover,
            &:focus {
                color: inherit;
            }
            &.selected {
                color: $lighterBlue;
            }
            &:first-of-type {
                margin-right: 4px;
            }
        }
    }

    &__toggle {
        background-color: transparent;
        border: none;
        &:hover,
        &:focus {
            color: inherit;
        }
        span {
            font-weight: 400;
            margin-right: 10px;
        }
        svg {
            width: 28px;
        }
    }
}

.filter-count {
    h1 {
        margin: 0;
        font-size: 16p4;
        font-weight: 400;
        color: #c4c4c4;
    }
}
</style>
