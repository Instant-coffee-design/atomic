import storeUtils from '@/utils/store'
import LIBRARY from '@/static/library'

export default {
    namespaced: true,
    state: () => ({
        items: {}
    }),
    mutations: {
        updateOne (state, value) {
            state.items = storeUtils.updateOne(state, value)
        },
        deleteOne (state, id) {
            state.items = storeUtils.deleteOne(state, id)
        },
        refresh (state, values) {
            state.items = storeUtils.refresh(values)
        }
    },
    actions: { 
        async fetch ({ commit }, params) {
            try {
                setTimeout(() => {
                    commit('refresh', LIBRARY)
                    return LIBRARY
                }, Math.random() * 5000)
            } catch (e) {
                console.error(e)
                return null
            }
        },
        async create ({ commit }, params) {
            commit('updateOne', {
                ...LIBRARY[Math.round(Math.random() * (LIBRARY.length - 1))],
                _id: Math.random()
            })

            return 'ok'
        },
        async delete ({ commit }, _id) {
            return 'ok'
        }
    },
    getters: {
        items: (state) => {
            return Object.values(state.items).map(item => ({
                ...item
            }))
        },
        find: (state, getters) => search => {
            return getters.items
        },
        findOne: (state, getters) => search => {
            return getters.items[0]
        }
    }
}