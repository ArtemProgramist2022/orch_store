<template>
    <el-container class="public-layout ">
      <el-header class="public-layout__header">
          <PublicHeader/>
      </el-header>
      <el-aside class="public-layout__aside container" width="10%">
        <PublicAside/>
      </el-aside>
      <el-main class="public-layout__main container">
        <nuxt />
      </el-main>
      <el-footer class="public-layout__footer">
        
      </el-footer>
    </el-container>
</template>

<style>
.container {
  padding: 0 10% 0 10%;
  align-items: center;
}
.public-layout__header {
  background: #eb03f33f;
  padding: 0 10% 0 10%;
  
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
