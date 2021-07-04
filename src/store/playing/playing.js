import state from './state'
import mutations from './mutations'

const playing = {
    namespaced: true,
    state,
    mutations
}

export default playing;