import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vuetify/styles'; // Import Vuetify styles
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import naive from "naive-ui";


const vuetify = createVuetify({
    components,
    directives,
  });


createApp(App).use(store).use(router).use(vuetify).use(naive)
.mount('#app')
