<template>
    <ul class="categories-list">
        <el-form :inline="true" :model="form" :rules="rules" ref="form" class="demo-form-inline">
  <el-form-item label="Новая категория" prop="name">
    <el-input v-model="form.name"  placeholder="Название"></el-input>
  </el-form-item>
  
  <el-form-item>
    <el-button type="primary" @click="onSubmit">Добавить</el-button>
  </el-form-item>
</el-form>
        <li v-for="category in categories" :key="category.id" class="categories-list__item">
            <span class="categories-list__item__title">{{category.name}}</span>
            <el-button class="el-icon-delete-solid categories-list__item__button" @click="removeItem(category.id)"></el-button>
        </li>
    </ul>
</template>
<script lang="ts">
import { Vue, Action, Getter, Component, Ref } from "nuxt-property-decorator";
import { CategoryItem } from "@/interfaces/categories";
import { ElForm } from 'element-ui/types/form'

@Component({
    layout: 'adminLayout',
    middleware: ['check_role'],
    auth: true
})
export default class AdminCategoryPage extends Vue{
    @Getter('categories/data') categories! : Array<CategoryItem>
    
    @Action('categories/addNewCategory') addCategory : any
    @Action('categories/fetchCategories') fetchCategories : any
    @Action('categories/dropCategory') dropCategory: any

    @Ref('form') formRef!: ElForm
    form: Omit<CategoryItem, 'id'> = {
        name: ''
    }

    rules = {
        name: [
            {required: true, message: 'Это обязательное поле',trigger:'blur'},
            {min: 3, max: 55, message: 'Ограничение от 3 до 55 знаков', trigger: 'blur'}
        ]
    }

    async fetch(){
        await this.fetchCategories()
    }

    removeItem(category_id: number){
        this.dropCategory(category_id).then(()=>{
            this.fetchCategories().then(()=>{})
        })
    }
    onSubmit(){
        this.formRef.validate((valid) => {
            if (valid){
                this.addCategory(this.form.name).then(()=>{})
            }
        })
    }
}

</script>
<style>
    .categories-list{
        width: 300px;
    }
    .categories-list__item{
        display: flex;
    align-items: center;
    justify-content: space-between;
    }
    .categories-list__item__button{
        color: red;
    }

</style>