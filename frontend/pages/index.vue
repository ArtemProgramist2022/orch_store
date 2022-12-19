<template>
  <div style="width: 100%">
    <div>
      <el-carousel trigger="click" height="65vh" style="border-radius: 10px">
        <el-carousel-item v-for="item in 4" :key="item">
        </el-carousel-item>
      </el-carousel>
      <div class="stuff-catalog"> 
        <div
          v-for="item in stuff"
          :key="`stuff-${item.id}`"
          class="stuff-item"
        >
          <el-image
            :src="'https://orch.store' + item.stuff_link"
            class="flex-center"
            style="width: 100%; border-radius: 8px; height: 200px; background: #f5f7fa;"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <p style="padding: 5px 0;">{{ item.cost }} ₽</p>
          <h4 style="font-size: 20px">{{ item.name }}</h4>
          <p style="font-size: 13px; color: #909399">Категория: {{ item.category.name }}</p>
          <p style="padding-top: 15px;">Осталось {{ item.count_on_warehouse }} шт</p>
          <el-button
            type="primary"
            size="mini"
            style="position: absolute; bottom: 15px; left: 50%; transform: translateX(-50%)"
          >
            В корзину
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Action, Component, Getter, Vue } from 'nuxt-property-decorator'
import { GetParams } from '~/interfaces/common'
import { StuffItem } from '~/interfaces/stuff'

@Component({
  layout: 'main',
  auth: false,
  transition: 'slide-bottom'
})
export default class IndexPage extends Vue {
  @Getter('stuff/items') stuff!: StuffItem[]

  @Action('stuff/getStuff') getStuff!: (params?: Partial<GetParams> & { category_id?: string }) => Promise<StuffItem[]>

  mounted () {
    this.getStuff()
  }
}

</script>
<style>
.el-carousel__item {
  background: url('~/assets/imgs/indexPage.jpg') center;
}

.stuff-catalog {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 30px;
}

.stuff-item {
  position: relative;
  width: 300px;
  height: 400px;
  text-align: center;
  border-radius: 8px;
  margin: 0 25px 15px 0;
  color: #303133;
}
</style>