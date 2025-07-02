<template>
  <main class="mt-5">
    <div class="container">
      <section class="text-center">
        <h4 class="mb-4"><strong>Álbuns</strong></h4>

        <!-- Filtros -->
        <div class="row mb-4 justify-content-center gy-2">
          <div class="col-md-3">
            <input
              v-model="filtroBusca"
              type="text"
              class="form-control"
              placeholder="Buscar por título..."
            />
          </div>
          <div class="col-md-2">
            <select v-model="filtroAno" class="form-select">
              <option value="">Todos os anos</option>
              <option v-for="ano in anosDisponiveis" :key="ano" :value="ano">{{ ano }}</option>
            </select>
          </div>
          <div class="col-md-3">
            <select v-model="filtroTag" class="form-select">
              <option value="">Todas as tags</option>
              <option v-for="tag in tagsDisponiveis" :key="tag" :value="tag">{{ tag }}</option>
            </select>
          </div>
        </div>

        <!-- Álbuns -->
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          <div class="col" v-for="(album, index) in albunsVisiveis" :key="index">
            <transition name="fade" appear>
              <div class="card h-100 shadow-sm">
                <div class="bg-image hover-overlay" data-mdb-ripple-init data-mdb-ripple-color="light">
                  <img :src="album.capa" class="album-cover" :alt="album.titulo" />
                  <a :href="album.link" target="_blank">
                    <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
                  </a>
                </div>
                <div class="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 class="card-title">{{ album.titulo }}</h5>
                    <p class="text-muted mb-2">{{ album.data }}</p>
                    <div v-if="album.tags.length">
                      <span
                        class="badge me-1"
                        :class="classeTag(tag)"
                        v-for="(tag, i) in album.tags"
                        :key="i"
                      >
                        {{ tag }}
                      </span>
                    </div>
                  </div>
                  <a
                    :href="album.link"
                    target="_blank"
                    class="btn btn-primary mt-3"
                    data-mdb-ripple-init
                  >
                    Ver Álbum
                  </a>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <!-- Loader -->
        <div v-if="carregando" class="my-4">
          <div class="spinner-border text-primary" role="status"></div>
        </div>

        <!-- Todos carregados -->
        <div
          v-if="!carregando && albunsVisiveis.length >= albunsFiltrados.length"
          class="text-muted mt-4"
        >
          Todos os álbuns foram carregados. 📸
        </div>
      </section>
    </div>
  </main>
</template>

<script>
export default {
  name: 'ContentSection',
  data() {
    return {
      albuns: [],
      visiveis: 6,
      incremento: 6,
      carregando: false,
      filtroBusca: '',
      filtroAno: '',
      filtroTag: '',
    };
  },
  computed: {
    albunsFiltrados() {
      return this.albuns.filter((album) => {
        const busca = this.filtroBusca.toLowerCase();
        const tituloMatch = album.titulo.toLowerCase().includes(busca);

        const anoAlbum = album.data?.split('/')?.[2] || '';
        const anoMatch = this.filtroAno ? anoAlbum === this.filtroAno : true;

        const tagMatch = this.filtroTag
          ? album.tags.includes(this.filtroTag)
          : true;

        return tituloMatch && anoMatch && tagMatch;
      });
    },
    albunsVisiveis() {
      return this.albunsFiltrados.slice(0, this.visiveis);
    },
    anosDisponiveis() {
      const anos = new Set();
      this.albuns.forEach((album) => {
        const ano = album.data?.split('/')?.[2];
        if (ano) anos.add(ano);
      });
      return Array.from(anos).sort((a, b) => b - a);
    },
    tagsDisponiveis() {
      const tags = new Set();
      this.albuns.forEach((album) => {
        album.tags.forEach((tag) => tags.add(tag));
      });
      return Array.from(tags).sort();
    },
  },
  methods: {
    onScroll() {
      const fimPagina =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (
        fimPagina &&
        this.visiveis < this.albunsFiltrados.length &&
        !this.carregando
      ) {
        this.carregando = true;
        setTimeout(() => {
          this.visiveis += this.incremento;
          this.carregando = false;
        }, 600);
      }
    },
    classeTag(tag) {
      const map = {
        "Santo Expedito": 'bg-santo-expedito',
        "Santa Margarida": 'bg-santa-margarida',
        "Santa Rita": 'bg-santa-rita',
        "Solenidade" :'bg-solenidade',
        "Comunidades Missionárias": 'bg-comunidades-missionarias',
        "Festa": 'bg-festa',
        "Festa Social": 'bg-festa-social',
        "Batismo": 'bg-comunidades-missionarias'
      };
      return map[tag] || 'bg-secondary';
    },
  },
  watch: {
    filtroBusca() {
      this.visiveis = this.incremento;
    },
    filtroAno() {
      this.visiveis = this.incremento;
    },
    filtroTag() {
      this.visiveis = this.incremento;
    },
  },
  mounted() {
    fetch('./albuns.json')
      .then((res) => res.json())
      .then((data) => {
        this.albuns = data.sort((a, b) => {
          const dataA = new Date(a.data.split('/').reverse().join('-'));
          const dataB = new Date(b.data.split('/').reverse().join('-'));
          return dataB - dataA;
        });
      })
      .catch((err) => console.error('Erro ao carregar os álbuns:', err));

    window.addEventListener('scroll', this.onScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  },
};
</script>

<style scoped>
.album-cover {
  width: 100%;
  height: 250px;
  object-fit: cover;
  object-position: center;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

.fade-enter-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from {
  opacity: 0;
}

.bg-santa-rita {
  background-color: #f5e896;
   color: #000;
}
.bg-santo-expedito {
  background-color: #0f4f07;
}
.bg-santa-margarida{
  background-color: #c07710;
 
}
.bg-solenidade{
  background-color: #584f11;
}

.bg-comunidades-missionarias{
  background-color: #08084f;
}

.bg-festa{
  background-color: #7b0c0c;
}

.bg-batismo{
  background-color: #1b7c9d;
}

.bg-festa-social{
  background-color: #000000;
}
</style>
