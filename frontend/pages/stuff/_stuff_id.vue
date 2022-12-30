<template>
  <Loading :loading="loading">
    <el-col :span="24">
      <nuxt-link :to="`/`">
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-arrow-left"
          circle
          class="back-btn"
        />
      </nuxt-link>
    </el-col>
    <el-col v-if="stuffItem" class="stuff-id-page">
      <el-image
        class="stuff-id-page__logo"
        :src="'https://orch.store/' + getValueByKey('stuff_link')"
      >
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
      <div class="stuff-id-page__main">
        <h2 class="page__header stuff-id-page__name">{{ getValueByKey('name') || '&mdash;' }}</h2>
        <p class="stuff-id-page__category">{{ getValueByKey('category.name') || '&mdash;' }}</p>
        <p class="stuff-id-page__cost">{{ getValueByKey('cost') }} <span v-html="getRuble()" /></p>
        <p class="stuff-id-page__description">{{ getValueByKey('description') || '&mdash;' }}</p>
        <p class="stuff-id-page__count">{{ getValueByKey('count_on_warehouse') || '&mdash;' }} шт</p>
        <el-col class="stuff-id-page__actions">
          <stuff-actions
            v-if="stuffItem"
            :stuffItem="stuffItem"
          />
        </el-col>
      </div>
    </el-col>
    <el-col v-else>
      <el-empty>
        <el-button
          type="primary"
          size="mini"
          @click="$router.back()"  
        >
          Вернуться назад
        </el-button>
      </el-empty>
    </el-col>
  </Loading>
</template>
<script lang="ts">
import { Vue, Component, Action } from 'nuxt-property-decorator'
import { getRuble, goBack } from '~/utils/helpers'
import StuffActions from '~/components/StuffActions.vue'
import Loading from '~/components/Loading.vue'
import { StuffItem } from '~/interfaces/stuff'
import { get } from 'lodash'

@Component({
  layout: 'main',
  auth: false,
  transition: 'slide-bottom',
  components: {
    StuffActions,
    Loading
  }
})
export default class StuffIdPage extends Vue {

  @Action('stuff/getStuffItem') getStuffItem!: (params: { id: string }) => Promise<StuffItem>

  stuffItem: StuffItem | null = null
  loading = false

  mounted () {
    this.loading = true
    const params = {
      id: this.$route.params.stuff_id
    }
    this.getStuffItem(params)
    .then((response) => {
      this.stuffItem = response
    })
    .finally(() => {
      this.loading = false
    })
  }

  getRuble () {
    return getRuble()
  }

  getValueByKey (key: keyof StuffItem) {
    return get(this.stuffItem, key)
  }
}
</script>