<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import SearchIcon from '@/assets/images/navigation_icons/search.svg';

defineProps({
    placement: {
        type: String,
        default: 'bottomCenter',
    },
});

const router = useRouter();
const route = useRoute();

let searchInput = $(ref(''));
let errorInput = $(ref(''));

let showSearchBox = $(ref(false));
let showPopOver = $(ref(false));

function toggleSearchBox() {
    showSearchBox = true;
}

function handleValidation() {
    let error = '';

    if (searchInput.length < 3) {
        error = 'Please input a minimum of 3 characters';
    } else {
        if (!/^[a-zA-Z]+$/.test(searchInput)) {
            error = 'Please input only alphabets';
        }
    }

    if (error.length > 0) {
        showPopOver = true;
        errorInput = error;
        return false;
    }

    errorInput = '';
    showPopOver = false;
    router.push({
        name: 'films/search',
        query: {
            ...route.query,
            searchby: 'text',
            val: searchInput,
        },
    });
    return true;
}
</script>

<template>
    <div class="navigation-search">
        <button v-if="!showSearchBox" class="flex items-center justify-center" @click="toggleSearchBox">
            <img :src="SearchIcon" />
        </button>

        <a-input-search :class="`navigation-search__input ${errorInput ? 'error' : ''}`" v-if="showSearchBox" v-model:value="searchInput" placeholder="Search" @search="handleValidation" />

        <a-popover v-model:visible="showPopOver" trigger="click" placement="bottom">
            <template #content>
                <p>{{ errorInput }}</p>
            </template>

            <div v-if="showSearchBox" style="width: 200px"></div>
        </a-popover>
    </div>
</template>

<style lang="scss">
@import '@/styles/variables.scss';

.navigation-search {
    &__input {
        width: 200px;
        svg {
            fill: black;
            font-size: 20px;
        }

        &.error {
            border: 1px solid #ffc06b;
            svg {
                fill: #ffc06b;
            }
        }
    }
}
</style>
