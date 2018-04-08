import axios from 'axios'

const state = {
  comments: [],
  sendingList: false,
  sendingForm: false,
  form: {
    author: '',
    text: '',
    id: ''
  }
}

const actions = {
  fetchComments ({ state, commit }) {
    commit('setSendingListState', true)
    return axios.get('http://comments.stage.itsvit.org/api/comments')
                .then(r => {
                  commit('setComments', Object.keys(r.data).map(i => r.data[i]))
                  commit('setSendingListState', false)
                })
                .catch(err => {
                  commit('setSendingListState', false)
                  throw err
                })
  },

  sendComment ({ state, commit, dispatch }) {
    commit('setSendingFormState', true)
    return axios.post('http://comments.stage.itsvit.org/api/comments', state.form)
                .then(r => {
                  dispatch('fetchComments')
                  commit('resetFormData')
                  commit('setSendingFormState', false)
                })
                .catch(err => {
                  commit('setSendingFormState', false)
                  throw err
                })
  },

  updateComment ({ state, commit, dispatch }) {
    commit('setSendingFormState', true)
    return axios.put(`http://comments.stage.itsvit.org/api/comments/${state.form.id}`, state.form)
                .then(r => {
                  dispatch('fetchComments')
                  commit('resetFormData')
                  commit('setSendingFormState', false)
                })
                .catch(err => {
                  commit('setSendingFormState', false)
                  throw err
                })
  },

  deleteComment ({ state, commit, dispatch }) {
    commit('setSendingFormState', true)
    return axios.delete(`http://comments.stage.itsvit.org/api/comments/${state.form.id}`)
                .then(r => {
                  dispatch('fetchComments')
                  commit('resetFormData')
                  commit('setSendingFormState', false)
                })
                .catch(err => {
                  commit('setSendingFormState', false)
                  throw err
                })
  }
}

const mutations = {
  setSendingListState (state, sending) {
    state.sendingList = sending
  },

  setSendingFormState (state, sending) {
    state.sendingForm = sending
  },

  setComments (state, comments) {
    state.comments = comments
    // removing success property, which is always in data object
    let index = state.comments.findIndex((comment) => comment.hasOwnProperty('success'))
    state.comments.splice(index, 1)
  },

  setFormData (state, { key, value }) {
    state.form[key] = value
  },

  resetFormData (state) {
    state.form = {
      author: '',
      text: '',
      id: ''
    }
  }
}

export default {
  state,
  actions,
  mutations
}