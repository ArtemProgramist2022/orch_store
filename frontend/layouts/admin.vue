<template>
    <el-container>
      <el-header class="public-layout__header">
        <PublicHeader />
      </el-header>
      <el-header class="admin-layout__header">
        <nuxt-link to="/admin/users">
            <el-button>
                Пользователи
            </el-button>
        </nuxt-link>
        <nuxt-link to="/admin/stuff">
            <el-button>
                Товары
            </el-button>
        </nuxt-link>
        <nuxt-link to="/admin/categories">
            <el-button>
                Категории
            </el-button>
        </nuxt-link>
        <nuxt-link to="/admin/orders">
            <el-button>
                Заказы
            </el-button>
        </nuxt-link>
      </el-header>
      <el-container direction="horizontal" >
        <nuxt />
        </el-container>
      <el-footer class="public-layout__footer" ></el-footer>
    </el-container>
</template>

  <style>
  .container {
    padding: 0 10% 0 10%;
  
  }
  .public-layout__header {
    /* background: #fff;
    padding: 0 10% 0 10%;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, .1);
    border-radius: 0 0 25px 25px;
    vertical-align: middle;
    height: 150px; */
  }
  .admin-layout__header {
    background: #fff;
    padding: 15px 10% 15px 10%;
    
    align-items: center;
    justify-content:center;
    
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
  