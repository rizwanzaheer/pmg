<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

// Assets
import GlobeIcon from '@/assets/images/globe.svg';
import { ChevronDownIcon } from '@heroicons/vue/solid';

// Constants
import LANGUAGES from '@/constants/languages';

const { t, locale } = useI18n({ useScope: 'global' });

const props = defineProps({
    placement: {
        type: String,
        default: 'topCenter',
    },
    language: {
        type: String,
        default: 'English',
    },
    iconOnly: {
        type: Boolean,
        default: false,
    },
});

const currentLanguage = ref(localStorage.getItem('langTitle') || props.language);

function onClick(e) {
    currentLanguage.value = e.title;
    locale.value = e.lang;
    localStorage.setItem('lang', e.lang);
    localStorage.setItem('langTitle', e.title);
    setTimeout(() => {
        window.location.reload();
    }, 500);
}
</script>

<template>
    <div>
        <a-dropdown :placement="placement" :trigger="['click']" :getPopupContainer="(trigger) => trigger.parentNode">
            <a-button :class="`btn-dropdown ${iconOnly ? 'btn-dropdown--icon-only' : ''}`">
                <div class="flex items-center">
                    <img :src="GlobeIcon" />
                    <span v-if="!iconOnly">{{ currentLanguage }}</span>
                </div>
                <ChevronDownIcon v-if="!iconOnly" />
            </a-button>

            <template #overlay>
                <a-menu id="menu" class="dropdown dropdown--background-dark">
                    <a-menu-item v-for="language in LANGUAGES" :key="language.title" @click="onClick(language)" :getPopupContainer="(trigger) => trigger.parentNode">
                        <button>
                            <img :src="language.image" />
                            <span>{{ language.title }}</span>
                        </button>
                    </a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
    </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.btn-dropdown {
    display: flex !important;
    justify-content: space-between;
    align-items: center;
    padding: 8px 10px !important;
    align-items: center !important;
    background-color: transparent !important;
    border: 1px solid $darkGrey !important;
    width: 125px;

    &--icon-only {
        padding: 0 !important;
        width: auto;
        border: none !important;
        img {
            width: 28px !important;
        }
    }

    span {
        color: $white;
        margin-left: 4px;
        font-size: 12px;
        font-weight: 200;
    }
    img {
        width: 20px;
    }
    svg {
        color: $white;
        width: 20px;
    }
}

.dropdown {
    background-color: $blue;
    li {
        &:hover {
            span {
                color: $lighterBlue;
            }
        }
        button {
            display: flex;
            justify-content: space-between;
            color: $white;
            img {
                width: 20px;
                height: 20px;
            }
            span {
                font-weight: 300;
                font-size: 12px;
                margin-left: 10px;
            }
        }
    }
}
</style>
