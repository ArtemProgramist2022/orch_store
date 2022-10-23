<template>
    <el-container>
      <el-header class="public-layout__header">
        <PublicHeader />
      </el-header>
  
      <el-container direction="horizontal" class="container">
        <nuxt/>
        </el-container>
      <el-footer class="public-layout__footer" ></el-footer>
    </el-container>
  </template>
  
  <style>
  .container {
    padding: 0 10% 0 10%;
  
  }
  .public-layout__header {
    background: #fff;
    padding: 0 10% 0 10%;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, .1);
    border-radius: 0 0 25px 25px;
    vertical-align: middle;
    height: 150px;
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
  