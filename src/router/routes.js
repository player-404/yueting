import { routerComponent } from './routerComponent'
export const routes = [
  {
    path: '/',
    name: 'music',
    component: routerComponent.music,
    meta: {
      keepAlive: true,
      deep: 1
    }
  },
  {
    path: '/songList',
    name: 'songList',
    component: routerComponent.songList,
  }, {
    path: '/playList',
    name: 'playList',
    component: routerComponent.playList,
    meta: {
      keepAlive: true,
      deep: 2
    }
  },
  {
    path: '/login',
    name: 'login',
    component: routerComponent.login,
    meta: {
      deep: 1
    }
  },
  {
    path: '/singer',
    name: 'singer',
    component: routerComponent.singer,
    meta: {
      deep: 2
    }
  },
  {
    path: '/mine',
    name: 'mine',
    component: routerComponent.mine,
    meta: {
      keepAlive: true,
      deep: 1
    }
  },
  {
    path: '/search',
    name: 'search',
    component: routerComponent.search,
    meta: {
      keepAlive: true,
      deep: 1
    }
  }
]