<template>
  <main-page />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import MainPage from '~/components/MainPage.vue'

@Component({
  layout: 'main',
  auth: false,
  transition: 'slide-bottom',
  components: {
    MainPage
  },
})
export default class IndexPage extends Vue {}
</script>