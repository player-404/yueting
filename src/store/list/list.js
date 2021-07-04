import state from './state'
import mutations from './mutations'
import actions from './actions'
const list = {
    namespaced: true,
    state,
    mutations,
    actions
}
export default list;