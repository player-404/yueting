class RouterComponent {
    music() {
        return import('../views/music/Music.vue');
    }
    songList() {
        return import('../views/songList/SongList.vue')
    }
    login() {
        return import('../views/Login.vue')
    }
    playList() {
        return import('../views/playList/PlayList.vue')
    }
    singer() {
        return import('../views/singer/Singer.vue');
    }
    mine() {
        return import('../views/mine/Mine.vue')
    }
    search() {
        return import('../views/search/Search.vue')
    }
}

export const routerComponent = new RouterComponent();