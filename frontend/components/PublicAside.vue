<template>
  <div>
      <h3>Категории</h3>
      <div v-if="categories">
        <ul>
          <li v-for="cat in categories" :key="cat.id" >
            <nuxt-link 
              class="link"
              :to="`/stuff/${cat.id}`"
            >
            {{cat.name}}
            </nuxt-link>
          </li>  
        </ul>
        
      </div>
      <div v-else>
        NO CATEGORIES
      </div>
  </div>
    
  </template>
  
  <script lang="ts">
  import { Component, Vue, Action, Getter} from 'nuxt-property-decorator'
  import {ICategory} from '../interfaces/categories'
  
  
  @Component({
    components:{
     
    }
  })
  export default class PublicAside extends Vue{
    @Getter('categories/data') categories!: Array<ICategory>
    @Getter('categories/success') success!: boolean 
  
    @Action('categories/fetchCategories') fetchCategories: any
    
    current_tab = ""
    async handleClick(tab: any, event:any){
      console.log(tab.label)
      console.log(event)
      this.current_tab = tab.label
      
    }
    visible = true
    async fetch() {
      try {
        await this.fetchCategories()
        if (this.categories.length != 0){
          this.current_tab = this.categories[0].name
        }
      } catch (error) {
      }
    }
  }
  </script>
  
  
  <style>
  .link {
    text-decoration: none;
  }
  
  
  </style>