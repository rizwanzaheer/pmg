<script setup>
import { computed, onMounted } from 'vue';
import { format } from 'date-fns';
import _ from 'lodash';

// constants
import { APP_DATE_FORMAT, CARD_TYPE } from '@/constants';

// images
import SWAR from '@/assets/images/films/1.jpeg';
import SHIP1 from '@/assets/images/ships/5.png';

defineProps({
    type: {
        type: String,
        default: '',
    },
    data: {
        type: Object,
        default: {
            id: {
                type: Number,
                default: '',
            },
            title: {
                type: String,
                default: '',
            },
            name: {
                type: String,
                default: '',
            },
        },
    },
});
</script>

<template>
    <router-link :class="`card-grid  ${className}`" :to="`/${type}/${data.id}`">
        <div
            class="card-grid__body flex justify-between !rounded-md hover:z-50 hover:!rounded-md"
            :style="{ backgroundImage: `url(${type === CARD_TYPE.FILM ? SWAR : SHIP1})`, backgroundPosition: 'top' }"
        >
            <div class="card-grid__body-text flex items-center">
                <p>{{ data.title || data.name || 'N/A' }}</p>
            </div>
        </div>
        <div class="card-grid__footer flex justify-between hover:z-50">
            <span v-if="type === CARD_TYPE.FILM"> <span class="!font-bold">Director:</span> {{ data.director || 'N/A' }} </span>
            <span v-if="type === CARD_TYPE.FILM"> <span class="!font-bold">Release:</span> {{ format(new Date(data.release_date), APP_DATE_FORMAT) || 'N/A' }} </span>
            <span v-if="type === CARD_TYPE.STAR_SHIP"> <span class="!font-bold">Length:</span> {{ `${data.length} m` || 'N/A' }} </span>
            <span v-if="type === CARD_TYPE.STAR_SHIP"> <span class="!font-bold">Speed:</span> {{ `${data.max_atmosphering_speed} km` || 'N/A' }}</span>
        </div>
    </router-link>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.card-grid {
    width: 350px;
    min-width: 350px;

    &__body {
        position: relative;
        width: 100%;
        height: 500px;

        border-radius: 2px;

        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        background-position: center;

        box-shadow: $box-shadow;

        &-text {
            position: absolute;
            background-color: rgba($color: $white, $alpha: 0.8);
            left: 0;
            right: 0;
            bottom: 0;
            padding: 24px;
            height: 20%;
            p {
                line-height: 24px;
                font-size: 20px;
                font-weight: 600;
                margin: 0;

                color: $black;
            }
        }
    }

    &__footer {
        margin-top: 6px;
        span {
            font-size: 14px;
            color: $black;
        }
    }
}
</style>
