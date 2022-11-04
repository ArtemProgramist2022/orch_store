<template>
  <el-container direction="vertical">
    <ul class="stuff-grid">
      <li v-for="item in stuff" :key="item.id" class="stuff-wrapper">
        <el-card class="stuff-page__card">
          
            <img class="stuff-image" :src="item?.stuff_link">
          
          <span>{{item.id}}</span>
          <span>{{ item.name }}</span>
          <span>{{ item.cost }}</span>
          <el-button @click="addToCart(item, 1)">
            В корзину
          </el-button>
        </el-card>
      </li>
    </ul>

  </el-container>
</template>
<script lang="ts">
import { Component, Action, Getter, Vue } from 'nuxt-property-decorator'
import { IStuff } from '~/interfaces/stuff';

@Component({
  layout: 'mainLayout',
  auth: false
})
export default class Index extends Vue {
  @Getter('stuff/items') stuff!: Array<IStuff>
    @Getter('stuff/page') page!: number
    @Getter('stuff/total') total!: number
    @Getter('stuff/limit') limit!: number

    @Action('stuff/fetchStuff') fetchStuff: any
    @Action('stuff/changePage') changePage: any
    @Action('cart/addStuffToCart') addStuffToCart: any
    async fetch () {
      await this.fetchStuff({
        page: this.page,
        limit: this.limit,
        
      })
    }
// <infinite-loading v-if="stuff.length" spinner="spiral" @infinite="infiniteScroll"></infinite-loading>

    infiniteScroll(){
      setTimeout(()=>{
        this.changePage(this.page++)
        this.fetchStuff({
            page: this.page
          }
        )
      }, 500)
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
.stuff-image {
  width: 100%;
  display: block;
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
</style>