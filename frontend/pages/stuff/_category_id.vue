<template>
  <el-container direction="vertical">
    <ul class="stuff-grid">
      <li v-for="item in stuff" :key="item.id" class="stuff-wrapper">
        <el-card class="stuff-page__card">
          <img class="stuff-image" :src="item?.stuff_link">
          <span>{{ item.name }}</span>
          <span>{{ item.cost }}</span>
          <el-button @click="addToCart(item, 1)">
            В корзину
          </el-button>
        </el-card>
      </li>
    </ul>
    <el-pagination
      :page-size.sync="stuff.length"

      :current-page="page"
      :hide-on-single-page="stuff.length <= limit"
      layout="prev, next, total"
      :total="total"
      @prev-click="prevPage"
      @next-click="nextPage"
      @current-change="currentChange"
    />
  </el-container>
</template>
<script lang="ts">
import { Vue, Action, Getter, Component } from 'nuxt-property-decorator'
import { IStuff } from '~/interfaces/stuff'

@Component({
  layout: 'main',
  auth: false
})
export default class StuffPage extends Vue {
  category_id: number = Number(this.$route.params.category_id)

    @Getter('stuff/items') stuff!: Array<IStuff>
    @Getter('stuff/page') page!: number
    @Getter('stuff/total') total!: number
    @Getter('stuff/limit') limit!: number

    @Action('stuff/fetchStuff') fetchStuff: any
    @Action('stuff/changePage') changePage: any
    @Action('cart/addStuffToCart') addStuffToCart: any

    currentDate = new Date()
    async fetch () {
      await this.fetchStuff({
        page: this.page,
        limit: this.limit,
        category_id: this.category_id
      })
    }

    pagerCount = this.total / this.limit

    async prevPage () {
      this.changePage(this.page - 1)
      console.log(this.page)
      await this.fetchStuff({
        page: this.page,
        limit: this.limit,
        category_id: this.category_id
      })
    }

    async nextPage () {
      this.changePage(this.page + 1)
      console.log(this.page)
      await this.fetchStuff({
        page: this.page,
        limit: this.limit,
        category_id: this.category_id
      })
    }

    async currentChange (val: number) {
      this.changePage(val)
      console.log(val)
      await this.fetchStuff({
        page: this.page,
        limit: this.limit,
        category_id: this.category_id
      })
    }

    addToCart (item: IStuff, count: number) {
      this.addStuffToCart({
        stuff_id: item.id,
        stuff_count: count
      }).then(() => {

      }).catch((error: any) => {})
    }
}

</script>
<style>

.stuff-grid {
  margin-top: 50px;
}

.stuff-page__card{
  width: 250px;
  height: 300px;
  border-radius: 20px;
}
.stuff-wrapper {
  display: block;
  float: left;
  margin: 20px;
}
.stuff-image{
  display: block;
  width: 100%;
}
</style>
