<template>
    <LoginForm />
  
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