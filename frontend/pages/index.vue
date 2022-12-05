<template>
  <div>
    <el-carousel trigger="click" height="65vh">
      <el-carousel-item v-for="item in 4" :key="item">
      </el-carousel-item>
    </el-carousel>
    <div class="stuff-catalog"> 
      <div
        v-for="stuff in 6"
        :key="`stuff-${stuff}`"
        class="stuff-item"
      >
        <el-image class="flex-center" style="width: 100%; border-radius: 8px; height: 200px; background-color: #c0c4cc;">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
        <div>description</div>
        <div>category</div>
        <div>count</div>
        <div>cost</div>
        <el-button
          type="primary"
          size="mini"
        >
          В корзину
        </el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  layout: 'main',
  auth: false,
  transition: 'slide-bottom'
})
export default class Index extends Vue {}

</script>
<style>
.el-carousel__item {
  background: url('~/assets/imgs/sale.jpeg') center;
}

.stuff-catalog {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 30px;
}

.stuff-item {
  width: 300px;
  height: 400px;
  text-align: center;
  border: 1px solid #696969;
  border-radius: 8px;
  margin: 0 10px 10px 0;
}
</style>