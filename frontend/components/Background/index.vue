<template>
  <div class="background">
    <BackgroundItem />
    <!-- <BackgroundItem />
    <BackgroundItem />
    <BackgroundItem /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import BackgroundItem from '~/components/Background/BackgroundItem.vue'

@Component({
  components: {
    BackgroundItem
  }
})
export default class Background extends Vue {}
</script>