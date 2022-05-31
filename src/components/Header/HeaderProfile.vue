<script setup>
import ProfileIcon from '@/assets/images/navigation_icons/user.svg';
import { ChevronDownIcon } from '@heroicons/vue/solid';

import { HEADERS_LINKS } from '@/constants/headerMenuItems';
import { ref } from 'vue';

defineProps({
    placement: {
        type: String,
        default: 'bottomCenter',
    },
});
</script>

<template>
    <div>
        <a-dropdown :placement="placement" :trigger="['click']" :getPopupContainer="(trigger) => trigger.parentNode">
            <a class="btn-dropdown">
                <img :src="ProfileIcon" />
            </a>
            <template #overlay>
                <a-menu class="dropdown dropdown--background-light">
                    <a-menu-item>
                        <a :href="HEADERS_LINKS.PMG" target="_blank">{{ $t('common.lable.pmgDotCom') }}</a>
                    </a-menu-item>
                    <a-menu-item>
                        <a href="#" @click="$emit('onLogout')">{{ $t('common.button.signout') }}</a>
                    </a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
    </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.dropdown {
    padding: 0;
    li {
        &:hover {
            a {
                color: $white;
            }
        }
        a {
            color: $lighterBlue;
        }
    }
}
</style>
