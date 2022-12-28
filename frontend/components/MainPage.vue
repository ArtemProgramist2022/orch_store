<template>
  <Loading :loading="loading">
    <div class="main-page" v-loading="loading">
      <stuff-item-component
        v-for="item in stuff"
        :key="item.id"
        :stuffItem="item"
      />
      <el-empty v-if="!stuff.length" description="Нет товаров"></el-empty>
    </div>
  </Loading>
</template>

<script lang="ts">
import { Action, Component, Getter, Vue } from 'nuxt-property-decorator'
import { StuffItem } from '~/interfaces/stuff'
import StuffItemComponent from '~/components/StuffItem.vue'
import Loading from '~/components/Loading.vue'
import { GetParams } from '~/interfaces/common'

@Component({
  auth: false,
  layout: 'main',
  transition: 'slide-bottom',
  components: {
    StuffItemComponent,
    Loading
  }
})
export default class IndexCategoryId extends Vue {
  @Getter('stuff/items') stuff!: StuffItem[]

  @Action('stuff/getStuff') getStuff!: (params?: Partial<GetParams> & { category_id?: string }) => Promise<StuffItem[]>

  loading = false

  mounted () {
    this.loading = true
    const params = {
      category_id: this.$route.params.category_id
    }
    this.getStuff(this.$route.params.category_id ? params : {})
    .finally(() => this.loading = false)
  }
}
</script>