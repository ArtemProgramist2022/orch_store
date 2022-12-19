<template>
  <div class="auth-layout">
    <el-header class="auth-layout__header">
      <h1 class="auth-layout-header__name cursor-pointer" @click="$router.push('/')">orch.store</h1>
    </el-header>
    <div>
      <nuxt />
    </div>
  </div>
</template>
  
<style>
.auth-layout {
  height: 100vh;
  width: 100vw;
}

.auth-layout__header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px !important;
  background: rgba(255, 255, 255, .85);
  border-top: 15px solid #C21807;
  border-bottom: 1px solid black;
  padding: 15px;
  margin-bottom: 15px;
}

.auth-layout-header__name {
  position: relative;
  border-right: 3px solid black;
  border-left: 3px solid black;
  padding: 0 15px;
  margin: 0;
  font-size: 26px;
}

.auth-layout-header__name::after, .auth-layout-header__name::before {
  content: '';
  display: block;
  position: absolute;
  bottom: 0;
  width: 2px;
  height: 20px;
  background: black;
}

.auth-layout-header__name::after {
  right: -10px;
}

.auth-layout-header__name::before {
  left: -10px;
}
</style>
  