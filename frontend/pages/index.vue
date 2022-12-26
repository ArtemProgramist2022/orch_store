<template>
  <div class="main" v-loading="loading">
    <Stuff :stuff="stuff" />
  </div>
</template>

<script lang="ts">
import { Action, Component, Getter, Vue } from 'nuxt-property-decorator'
import { GetParams } from '~/interfaces/common'
import { StuffItem } from '~/interfaces/stuff'
import Stuff from '~/components/Stuff.vue'

@Component({
  layout: 'main',
  auth: false,
  transition: 'slide-bottom',
  components: {
    Stuff
  },
})
export default class IndexPage extends Vue {
  @Getter('stuff/items') stuff!: StuffItem[]

  @Action('stuff/getStuff') getStuff!: (params?: Partial<GetParams> & { category_id?: string }) => Promise<StuffItem[]>

  loading = false

  mounted () {
    this.loading = true
    Promise.all([
      this.getStuff(),
    ])
    .finally(() => {
      this.loading = false
    })
  }

  beforeDestroy () {

  }
}
</script>