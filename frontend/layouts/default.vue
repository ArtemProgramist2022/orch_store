<template>
  <el-container class="layout">
    <background />
    <el-header class="layout__header layout-header">
      <h1 class="layout-header__name">
        <nuxt-link :to="'/'" class="text-decoration-none" style="color: #303133">
          orch.store
        </nuxt-link>
      </h1>
    </el-header>
    <el-col class="layout__content layout-content layout-nuxt" :span="24">
      <nuxt />
    </el-col>
  </el-container>
</template>