<template>
  <div
    class="stuff__item stuff-item"
    @click="goToStuffItem()"
  >
      <!-- window.location.origin -->
    <el-image
      class="stuff-item__logo"
      :src="'https://orch.store' + stuffItem.stuff_link"
    >
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
    <p class="stuff-item__name">
      {{ stuffItem.name }}
    </p>
    <p class="stuff-item__cost">
      {{ stuffItem.cost }}
      {{ '&#8381;' }}
    </p>
    <p class="stuff-item__description">
      {{ stuffItem.description }}
    </p>
    <div class="stuff-item__total">
      <div class="stuff-item__count">
        {{ stuffItem.count_on_warehouse }} шт
      </div>
      <div @click.stop>
        <stuff-actions
          :stuffItem="stuffItem"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { StuffItem } from '~/interfaces/stuff'
import StuffActions from '~/components/StuffActions.vue'

@Component({
  layout: 'main',
  auth: false,
  transition: 'slide-bottom',
  components: {
    StuffActions,
  }
})
export default class Stuff extends Vue {
  @Prop({ required: true }) stuffItem!: StuffItem

  goToStuffItem () {
    this.$router.push(`/stuff/${this.stuffItem.id}`)
  }
}
</script>