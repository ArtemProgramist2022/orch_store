<template>
    <el-tabs type="border-card" class="admin-tabs">
  <el-tab-pane label="Пользователи">Пользователи</el-tab-pane>
  <el-tab-pane label="Товары">Товары</el-tab-pane>
  <el-tab-pane label="Категории"><AdminCategoryTab/></el-tab-pane>
  <el-tab-pane label="Заказы">Заказы</el-tab-pane>
</el-tabs>

</template>
<script lang="ts">
import { Vue, Component, Action, Getter } from "nuxt-property-decorator";
import AdminCategoryTab from "@/components/AdminCategrories.vue";


@Component({
    layout:'authLayout',
    middleware: ['check_role'],
    components:{
        AdminCategoryTab
    }
})
export default class AdminPage extends Vue{

   
}

</script>

<style>

.admin-tabs{
    width: 90%;
    padding-left: 15%;
    padding-right: 15%;
    height: 100vh;
}

</style>