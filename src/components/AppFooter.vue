<template>
  <footer class="bg-dark text-lg-start">
    <!-- Copyright -->
    <div class="text-center p-3 text-white" style="background-color: rgba(0, 0, 0, 0.2);">
      © {{ currentYear }}  Desenvolvido por Matheus Ribeiro Barbosa Santos
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  }
}
</script>