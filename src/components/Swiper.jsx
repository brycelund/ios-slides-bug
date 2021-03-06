import { IonSlides } from '@ionic/react'
import React from 'react'
import { motion } from 'framer-motion'

const styles = {
  slider: {
    // padding: '10px 10%',
    // width: '100vw'
  },
  slide: { padding: '4px' },
  cardStyle: {
    backgroundColor: 'white',
    width: '200px',
    height: '200px',
    color: 'black'
  }
}

const GAMES = [
  {
    id: '1',
    name: 'A'
  },
  {
    id: '2',
    name: 'B'
  },
  {
    id: '3',
    name: 'C'
  },
  {
    id: '4',
    name: 'D'
  },
  {
    id: '5',
    name: 'E'
  }
]

export default function ({ history }) {
  const slideOpts = {
    initialSlide: 0,
    // speed: 300,
    // autoplay: 1000,
    loop: true,
    slidesPerView: 2,
    // centeredSlides: true,
    coverflowEffect: {
      rotate: 10,
      stretch: 0.5,
      depth: 600,
      modifier: 1,
      slideShadows: false
    },
    on: {
      beforeInit() {
        const swiper = this

        swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`)
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`)

        swiper.params.watchSlidesProgress = true
        swiper.originalParams.watchSlidesProgress = true
      },
      setTranslate() {
        const swiper = this
        const { width: swiperWidth, height: swiperHeight, slides, $wrapperEl, slidesSizesGrid, $ } = swiper
        const params = swiper.params.coverflowEffect
        const isHorizontal = swiper.isHorizontal()
        const transform$$1 = swiper.translate
        const center = isHorizontal ? -transform$$1 + swiperWidth / 2 : -transform$$1 + swiperHeight / 2
        const rotate = isHorizontal ? params.rotate : -params.rotate
        const translate = params.depth
        // Each slide offset from center
        for (let i = 0, length = slides.length; i < length; i += 1) {
          const $slideEl = slides.eq(i)
          const slideSize = slidesSizesGrid[i]
          const slideOffset = $slideEl[0].swiperSlideOffset
          const offsetMultiplier = ((center - slideOffset - slideSize / 2) / slideSize) * params.modifier

          let rotateY = isHorizontal ? rotate * offsetMultiplier : 0
          let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier
          // var rotateZ = 0
          let translateZ = -translate * Math.abs(offsetMultiplier)

          let translateY = isHorizontal ? 0 : params.stretch * offsetMultiplier
          let translateX = isHorizontal ? params.stretch * offsetMultiplier : 0

          // Fix for ultra small values
          if (Math.abs(translateX) < 0.001) translateX = 0
          if (Math.abs(translateY) < 0.001) translateY = 0
          if (Math.abs(translateZ) < 0.001) translateZ = 0
          if (Math.abs(rotateY) < 0.001) rotateY = 0
          if (Math.abs(rotateX) < 0.001) rotateX = 0

          const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg)`

          $slideEl.transform(slideTransform)
          $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1
          if (params.slideShadows) {
            // Set shadows
            let $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top')
            let $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom')
            if ($shadowBeforeEl.length === 0) {
              $shadowBeforeEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`)
              $slideEl.append($shadowBeforeEl)
            }
            if ($shadowAfterEl.length === 0) {
              $shadowAfterEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`)
              $slideEl.append($shadowAfterEl)
            }
            if ($shadowBeforeEl.length) $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0
            if ($shadowAfterEl.length) $shadowAfterEl[0].style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0
          }
        }

        // Set correct perspective for IE10
        if (swiper.support.pointerEvents || swiper.support.prefixedPointerEvents) {
          const ws = $wrapperEl[0].style
          ws.perspectiveOrigin = `${center}px 50%`
        }
      },
      setTransition(duration) {
        const swiper = this
        swiper.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration)
      }
    }
  }

  return (
    <>
      <IonSlides options={slideOpts} style={styles.slider}>
        {GAMES.map((g) => {
          return (
            <ion-slide style={styles.slide} gameid={g.id} key={g.id}>
              <div>
                <div style={styles.cardStyle}>Card</div>
              </div>
            </ion-slide>
          )
        })}
      </IonSlides>
    </>
  )
}
