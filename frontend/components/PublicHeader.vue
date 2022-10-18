<template>
    <div class="public-header">
        <nuxt-link 
            to="/" 
            class="public-header__logo"
        >
            <strong>Orch</strong>.store
        </nuxt-link>
        <el-button @click="changeLoginFormVisible"> Вход</el-button>
        <LoginForm :visible="loginFormVisible"/>
   </div>
</template>
<script lang="ts">
import {Component, Vue, Action, Getter } from 'nuxt-property-decorator'
import LoginForm  from "~/components/LoginForm.vue";

@Component({
    components: {
        LoginForm
    }
})
export default class PublicHeader extends Vue{
    loginFormVisible = false

    changeLoginFormVisible(){
        this.loginFormVisible = !this.loginFormVisible
    }
}
</script>
<style>
.public-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.public-header__logo {
    font-size: 18px;
    color: #aeb3b9;
    text-decoration: none;
}
.public-header__logo:hover {
    text-decoration: underline;
}
</style>