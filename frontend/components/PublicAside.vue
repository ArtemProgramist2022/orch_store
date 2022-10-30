<template>
  <div class="categories-block">
    <div v-if="categories">
      <ul>
        <li class="categories-title">
          Категории
        </li>
        <li v-for="cat in categories" :key="cat.id" class="category-wrapper">
          <nuxt-link
            class="link"
            :to="`/stuff/${cat.id}`"
          >
            <el-button>{{ cat.name }}</el-button>
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
import { Component, Vue, Action, Getter } from 'nuxt-property-decorator'
import { ICategory } from '../interfaces/categories'

  @Component({
    components: {

    }
  })
export default class PublicAside extends Vue {
    @Getter('categories/data') categories!: Array<ICategory>
    @Getter('categories/success') success!: boolean

    @Action('categories/fetchCategories') fetchCategories: any

    

    visible = true
    async fetch () {
      try {
        await this.fetchCategories()
      } catch (error) {
      }
    }
}
</script>

  <style>
  .link {
    text-decoration: none;
    color: #958abe;
  }
  .link:hover {
    text-decoration: underline;
  }
  .categories-block {
    margin-top: 90px;
    float: left;
    
    margin-right: 15px;
    margin-left: 10px;
    padding-left: 15px;
    padding-right: 15px;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, .1);
    border-radius: 15px;
  }
  .categories-block > div > ul {
    
    padding-left: 0;
  }

  .category-wrapper {
    display: block;
    margin-top: 15px;

  }
  .categories-title {
    color: #958abe;
    text-decoration: underline;
    display: block;
   
    

  }
  </style>
