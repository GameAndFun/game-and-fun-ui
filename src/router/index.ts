import { createWebHistory, createRouter } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";

const routes = [
  { path: "/", component: HomeView, name: "home" },
  { path: "/about", component: AboutView, name: "about" },
];

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
