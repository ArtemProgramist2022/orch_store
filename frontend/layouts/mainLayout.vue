<template>
  <el-container>
    <el-header class="public-layout__header">
      <PublicHeader />
    </el-header>

    <el-container direction="horizontal" class="container">
      <el-aside width="200px" class="public-layout__aside">
        <PublicAside />
      </el-aside>
      <el-main class="public-layout__main ">
        <nuxt />
      </el-main>
    </el-container>
    <el-footer class="public-layout__footer" />
  </el-container>
</template>

<style>
.container {
  padding: 0 10% 0 10%;

}
.public-layout__header {
  background: #fff;
  padding: 20px 10% 0 10%;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, .1);
  border-radius: 0 0 25px 25px;
  
  
}
.public-layout__main {
    padding: 0;
    min-height: 100vh;

  }

.public-layout__footer {
  height: auto !important;
  padding: 0;
  background: #f5f5f8;
}
body {
  margin: 0;
}

</style>
