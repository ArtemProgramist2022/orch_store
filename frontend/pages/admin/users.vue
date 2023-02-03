<template>
  <div>
    <el-table
      :data="users"
      v-loading="loading"
      class="table-with-overflow-only-body-max-height"
    >
      <el-table-column
        prop="name"
        label="Имя"
        min-width="150px"
      />
      <el-table-column
        prop="email"
        label="Email"
        min-width="150px"
      />
      <el-table-column
        min-width="150px"
      >
        <template slot="header">
          <span>Права администратора</span>
        </template>
        <template slot-scope="scope">
          <i v-if="scope.row.is_admin" class="el-icon-check" />
          <i v-else class="el-icon-close" />
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 16px">
      <pagination
        :currentPage="page"
        :total="total"
        :limit="limit"
        @change-page="changePage"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Action, Getter } from 'nuxt-property-decorator'
import Pagination from '~/components/Pagination.vue';
import { GetParams } from '~/interfaces/common';
import { ListResponse } from '~/interfaces/responses';
import { User } from '~/interfaces/users';

@Component({
  layout: 'admin',
  auth: true,
  transition: 'slide-bottom',
  components: {
    Pagination
  }
})
export default class UsersAdminIndex extends Vue {

  @Getter('users/items') users!: User[]
  @Getter('users/total') total!: number
  @Getter('users/limit') limit!: number
  @Getter('users/page') page!: number

  @Action('users/getUsers') getUsers!: (params?: Pick<GetParams, 'page'>) => Promise<ListResponse<User>>;

  loading = false

  mounted () {
    this.loading = true
    this.getUsers()
    .finally(() => this.loading = false)
  }

  changePage (page: number) {
    this.getUsers({
      page
    })
  }
}
</script>