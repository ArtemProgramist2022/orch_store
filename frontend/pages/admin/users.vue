<template>
  <el-table
    :data="users"
    style="max-height: 65vh"
    v-loading="loading"
  >
    <el-table-column
      prop="name"
      label="Имя"
    />
    <el-table-column
      prop="email"
      label="Email"
    />
    <el-table-column
      label="Права администратора"
    >
      <template slot-scope="scope">
        <i v-if="scope.row.is_admin" class="el-icon-check" />
        <i v-else class="el-icon-close" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Component, Vue, Action, Getter } from 'nuxt-property-decorator'
import { GetParams } from '~/interfaces/common';
import { ListResponse } from '~/interfaces/responses';
import { User } from '~/interfaces/users';

@Component({
  layout: 'admin',
  auth: true,
  transition: 'slide-bottom'
})
export default class UsersAdminIndex extends Vue {

  @Getter('users/items') users!: User[]

  @Action('users/getUsers') getUsers!: (params?: Pick<GetParams, 'page'>) => Promise<ListResponse<User>>;

  loading = false

  mounted () {
    this.loading = true
    this.getUsers()
    .finally(() => this.loading = false)
  }
}
</script>