<template>
  <div v-loading="loading">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class Loading extends Vue {
  @Prop({ default: false }) loading!: boolean
}
</script>