<template>
  <div>
    <div v-if="categories">
      {{categories}}
    </div>
    <div v-else>
      <p>No categories</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Action, Getter} from 'nuxt-property-decorator'
import {ICategory} from '../interfaces/categories'
@Component({
  auth:false
})
export default class IndexPage extends Vue{
  @Getter('categories/getCategories') categories!: Array<ICategory> 
  @Action('categories/fetchCategories') fetchCategories: any
  
  
  async fetch() {
    try {
      await this.fetchCategories()
      
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
