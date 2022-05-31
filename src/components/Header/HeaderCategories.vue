<script setup>
import CategoriesIcon from '@/assets/images/navigation_icons/categories.svg';
import { ChevronDownIcon } from '@heroicons/vue/solid';

defineProps({
    placement: {
        type: String,
        default: 'bottomLeft',
    },
});

const categories = [
    {
        name: 'Film',
        id: 1,
    },
    {
        name: 'Star Ships',
        id: 2,
    },
];
</script>

<template>
    <a-dropdown :placement="placement" :trigger="['click']" :getPopupContainer="(trigger) => trigger.parentNode">
        <a class="btn-dropdown flex">
            <img :src="CategoriesIcon" />

            <div class="ml-[6px] flex items-center">
                <span>{{ $t('common.lable.categories') }}</span>
                <ChevronDownIcon />
            </div>
        </a>
        <template #overlay>
            <a-menu class="dropdown" @click="onClick">
                <a-menu-item v-for="(category, index) in categories" :key="index">
                    <router-link :to="`/search?category=${category.id}`">
                        <p v-html="$t(category.name)"></p>
                    </router-link>
                </a-menu-item>
            </a-menu>
        </template>
    </a-dropdown>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.btn-dropdown {
    div {
        span {
            font-size: 14px;
            font-weight: 300;
            color: white;
        }
        svg {
            transition: 0.2s ease-in-out;
            margin-left: 2px;
            width: 22px;
            color: $white;
        }
    }
}

.dropdown {
    padding: 0;
    li {
        &:hover {
            p {
                color: $lighterBlue;
            }
        }
        p {
            padding: 6px;
            margin: 0;
            color: $black;
        }
    }

    .categories-all {
        text-align: center;
        background-color: $lighterBlue;
        color: $white;
        padding: 10px;

        margin-left: 0;
    }
}
</style>
