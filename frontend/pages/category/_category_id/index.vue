<template>
  <div>
    CATEGORY ID
  </div>
</template>

<script lang="ts">
import { Action, Component, Vue } from 'nuxt-property-decorator'
import { StuffGetParams } from '~/interfaces/stuff'

@Component({
  auth: false,
  transition: 'slide-bottom'
})
export default class IndexCategoryId extends Vue {

  @Action('stuff/getStuff') getStuff!: (params: StuffGetParams) => void

  mounted () {
    const params = {
      category_id: this.$route.params.category_id
    }
    this.getStuff(params)
  }
}
</script>

<style>

</style>