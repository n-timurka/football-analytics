import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/teams',
      name: 'teams',
      component: () => import('@/views/TeamsView.vue'),
    },
    {
      path: '/teams/:slug',
      name: 'team',
      component: () => import('@/views/TeamView.vue'),
    },
    {
      path: '/games',
      name: 'games',
      component: () => import('@/views/GamesView.vue'),
    },
    {
      path: '/games/:id',
      name: 'game',
      component: () => import('@/views/GameView.vue'),
    },
    {
      path: '/players/:id',
      name: 'player',
      component: () => import('@/views/PlayerView.vue'),
    },
  ],
})

export default router
