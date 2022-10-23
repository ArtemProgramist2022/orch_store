<template />

<script lang="ts">
import { Component, Vue, Action, Getter } from 'nuxt-property-decorator'
import { IStuff } from '~/interfaces/stuff'

@Component({
  props: {
    category_id: {
      type: Number
    }
  }

})
export default class StuffPage extends Vue {
    @Getter('stuff/items') stuff_items!: Array<IStuff>
    @Action('stuff/fetchStuff') fetchStuff: any

    async fetch () {
      try {
        await this.fetchStuff({
          category_id: this.$props.category_id
        })
      } catch (error) {}
    }
}

</script>

<style>
</style>
