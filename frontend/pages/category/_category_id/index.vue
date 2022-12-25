<template>
  <div class="main" v-loading="loading">
    <Stuff :stuff="stuff" />
  </div>
</template>

<script lang="ts">
import { Action, Component, Getter, Vue } from 'nuxt-property-decorator'
import { StuffItem } from '~/interfaces/stuff'
import Stuff from '~/components/Stuff.vue'
import { GetParams } from '~/interfaces/common'

@Component({
  auth: false,
  layout: 'main',
  transition: 'slide-bottom',
  components: {
    Stuff
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
    this.getStuff(params)
    .finally(() => this.loading = false)
  }
}
</script>

<style>

</style>