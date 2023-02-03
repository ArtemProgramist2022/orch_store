<template>
  <div>
    <el-table
      :data="categories"
      v-loading="loading"
      class="table-with-overflow-only-body-max-height"
    >
      <el-table-column
        label="Наименование"
      >
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="changeFormState(scope.row)"
          ></el-button>
          <el-popconfirm
            title="Подтвердите удаление"
            @confirm="deleteCategory(scope.row.id)"
            confirm-button-type="danger"
            confirm-button-text="Удалить"
          >
            <el-button
              slot="reference"
              type="danger"
              size="small"
              icon="el-icon-delete"
            ></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" style="text-align: right; padding: 6px 0">
      <el-button
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="changeFormState()"
          :disabled="loading"
      >
          Создать категорию
      </el-button>
    </el-col>
    <el-dialog
      :title="form.id ? 'Редактирование категории' : 'Новая категория'"
      :visible.sync="showForm"
      @closed="closedForm()"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="formRules"
        size="small"
        label-position="top"
        @submit.prevent.native="updateCategory()"
        v-loading="loading"
      >
        <el-form-item
          prop="name"
          label="Наименование"
        >
          <el-input
            v-model="form.name"
            placeholder="Укажите наименование"
          />
        </el-form-item>
        <el-form-item>
          <div class="flex-center" :style="$device.isMobile && { flexDirection: 'column' }">
            <el-button
              type="primary"
              native-type="submit"
              :style="$device.isMobile && { marginBottom: '5px' }"
            >
              {{ form.id ? 'Редактировать' : 'Создать' }}
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
import { CategoryItem } from '~/interfaces/categories';

@Component({
  layout: 'admin',
  auth: true,
  transition: 'slide-bottom'
})
export default class CategoriesAdminIndex extends Vue {

  @Ref('form') formRef!: ElForm

  @Getter('categories/items') categories!: CategoryItem[]
  @Getter('categories/loading') loading!: boolean

  @Action('categories/getCategories') getCategories!: () => Promise<CategoryItem[]>;
  @Action('categories/addCategory') addCategoryState!: (params: Omit<CategoryItem, 'id'>) => Promise<CategoryItem>;
  @Action('categories/updateCategory') updateCategoryState!: (params: CategoryItem) => Promise<CategoryItem>;
  @Action('categories/deleteCategory') deleteCategoryState!: (params: Pick<CategoryItem, 'id'>) => Promise<CategoryItem[]>;
  @Action('categories/changeLoading') changeLoading!: (status: boolean) => void;

  showForm = false
  form: CategoryItem = this.getDefaultForm()
  formRules = {
    name: [
      { required: true, message: 'Укажите наименование', trigger: 'blur' }
    ]
  }

  mounted () {
    this.changeLoading(true)
    this.getCategories()
    .finally(() => this.changeLoading(false))
  }

  getDefaultForm (): CategoryItem {
    return {
      id: null,
      name: ''
    }
  }

  closedForm () {
    if (this.form.id) this.form = this.getDefaultForm()
  }

  changeFormState (category?: CategoryItem) {
    this.showForm = true;
    if (category) this.form = {
      ...category
    }
  }

  updateCategory () {
    this.formRef.validate((valid) => {
      if (!valid) return;
      this.changeLoading(true)
      Promise.all([
        this.form.id
        ? this.updateCategoryState(this.form)
        : this.addCategoryState({
          name: this.form.name
        })
      ])
      .then(() => {
        this.showForm = false
        this.getDefaultForm()
      })
      .finally(() => {
        this.changeLoading(false)
      })
    })
  }

  deleteCategory (id: number) {
    this.changeLoading(true)
    this.deleteCategoryState({ id })
    .finally(() => {
      this.changeLoading(false)
    })
  }
}
</script>