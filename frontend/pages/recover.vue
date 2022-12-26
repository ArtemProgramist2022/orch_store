<template>
  <div>RECOVER</div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  layout: 'auth',
  auth: 'guest',
  transition: 'slide-bottom'
})
export default class RecoverPage extends Vue {}
</script>