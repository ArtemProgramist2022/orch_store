<template>
    <el-container>
        <el-button type="text" @click="dialogVisible = true">Добавить товар</el-button>

        <el-dialog
        title="Tips"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-position="top"
      size="small"
    >
    <el-form-item
        label="Название"
        prop="name"
      >
        <el-input
          v-model="form.name"
          type="text"
          autosize
        />
      </el-form-item>
      <el-form-item
        label="Описание"
        prop="description"
      >
        <el-input
          v-model="form.description"
          type="textarea"
          autosize
        />
      </el-form-item>
      <el-form-item label="Категория">
        <el-select
          v-model="form.category_id"
          style="width: 100%;"
        >
          <el-option
            v-for="item in categories"
            :key="`${item.id}`"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Фото">
        <div class="post-form__upload-btn">
          <input
            ref="file"
            style="display: none"
            type="file"
            accept=".jpg, .jpeg, .png"
            multiple
            @change="handleFileUpload"
          />
          <el-button
            size="mini"
            icon="el-icon-upload"
            type="primary"
            round
            plain
            @click="fileRef.click()"
          >
            Загрузить Фото
          </el-button>
        </div>
        <transition name="slide-top">
          <div
            v-if="form.photo"
            class="post-form__upload-preview"
          >
            
            <el-image
              v-if="form.photo.length"
              class="post-form__upload-image"
              :src="form.photo"
            />
          </div>
        </transition>
      </el-form-item>
    </el-form>

        </el-dialog>
        <el-card v-for="stuff in stuffItems" :key="stuff.id">
            {{stuff.name}}
        </el-card>
    </el-container>
</template>
<script lang="ts">
import { Vue, Getter, Action, Component, Ref, Emit } from "nuxt-property-decorator";
import { INewStuff, IStuff, IStuffGetParams } from "@/interfaces/stuff";
import { ElForm } from "element-ui/types/form";
import { ICategory } from "~/interfaces/categories";


@Component({
    
})
export default class AdminStuffTab extends Vue {
    @Action('stuff/fetchStuff') fetchStuff: any
    @Action('stuff/addStuffItem') addStuffItem: any
    @Action('categories/fetchCategories') fetchCategories: any

    @Getter('stuff/items') stuffItems?: Array<IStuff>
    @Getter('stuff/limit') stuffLimit?: Number
    @Getter('stuff/total') stuffTotal?: Number
    @Getter('stuff/page') stuffPage?: Number
    @Getter('categories/data') categories?: Array<ICategory>


    @Ref('form') formRef!: ElForm
    @Ref('file') fileRef!: HTMLInputElement

    @Emit()
    onSuccess(){}

    form: INewStuff = {
        name: '',
        description: '',
        cost: 0.00,
        count_on_warehouse: 0,
        category_id: 0,
        photo: ''
    }

    rules = {
        name: [{ required: true, message: 'Это поле обязательно', trigger: 'blur'}],
        description: [{ required: true, message: 'Это поле обязательно', trigger: 'blur'}],
        cost: [{ required: true, message: 'Это поле обязательно', trigger: 'blur'}],
        count_on_warehouse: [{ required: true, message: 'Это поле обязательно', trigger: 'blur'}],
        category_id: [{ required: true, message: 'Это поле обязательно', trigger: 'blur'}],
        photo: [{ required: true, message: 'Это поле обязательно', trigger: 'blur'}]

    }

    handleFileUpload(){
        if (this.fileRef.files){
            const reader = new FileReader()
            reader.onloadend = () => {
                this.form.photo = String(reader.result)
            }
            reader.readAsDataURL(this.fileRef.files[0])
        }
    }
    fileList = []

    dialogVisible = false

    handleClose() {
        this.dialogVisible = false
      }

    async fetch(){
        await this.fetchStuff()
    }

    handleRemove(file: any, fileList: any) {
        console.log(file, fileList);
      }
      handlePreview(file: any) {
        console.log(file);
      }
      handleExceed(files: any, fileList: any) {
        this.$message.warning(`The limit is 3, you selected ${files.length} files this time, add up to ${files.length + fileList.length} totally`);
      }
      beforeRemove(file: any, fileList: any) {
        return this.$confirm(`Cancel the transfert of ${ file.name } ?`);
      }
}

</script>
<style>
</style>