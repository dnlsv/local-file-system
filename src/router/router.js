import { createRouter, createWebHistory } from "vue-router";
import Registration from "../views/Registration.vue";
import Login from "../views/Login.vue";
import File from "../views/File.vue";

const routes = [
    {
        path: "/",
        name: "Login",
        component: Login,
    },
    {
        path: "/registration",
        name: "Registration",
        component: Registration,
    },
    {
        path: "/file",
        name: "File",
        component: File,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
