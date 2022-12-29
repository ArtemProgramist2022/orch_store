<template>
  <div>
    <el-table
      :data="stuff"
      v-loading="loading"
      class="table-with-overflow-only-body-max-height"
    >
      <el-table-column>
        <template slot-scope="scope">
          <el-image
            style="width: 125px; height: 100px"
            :src="'https://orch.store/' + scope.row.stuff_link" 
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="Наименование"
      />
      <el-table-column
        prop="description"
        label="Описание"
      />
      <el-table-column
        prop="count_on_warehouse"
        label="Стоимость"
      />
      <el-table-column
        prop="cost"
        label="Кол-во на складе"
      />
      <el-table-column
        prop="category"
        label="Категория"
      >
        <template slot-scope="scope">
          {{ getCategory(scope.row) || '&mdash;' }}
        </template>
      </el-table-column>
      <el-table-column
        width="100"
        align="right"
      >
        <template slot-scope="scope">
          <el-popconfirm
            title="Подтвердите удаление"
            confirm-button-type="danger"
            confirm-button-text="Удалить"
            @confirm="deleteItem(scope.row.id)"
          >
            <el-button
              slot="reference"
              type="danger"
              icon="el-icon-delete"
              size="mini"
            />
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" style="text-align: right; margin-top: 6px">
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-plus"
        @click="changeFormState"
        :disabled="loading"
      >
        Создать товар
      </el-button>
    </el-col>
    <div style="margin-top: 16px">
      <pagination
        :currentPage="page"
        :total="total"
        :limit="limit"
        @change-page="changePage"
      />
    </div>
    <el-dialog
      title="Новый товар"
      :visible.sync="showForm"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="formRules"
        size="mini"
        label-position="top"
        @submit.prevent.native="updateStuff()"
        v-loading="formLoading"
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
        <el-form-item
          prop="description"
          label="Описание"
        >
          <el-input
            v-model="form.description"
            placeholder="Укажите описание"
          />
        </el-form-item>
        <el-form-item
          prop="cost"
          label="Стоимость"
        >
          <el-input-number
            v-model="form.cost"
            placeholder="Укажите стоимость"
          />
        </el-form-item>
        <el-form-item
          prop="count_on_warehouse"
          label="Кол-во на складе"
        >
          <el-input-number
            v-model="form.count_on_warehouse"
            :min="1"
            placeholder="Укажите кол-во штук на складе"
          />
        </el-form-item>
        <el-form-item
          prop="category_id"
          label="Категория"
        >
          <el-select
            v-model="form.category_id"
            filterable
            placeholder="Укажите категорию"
          >
            <el-option
              v-for="item in categories"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          prop="photo"
          label="Фото"
        >
          <el-upload
            class="photo-uploader"
            action="#"
            :show-file-list="false"
            :on-success="successUploadPhoto"
            :before-upload="uploadPhoto"
            accept=".jpeg, .jpg, .png"
          >
            <img v-if="photo" :src="photo" class="photo-upload">
            <i v-else class="el-icon-plus photo-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <div class="flex-center">
            <el-button
              type="primary"
              native-type="submit"
            >
              Создать
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
import { ElUploadInternalFileDetail } from 'element-ui/types/upload';
import { Component, Vue, Getter, Action, Ref } from 'nuxt-property-decorator'
import { CategoryItem } from '~/interfaces/categories';
import { GetParams } from '~/interfaces/common';
import { ListResponse } from '~/interfaces/responses';
import { NewStuffItem, StuffItem } from '~/interfaces/stuff';
import getBase64 from '~/utils/base64'
import Pagination from '~/components/Pagination.vue'

@Component({
  layout: 'admin',
  auth: true,
  transition: 'slide-bottom',
  components: {
    Pagination
  }
})
export default class StuffAdminIndex extends Vue {

  @Ref('form') formRef!: ElForm

  @Getter('stuff/items') stuff!: StuffItem[]
  @Getter('stuff/total') total!: number
  @Getter('stuff/limit') limit!: number
  @Getter('stuff/page') page!: number

  @Getter('categories/items') categories!: CategoryItem[]

  @Action('stuff/getStuff') getStuff!: (params?: Partial<GetParams> & { category_id?: string }) => Promise<ListResponse<StuffItem>>;
  @Action('stuff/addStuff') addStuff!: (params: Omit<StuffItem, 'id'>) => Promise<StuffItem>;
  @Action('stuff/deleteStuff') deleteStuff!: (params: Pick<StuffItem, 'id'>) => Promise<StuffItem>;

  @Action('categories/getCategories') getCategories!: () => Promise<CategoryItem[]>;

  loading = false
  formLoading = false
  showForm = false
  form: NewStuffItem = this.getDefaultForm()
  formRules = {
    name: [
      { required: true, message: 'Укажите наименование', trigger: 'blur' }
    ],
    description: [
      { required: true, message: 'Укажите описание', trigger: 'blur' }
    ],
    cost: [
      { required: true, message: 'Укажите стоимость', trigger: 'blur' }
    ],
    count_on_warehouse: [
      { required: true, message: 'Укажите кол-во штук на складе', trigger: 'blur' }
    ],
    category_id: [
      { required: true, message: 'Укажите категорию', trigger: 'blur' }
    ]
  }
  photo = ''

  mounted () {
    this.loading = true
    this.getStuff()
    .finally(() => this.loading = false)
  }

  getDefaultForm () {
    return {
      name: '',
      description: '',
      cost: 0,
      count_on_warehouse: 0,
      category_id: null
    }
  }

  changePage (page: number) {
    this.getStuff({
      page
    })
  }

  updateStuff () {
    this.formRef.validate((valid) => {
      if (!valid) return
      this.formLoading = true
      this.loading = true
      this.addStuff(this.form)
      .then(() => {
        this.form = this.getDefaultForm()
      })
      .finally(() => {
        this.formLoading = false
        this.loading = false
        this.showForm = false
      })
    })
  }

  changeFormState () {
    this.formLoading = true
    this.showForm = true
    this.getCategories()
    .finally(() => this.formLoading = false)
  }

  successUploadPhoto (_res: any, file: ElUploadInternalFileDetail) { // interface
    this.photo = URL.createObjectURL(file.raw);
  }

  uploadPhoto (file: File) {
    getBase64(file)
    .then((response) => {
      if (typeof response !== 'string') return
      const result = response
      result.replace('data:image/jpeg;base64,', '')
      this.form.photo = result
    })
  }

  deleteItem (id: number) {
    this.loading = true
    this.deleteStuff({ id })
    .finally(() => this.loading = false)
  }

  getCategory (item: StuffItem) {
    return item.category?.name
  }
}
</script>