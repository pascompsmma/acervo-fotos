<template>
  <header>
    <div
      id="introCarousel"
      class="carousel slide carousel-fade shadow-2-strong"
      data-mdb-carousel-init
      data-mdb-ride="carousel"
    >
      <!-- Indicadores -->
      <div class="carousel-indicators" v-if="slides.length">
        <button
          v-for="(slide, index) in slides"
          :key="'indicator-' + index"
          type="button"
          data-mdb-target="#introCarousel"
          :data-mdb-slide-to="index"
          :class="{ active: index === 0 }"
          :aria-label="`Slide ${index + 1}`"
        ></button>
      </div>

      <!-- Slides -->
      <div class="carousel-inner" v-if="slides.length">
        <div
          class="carousel-item"
          v-for="(slide, index) in slides"
          :key="'slide-' + index"
          :class="{ active: index === 0 }"
        >
          <div
            class="view carousel-image d-flex align-items-center justify-content-center"
            :style="{ backgroundImage: `url(${slide.capa})` }"
          >
            <div
              class="mask h-100 w-100 d-flex justify-content-center align-items-center text-white text-center"
              :style="{ background: slide.mask || 'rgba(0,0,0,0.4)' }"
            >
              <div class="p-4 bg-dark bg-opacity-50 rounded text-wrap text-break text-center" style="max-width: 800px;">
                <h1 v-if="slide.titulo" class="display-5 fw-bold mb-3">
                  {{ slide.titulo }}
                </h1>
                <p v-if="slide.descricao" class="lead mb-0">
                  {{ slide.descricao }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Controles -->
      <a class="carousel-control-prev" href="#introCarousel" role="button" data-mdb-slide="prev">
        <span aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 16 16">
            <path
              fill-rule="evenodd"
              d="M11.354 1.646a.5.5 0 0 0-.708 0L4.793 7l5.853 5.354a.5.5 0 0 0 .708-.708L6.207 7l5.147-4.646a.5.5 0 0 0 0-.708z"
            />
          </svg>
        </span>
        <span class="visually-hidden">Anterior</span>
      </a>
      <a class="carousel-control-next" href="#introCarousel" role="button" data-mdb-slide="next">
        <span aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 16 16">
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0L11.207 7l-5.853 5.354a.5.5 0 0 1-.708-.708L9.793 7 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </span>
        <span class="visually-hidden">Próximo</span>
      </a>
    </div>
  </header>
</template>

<script>
/* global mdb */
export default {
  name: 'AppHeader',
  data() {
    return {
      slides: [],
    };
  },
  mounted() {
    fetch('./slides.json')
      .then((res) => res.json())
      .then((data) => {
        this.slides = data;
        this.$nextTick(() => {
          setTimeout(() => {
            const carouselEl = document.querySelector('#introCarousel');
            if (carouselEl) {
              new mdb.Carousel(carouselEl, {
                interval: 5000,
                ride: 'carousel',
              });
            }
          }, 100);
        });
      })
      .catch((err) => console.error('Erro ao carregar slides:', err));
  },
};
</script>

<style scoped>
.header{
  padding-top: 70px;
}

.carousel-image {
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.carousel-control-prev,
.carousel-control-next {
  width: 5%;
  z-index: 10;
}

.carousel-control-prev svg,
.carousel-control-next svg {
  filter: drop-shadow(1px 1px 3px #000);
}

.carousel-inner .mask {
  padding: 2rem;
  z-index: 15;
  position: relative;
}
</style>
