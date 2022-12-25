<template>
  <div class="stuff">
    <div
      v-for="item in stuff"
      :key="item.id"
      class="stuff__item stuff-item"
    >
        <!-- window.location.origin -->
      <el-image class="stuff-item__logo" :src="'https://orch.store' + item.stuff_link"></el-image>
      <p class="stuff-item__name">
        {{ item.name }}
      </p>
      <p class="stuff-item__cost">
        {{ item.cost }}
        {{ '&#8381;' }}
      </p>
      <p class="stuff-item__description">
        {{ item.description }}
      </p>
      <div class="stuff-item__total">
        <div class="stuff-item__count">
          {{ item.count_on_warehouse }} шт
        </div>
        <el-button
          type="primary"
          size="mini"
        >
          В корзину
        </el-button>
      </div>
    </div>
    <el-empty v-if="!stuff.length" description="Нет товаров"></el-empty>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { StuffItem } from '~/interfaces/stuff'

@Component({
  layout: 'main',
  auth: false,
  transition: 'slide-bottom'
})
export default class Stuff extends Vue {
  @Prop({ required: true }) stuff!: StuffItem[]
}
</script>