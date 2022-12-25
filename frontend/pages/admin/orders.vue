<template>
  <div>
    <el-table
      :data="orders"
      v-loading="loading"
      class="table-with-overflow-only-body-max-height"
      >
      <el-table-column
        prop="delivery_address"
        label="Адрес доставки"
      />
      <el-table-column
        prop="delivery_date"
        label="Дата доставки"
      />
      <el-table-column
        prop="delivery_time"
        label="Время доставки"
      />
      <el-table-column
        prop="status"
        label="Статус"
      />
      <el-table-column
        label="Пользователь"
      >
        <template slot-scope="scope">
          {{ scope.row.user }}
        </template>
      </el-table-column>
      <el-table-column
        label="Товары"
      >
        <template slot-scope="scope">
          {{ scope.row.items }}
        </template>
      </el-table-column>
      <el-table-column width="150">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="changeFormState(scope.row)"
          ></el-button>
          <el-popconfirm
            title="Подтвердите удаление"
            @confirm="deleteItem(scope.row.id)"
            confirm-button-type="danger"
            confirm-button-text="Удалить"
          >
            <el-button
              slot="reference"
              type="danger"
              size="mini"
              icon="el-icon-delete"
            ></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="Редактирование заказа"
      :visible.sync="showForm"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="formRules"
        size="mini"
        label-position="top"
        @submit.prevent.native="updateItem()"
        v-loading="loading"
      >
        <el-form-item
          prop="name"
          label="Адрес доставки"
        >
          <el-input
            v-model="form.name"
            placeholder="Укажите наименование"
          />
        </el-form-item>
        <el-form-item>
          <div class="flex-center">
            <el-button
              type="primary"
              native-type="submit"
            >
              Редактировать
            </el-button>
            <el-button
              @click="showForm = false"
            >
              Отменить
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-ui/types/form';
import { Component, Vue, Action, Getter, Ref } from 'nuxt-property-decorator'
import { Order } from '~/interfaces/orders';

@Component({
  layout: 'admin',
  auth: true,
  transition: 'slide-bottom'
})
export default class CategoriesAdminIndex extends Vue {

  @Ref('form') formRef!: ElForm

  @Getter('orders/items') orders!: Order[]

  @Action('orders/getOrders') getOrders!: () => Promise<Order[]>;
  @Action('orders/updateOrder') updateOrder!: (params: Order) => Promise<Order>;

  loading = false
  showForm = false
  form: Order = this.getDefaultForm()
  formRules = {
    name: [
      { required: true, message: 'Укажите наименование', trigger: 'blur' }
    ]
  }

  mounted () {
    this.loading = true
    this.getOrders()
    .finally(() => this.loading = false)
  }

  getDefaultForm (): Order {
    return {
      id: 0,
      en: false,
      delivery_address: 'string',
      delivery_date: 'string',
      delivery_time: 'string',
      items: [],
      user_id: null,
      user: {
        id: 0,
        en: false,
        name: '',
        email: '',
        is_admin: false,
        ctime: null,
        dtime: null,
        atime: null
      },
      status: '',
    }
  }

  changeFormState (order?: Order) {
    this.showForm = true;
    if (order) this.form = {
      ...order
    }
  }

  updateItem () {
    this.formRef.validate((valid) => {
      if (!valid) return;
      this.loading = true
      this.updateOrder(this.form)
      .then(() => {
        this.showForm = false
        this.getDefaultForm()
      })
      .finally(() => {
        this.loading = false
      })
    })
  }
}
</script>