import state from './state'
import mutations from './mutations'

const playBar = {
    namespaced: true,
    state,
    mutations
}
export default playBar;