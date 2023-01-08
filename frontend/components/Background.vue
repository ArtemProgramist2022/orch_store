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
      const max = 70 // if change it change also in background.scss!!!
      const icons: string[] = (require as any).context('~/static/orch-background-icons', false, /png$/).keys().map((icon: string) => icon.replace(/^./, ''))
      for (let i = 1; i <= (max > 10 ? max : 10); i++) {
        const item = document.createElement('div')
        const img = document.createElement('img')
        img.alt = 'orch'
        img.src = '/orch-background-icons' + this.getRandomIconSrc(icons)
        const widthImg = Math.floor(Math.random() * 200)
        img.width = widthImg
        if (widthImg < 100) {
          img.style.filter = 'blur(1px)';
        }
        const leftTranslate = Math.floor(Math.random() * (95 - 2 + 1) + 2)
        item.style.setProperty('left', leftTranslate + 'vw')
        item.classList.add('background-internal-wrapper__photo')
        item.appendChild(img)
        this.backgroundWrapperRef.appendChild(item)
      }
    }
  }

  getRandomIconSrc (icons: string[]) {
    return icons[Math.floor(Math.random() * (icons.length))]
  }
}
</script>