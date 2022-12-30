<template>
  <div class="background">
    <div ref="backgroundWrapperRef" class="background-internal-wrapper">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'nuxt-property-decorator'

@Component({})
export default class Background extends Vue {
  
  @Ref('backgroundWrapperRef') backgroundWrapperRef!: HTMLDivElement

  mounted () {
    if (this.backgroundWrapperRef) {
      for (let i = 0; i < 30; i++) {
        const item = document.createElement('div')
        const img = document.createElement('img')
        img.alt = 'orch'
        img.src = i % 2 === 0 ? '/orch.png' : '/orch-anal.png'
        const widthImg = Math.floor(Math.random() * 200)
        img.width = widthImg
        if (widthImg < 100) {
          img.style.filter = 'blur(1px)';
        }
        item.classList.add('background-internal-wrapper__photo')
        item.appendChild(img)
        this.backgroundWrapperRef.appendChild(item)
      }
    }
  }
}
</script>