<template>
  <el-col :span="24" class="flex-center">
    <el-pagination
      :current-page="currentPage"
      small
      layout="prev, pager, next"
      :total="total"
      :page-size="limit"
      hide-on-single-page
      @current-change="changePage"
    >
    </el-pagination>
  </el-col>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class Pagination extends Vue {
  @Prop({ required: true }) total!: number
  @Prop({ required: true }) limit!: number
  @Prop({ required: true }) currentPage!: number

  @Emit()
  changePage (page: number) {
    return page
  }
}
</script>