<script setup>
import { useStore } from 'vuex';
import { notification } from 'ant-design-vue';

import { XIcon } from '@heroicons/vue/solid';
import { computed, ref, watch } from 'vue';

//Store
const store = useStore();

let searchText = $(computed(() => store.state.search.searchText));

const props = defineProps({
    tag: Object,
    values: Array,
});

function onSearchInputChange(e) {
    store.dispatch('search/changeSearchInput', e.target.value);
}

function handleClearSearch() {
    store.dispatch('search/changeSearchInput', '');
}

function onSearch() {
    console.log('on search click!');
}
</script>

<template>
    <div class="flex items-center justify-center bg-black p-[20px]">
        <a-input-search
            v-model:value="searchText"
            class="filter-search"
            :placeholder="$t('common.lable.searchHere')"
            enter-button="Search"
            @input="onSearchInputChange"
            @search="onSearch"
            pattern="[A-Za-z]{3}"
        >
            <template #suffix>
                <div class="flex h-[30px] items-center">
                    <a-button class="filter-search__clear" @click="handleClearSearch" v-if="searchText"> <XIcon /></a-button>
                </div>
            </template>
        </a-input-search>
    </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.filter-search {
    max-width: 50%;

    &__clear {
        border: none;
        padding: 0;
        svg {
            color: #707070;
            width: 24px;
        }
    }
}
</style>
