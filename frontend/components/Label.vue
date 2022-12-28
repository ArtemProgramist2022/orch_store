<template>
  <div
    class="label"
    :style="{
      backgroundColor: getVariant()
    }"
  >
    {{ titles[title] }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { OrderStatus, OrderStatusRU } from '~/interfaces/orders'
import { LabelVariants } from '~/interfaces/label'

@Component({})
export default class Label extends Vue {
  @Prop({ required: true }) title!: string

  variants: Record<string, LabelVariants> = {
    [OrderStatus.WAIT_PAID]: 'warning',
    [OrderStatus.PAID]: 'primary',
    [OrderStatus.DELIVERY]: 'info',
    [OrderStatus.DONE]: 'success',
  }

  titles: Record<string, string> = {
    [OrderStatus.WAIT_PAID]: OrderStatusRU.wait_paid,
    [OrderStatus.PAID]: OrderStatusRU.paid,
    [OrderStatus.DELIVERY]: OrderStatusRU.delivery,
    [OrderStatus.DONE]: OrderStatusRU.done,
  }

  getVariant () {
    const variant = this.variants[this.title]
    return variant === 'primary' ? '#409EFF'
    : variant === 'success' ? '#67C23A'
    : variant === 'danger' ? '#F56C6C'
    : variant === 'warning' ? '#E6A23C'
    : '#909399'
  }
}
</script>