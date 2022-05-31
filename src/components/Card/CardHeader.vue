<script setup>
import { ChevronRightIcon } from '@heroicons/vue/solid';
import SWAR from '@/assets/images/films/swar.jpeg';

defineProps({
    data: {
        type: Object,
        default: {
            id: Number,
        },
        title: {
            type: String,
            default: '',
        },
        opening_crawl: {
            type: String,
            default: '',
        },
    },
});
</script>

<template>
    <div class="bg-black py-[50px]">
        <div class="card-header container mx-auto flex justify-around">
            <div class="card-header__content">
                <h1 class="card-header__content-title">{{ data.title || 'N/A' }}</h1>
                <p class="card-header__content-description" style="font-family: sans-serif">
                    {{ data.opening_crawl || 'N/A' }}
                </p>
                <router-link class="card-header__content-link flex items-center justify-between" :to="`/film/${data.id}`">
                    <span>{{ 'More Info' }}</span>
                    <ChevronRightIcon />
                </router-link>
            </div>

            <img class="card-header__image" :src="SWAR" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.card-header {
    max-width: 1024px;

    &__content {
        width: 100%;
        max-width: 500px;

        &-tags {
            color: $white;
            font-weight: 200;
            margin-bottom: 10px;
        }

        &-title {
            color: $white;
            font-weight: 700;
            font-size: 36px;
            line-height: 40px;
            margin: 0 0 10px;
        }

        &-description {
            color: $white;
            font-weight: 200;
            margin: 0;
            line-height: 18px;
        }

        &-link {
            margin-top: 20px;
            background-color: $lighterBlue;
            padding: 4px 10px;
            width: 170px;
            border-radius: 2px;
            color: $white;
            font-weight: 300;
            svg {
                width: 26px;
            }
        }
    }

    &__image {
        width: 350px;
        min-width: 350px;
        border-radius: 2px;
    }
}
</style>
