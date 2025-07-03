import App from "./App.vue";
import router from "./router";
import { createApp } from "vue";
import { createPinia } from "pinia";
import "devextreme/dist/css/dx.material.teal.dark.css";

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount("#app");
