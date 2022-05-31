<script setup>
import { ref } from 'vue';

import LanguageSelect from '../LanguageSelect.vue';
import HeaderCategories from './HeaderCategories.vue';
import HeaderSearch from './HeaderSearch.vue';
import HeaderProfile from './HeaderProfile.vue';

import { HEADERS_LINKS } from '@/constants/headerMenuItems';

import SearchIcon from '@/assets/images/navigation_icons/search.svg';
import Logo from '@/assets/images/logo.svg';

let isAuthenticated = $(ref(false));

function Login() {
    isAuthenticated = true;
}

function LogOut() {
    isAuthenticated = false;
}
</script>

<template>
    <nav class="header flex items-center">
        <div class="mx-auto flex w-[95%] justify-between">
            <div class="header__left flex items-center">
                <router-link class="logo" to="/">
                    <img :src="Logo" class="brand-logo" />
                </router-link>
                <div class="header__left-items flex items-center">
                    <HeaderCategories />
                </div>
            </div>
            <div class="header__right flex items-center">
                <div v-if="!isAuthenticated" class="authentication">
                    <a class="authentication__signIn" href="#" @click="Login">{{ $t('common.button.signin') }}</a>
                    <a class="authentication__signUp" href="#" @click="Login">{{ $t('common.button.signup') }}</a>
                </div>
                <HeaderSearch class="search" />
                <LanguageSelect class="language" :iconOnly="true" placement="bottomCenter" />
                <HeaderProfile v-if="isAuthenticated" class="profile" @onLogout="LogOut" />
            </div>
        </div>
    </nav>
</template>

<style lang="scss">
@import '@/styles/variables.scss';
.header {
    background-color: $black;
    color: $white;
    height: 60px;

    position: sticky;
    top: 0;
    z-index: 999;
    box-shadow: 0 1px 8px 0 rgba(255, 255, 255, 0.2);

    &__left {
        .logo {
            img {
                width: 56px;
            }
        }
        &-items {
            margin-left: 45px;
            a {
                &:first-child {
                    margin-left: 0;
                }
                margin-left: 24px;
            }
        }
    }

    &__right {
        font-weight: 300;
        .authentication {
            &__signIn {
                color: $lightBlue;
                margin-right: 20px;
            }
            &__signUp {
                background-color: $lighterBlue;
                color: $white;
                padding: 8px 14px;
                width: 120px;
                text-align: center;
                border-radius: 2px;
            }
        }
        .theme {
            margin-left: 40px;
        }
        .search {
            margin-left: 20px;
            margin-right: 10px;
        }
        .download,
        .language,
        .profile {
            margin-left: 10px;
        }
    }
    .brand-logo {
        filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%);
    }
}
</style>
