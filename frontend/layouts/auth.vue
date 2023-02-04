<template>
  <el-container class="layout">
    <background />
    <el-header class="layout__header layout-header">
      <h1 class="layout-header__name" :style="!$device.isDesktop && { color: 'white', fontSize: '18px', lineHeight: 'normal' }">
        <nuxt-link :to="'/'">
          Главная
        </nuxt-link>
      </h1>
    </el-header>
    <el-col class="layout__content layout-content layout-nuxt layout-auth-nuxt" :span="24">
      <nuxt />
    </el-col>
  </el-container>
</template>
  