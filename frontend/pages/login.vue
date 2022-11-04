<template>
  <el-container class="center">
    <LoginForm />
  </el-container>
    
  
  </template>
  <script lang="ts">
  import { Component, Action, Getter, Vue } from 'nuxt-property-decorator'
  import LoginForm from "@/components/LoginForm.vue";
  
  @Component({
    auth: 'guest',
    layout: 'authLayout'
  })
  export default class Index extends Vue {
  
  }
  
  </script>

  <style>
  .center{
    padding: 15px 10% 15px 10%;
    text-align: center;
    position: relative;
  }

</style>