<template>
  <div>
    <el-table
      :data="orders"
      v-loading="loading"
      class="table-with-overflow-only-body-max-height"
      >
      <el-table-column label="№" prop="id"></el-table-column>
      <el-table-column
        prop="delivery_address"
        label="Адрес доставки"
      />
      <el-table-column label="Дата доставки">
        <template slot-scope="scope">
          {{ scope.row.delivery_date || '&mdash;' }}
        </template>
      </el-table-column>
      <el-table-column label="Время доставки">
        <template slot-scope="scope">
          {{ scope.row.delivery_time || '&mdash;' }}
        </template>
      </el-table-column>
      <el-table-column label="Статус">
        <template slot-scope="scope">
          {{ getOrderStatus(scope.row.status) || '&mdash;' }}
        </template>
      </el-table-column>
      <el-table-column
        label="Пользователь"
      >
        <template slot-scope="scope">
          {{ scope.row.user.name }}
        </template>
      </el-table-column>
      <el-table-column
        label="Товары"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.items.length ? getStuffOrder(scope.row.items) : '&mdash;' }}</span>
        </template>
      </el-table-column>
      <el-table-column width="75">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="changeFormState(scope.row)"
          ></el-button>
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
          prop="delivery_date"
          label="Дата и время доставки"
        >
          <el-date-picker
            :value="getDeliveryDate()"
            type="datetime"
            placeholder="Укажите дату и время"
            format="dd.MM.yyyy HH:MM:SS"
            value-format="yyyy-MM-dd HH:MM:SS"
            @input="changeDeliveryDate"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item
          prop="status"
          label="Статус"
        >
          <el-select
            v-model="form.status"
          >
            <el-option
              v-for="item in getStatuses()"
              :key="item[0]"
              :label="item[1]"
              :value="item[0]"
            />
          </el-select>
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
import { CartItem } from '~/interfaces/cart';
import { GetParams } from '~/interfaces/common';
import { Order, OrderStatus, OrderStatusRU, UpdateOrder } from '~/interfaces/orders';
import { StuffItem } from '~/interfaces/stuff';

@Component({
  layout: 'admin',
  auth: true,
  transition: 'slide-bottom',
})
export default class CategoriesAdminIndex extends Vue {

  @Ref('form') formRef!: ElForm

  @Getter('adminOrders/items') orders!: Order[]

  @Getter('stuff/items') stuff!: StuffItem[]

  @Action('adminOrders/getOrders') getOrders!: () => Promise<Order[]>;
  @Action('adminOrders/updateOrder') updateOrder!: (params: UpdateOrder) => Promise<Order>;

  @Action('stuff/getStuff') getStuff!: (params?: Partial<GetParams> & { category_id?: string }) => Promise<StuffItem[]>;

  loading = false
  stuffLoading = false
  showForm = false
  form: Omit<Order, 'items'> & { items: number[] } = this.getDefaultForm()
  formRules = {
    delivery_date: [
      { required: true, message: 'Укажите дату и время', trigger: 'blur' }
    ],
    status: [
      { required: true, message: 'Укажите статус', trigger: 'change' }
    ]
  }

  mounted () {
    this.loading = true
    this.getOrders()
    .finally(() => this.loading = false)
  }

  getDefaultForm () {
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
      status: OrderStatus.WAIT_PAID,
    }
  }

  changeFormState (order: Order) {
    this.showForm = true;
    this.form = {
      ...order,
      items: order.items.map((item) => item.id)
    }
    this.getStuffSelect('')
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

  changeDeliveryDate (value: string) {
    const dividedValue = value.split(' ')
    const date = dividedValue[0]
    const time = dividedValue[1]
    this.form.delivery_date = date
    this.form.delivery_time = time
  }

  getStuffSelect (query: string) {
    this.stuffLoading = true;
    setTimeout(() => {
      this.getStuff()
      .finally(() => {
        this.stuffLoading = false;
      })
    }, 200);
  }

  getDeliveryDate () {
    if (this.form.delivery_date && this.form.delivery_time) {
      return this.form.delivery_date + ' ' + this.form.delivery_time
    } else if (this.form.delivery_date) {
      return this.form.delivery_date
    } else if (this.form.delivery_time) {
      return this.form.delivery_time
    } else return ''
  }

  getOrderStatus (status: OrderStatus) {
    return OrderStatusRU[status]
  }

  getStatuses () {
    return Object.entries(OrderStatusRU)
  }

  getStuffOrder (items: CartItem[]) {
    return items.map((item) => ' ' + item.stuff?.name || '').toString()
  }
}
</script>