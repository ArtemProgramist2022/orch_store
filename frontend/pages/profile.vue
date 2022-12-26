<template>
  <div class="profile-page">
    <h2 class="profile-page__name">{{ $auth.user.name }}</h2>
    <div class="profile-page__item">
      Email: {{ $auth.user.email }}
    </div>
    <div class="profile-page__item">
      Права администратора: {{ $auth.user.is_admin ? 'Есть' : 'Нет' }}
    </div>
    <el-button
      size="mini"
    >
      Сменить пароль
    </el-button>
    <el-button
      type="danger"
      size="mini"
      @click="$auth.logout()"
    >
      Выйти
    </el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  transition: 'slide-bottom'
})
export default class ProfilePage extends Vue {}
</script>