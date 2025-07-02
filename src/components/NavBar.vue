<template>
  <nav
    class="navbar navbar-dark navbar-custom shadow-sm fixed-top"
    :class="{ 'navbar-hide': !showNavbar }"
    style="height: 70px; z-index: 2000; margin: 0; padding: 0;"
  >
    <div class="d-flex justify-content-center align-items-center w-100 gap-4 py-2">
      <a href="#" class="navbar-brand m-0">
        <img :src="logoParoquia" alt="Logo Paróquia" height="50" />
      </a>
      <a href="#" class="navbar-brand m-0">
        <img :src="logoPascom" alt="Logo Pascom" height="50" />
      </a>
    </div>
  </nav>
</template>

<script>
import logoParoquia from '@/assets/img/logo-paroquia.png';
import logoPascom from '@/assets/img/logo-pascom.png';

export default {
  name: 'NavBar',
  data() {
    return {
      logoParoquia,
      logoPascom,
      showNavbar: true,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.checkScrollPosition);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.checkScrollPosition);
  },
  methods: {
    checkScrollPosition() {
      this.showNavbar = window.scrollY <= 100;
    },
  },
};
</script>

<style scoped>
.navbar-brand img {
  object-fit: contain;
}

.navbar-custom {
  background-color: #000000a1;
  transition: top 0.3s ease-in-out;
  position: fixed;
  width: 100%;
  top: 0;
}

.navbar-hide {
  top: -100px;
}
</style>
