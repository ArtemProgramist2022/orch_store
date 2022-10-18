<template>
    <el-row>
  <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
    <el-card :body-style="{ padding: '0px' }">
      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
      <div style="padding: 14px;">
        <span>Yummy hamburger</span>
        <div class="bottom clearfix">
          <time class="time">{{ currentDate }}</time>
          <el-button type="text" class="button">Operating</el-button>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>
</template>
<script lang="ts">
import { Vue, Action, Getter, Component} from 'nuxt-property-decorator'
import { IStuff} from '~/interfaces/stuff'


@Component({
    layout: 'mainLayout',
    auth:false
})
export default class StuffPage extends Vue {
    category_id: number = Number(this.$route.params.category_id)

    @Getter('stuff/items') stuff!: Array<IStuff>
    @Getter('stuff/page') page!: number
    @Getter('stuff/total') total!: number
    @Getter('stuff/limit') limit!: number

    @Action('stuff/fetchStuff') fetchStuff: any


    currentDate = new Date()
    async fetch(){
        await this.fetchStuff({
            page: this.page,
            limit: this.limit,
            category_id:this.category_id
        })
    }
}

</script>