<script setup>
import { computed, onMounted } from 'vue';
import { format } from 'date-fns';
import _ from 'lodash';

// images
import SWAR from '@/assets/images/films/1.jpeg';
import SHIP1 from '@/assets/images/ships/5.png';

//constants
import { APP_DATE_FORMAT, CARD_TYPE } from '@/constants';

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
        },
    },
});
</script>

<template>
    <div class="film-list flex">
        <router-link class="film-list__image" :to="`/films/${data.id}`">
            <img :src="type === CARD_TYPE.FILM ? SWAR : SHIP1" />
        </router-link>

        <div class="film-list__content flex flex-col justify-start">
            <div class="film-list__content-text">
                <router-link :to="`/films/${data.id}`">
                    {{ data.title || data.name || 'N/A' }}
                </router-link>
                <p>
                    {{ data.opening_crawl || 'N/A' }}
                </p>
            </div>
            <div class="film-list__content-footer mt-5">
                <span>
                    <span class="!font-bold">Release:</span>
                    {{ format(new Date(data.created), APP_DATE_FORMAT) }}</span
                >
                <span>
                    <span class="!font-bold">Director:</span>
                    {{ data.director || 'N/A' }}
                </span>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import '@/styles/variables.scss';
.film-list {
    margin-bottom: 40px;

    &:last-child {
        margin-bottom: 0;
    }

    &__image {
        width: 450px;
        min-width: 450px;
        img {
            border-radius: 2px;
        }
    }

    &__content {
        width: 50%;
        margin-left: 20px;

        &-text {
            a {
                color: $black;
                font-size: 24px;
                font-weight: 600;
                margin-bottom: 6px;

                &:hover {
                    color: inherit;
                }
            }
            p {
                font-size: 16px;
                font-weight: 400;
                line-height: inherit;
                margin: 0;
            }
        }

        &-footer {
            span {
                color: $black;
                &:first-child {
                    margin-right: 50px;
                }
            }
        }
    }
}
</style>
