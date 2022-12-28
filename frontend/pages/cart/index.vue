<template>
  <div class="cart-page">
    <h2 class="cart-page__header">Корзина</h2>
    <div class="cart-page__main">
      <el-col :span="18">
        <el-table
          ref="tableRef"
          :data="cart"
          style="width: 100%"
          @selection-change="changeSelection"
        >
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column width="150">
            <template slot-scope="scope">
              <el-image
                style="width: 125px; height: 100px"
                :src="'https://orch.store/' + (scope.row.stuff ? scope.row.stuff.stuff_link : '')"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column
            label="Наименование"
            width="150"
          >
            <template slot-scope="scope">{{ scope.row.stuff && scope.row.stuff.name }}</template>
          </el-table-column>
          <el-table-column
            label="Количество"
            width="150"
          >
            <template slot-scope="scope">
              <el-input-number
                :value="scope.row.stuff_count"
                :min="0"
                :max="scope.row.stuff && scope.row.stuff.count_on_warehouse"
                size="mini"
                @change="changeCountStuffInCart($event, scope.row.id)"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="Стоимость"
            width="150"
          >
            <template slot-scope="scope">
              {{ getCostItem(scope.row) }} <span v-html="getRuble()"></span>
            </template>
          </el-table-column>
          <el-table-column width="75">
            <template slot-scope="scope">
              <el-popconfirm
                title="Подтвердите удаление"
                confirm-button-type="danger"
                confirm-button-text="Удалить"
                @confirm="deleteItemFromCart({ id: scope.row.id })"
              >
                <el-button
                  slot="reference"
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                />
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="6" class="cart-page__checkout">
        <el-button
          type="success"
          size="large"
          :disabled="!selection.length"
          @click="goToCheckout()"
        >
          Оформить заказ
        </el-button>
        <h4 class="cart-page__total-cost">
          Общая стоимость: {{ totalCost }} {{ '&#8381;' }}
        </h4>
      </el-col>
    </div>
  </div>
</template>

<script lang="ts">
import { Message } from 'element-ui'
import { ElTable } from 'element-ui/types/table'
import { Component, Getter, Action, Vue, Watch, Ref } from 'nuxt-property-decorator'
import { CartItem } from '~/interfaces/cart'
import { getTotalCost } from '~/utils/cart'
import { getRuble } from '~/utils/helpers'

@Component({
  layout: 'main',
  auth: false,
  transition: 'slide-bottom',
})
export default class CartPage extends Vue {

  @Ref('tableRef') tableRef!: ElTable

  @Getter('cart/items') cart!: CartItem[]

  @Action('cart/updateCountItemInCart') updateCountItemInCart!: (params: Pick<CartItem, 'stuff_count' | 'id'>) => Promise<CartItem>
  @Action('cart/deleteItemFromCart') deleteItemFromCart!: (params: Pick<CartItem, 'id'>) => Promise<CartItem>

  selection: CartItem[] = []

  @Watch('cart')
  watchCart () {
    this.allSelectionTable()
  }

  get totalCost () {
    return getTotalCost(this.selection)
  }

  mounted () {
    this.allSelectionTable()
  }

  allSelectionTable () {
    this.tableRef.toggleAllSelection()
    this.selection = this.cart
  }

  changeCountStuffInCart (stuff_count: number, id: number) {
    if (stuff_count > 0) {
      const params = {
        id,
        stuff_count,
      }
      this.updateCountItemInCart(params)
    } else {
      this.deleteItemFromCart({ id })
    }
  }

  changeSelection (value: CartItem[]) {
    this.selection = value
  }

  async goToCheckout () {
    try {
      for (const item of this.cart) {
        const selection_item = this.selection.find((selection_item) => selection_item.id === item.id)
        if (!selection_item) {
          await this.deleteItemFromCart({ id: item.id })
        }
      }
      this.$router.push('/cart/checkout')
    } catch {
      Message.error('Произошла ошибка при оформлении заказа. Попробуйте позже')
    }
  }

  getCostItem (item: CartItem) {
    return item.stuff_count * (item.stuff?.cost || 0)
  }

  getRuble () {
    return getRuble()
  }
}
</script>