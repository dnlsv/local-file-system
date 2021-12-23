import { createRouter, createWebHistory } from "vue-router";
import Registration from "../views/Registration.vue"
import Login from "../views/Login.vue"

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
