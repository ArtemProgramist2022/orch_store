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
    text-align: center;
    position: relative;
  }

</style>