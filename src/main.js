// main.js
import { createApp } from 'vue'
import App from './App.vue'

// Importa CSS e JS do MDB UI Kit
import 'mdb-ui-kit/css/mdb.min.css'
import * as mdb from 'mdb-ui-kit'

import './assets/main.css' 

// Torna o MDB global para os componentes
window.mdb = mdb

createApp(App).mount('#app')