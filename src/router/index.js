import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Login',
            component: () => import('../views/Login.vue')
        },
        {
            path: '/Inicio',
            name: 'Inicio',
            component: () => import('../views/Chats.vue'),
            children: [
                {
                    path: '/Grupos/:chatId',
                    name: 'Grupos',
                    component: () => import('../views/Grupos.vue')
                },
                {
                    path: '/Chatear',
                    name: 'Chatear',
                    component: () => import('../views/Chatear.vue')
                }
            ]
        }
    ]
})

export default router
