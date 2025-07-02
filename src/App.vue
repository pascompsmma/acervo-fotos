<template>
  <div id="app">
    <NavBar />
    <AppHeader />
    <ContentSection />
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import ContentSection from './components/ContentSection.vue'
import AppFooter from './components/AppFooter.vue'
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    AppHeader,
    ContentSection,
    AppFooter
  }
}
</script>