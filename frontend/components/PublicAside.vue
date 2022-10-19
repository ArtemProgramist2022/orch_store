<template>
  <div class="categories-block">
      
      <div v-if="categories">
        <ul>
          <li style="margin-top: 20px; display: block;">Категории</li>
          <li v-for="cat in categories" :key="cat.id" class="category-wrapper">
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
  
  .categories-block {
    margin-top: 70px;
    float: left;
  }

  .category-wrapper {
    display: block;
    margin-top: 15px;
    
  }
  </style>