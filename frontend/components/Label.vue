<template>
  <div
    class="label"
    :style="{
      backgroundColor: getVariant()
    }"
  >
    {{ title }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class Label extends Vue {
  @Prop({ required: true }) title!: string
  @Prop({ default: 'primary' }) variant!: 'success' | 'danger' | 'primary' | 'warning' | 'info'

  getVariant () {
    return this.variant === 'primary' ? '#409EFF'
    : this.variant === 'success' ? '#67C23A'
    : this.variant === 'danger' ? '#F56C6C'
    : this.variant === 'warning' ? '#E6A23C'
    : '#909399'
  }
}
</script>