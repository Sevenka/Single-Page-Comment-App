<template>
  <main id="app" class="md-layout">
    <md-content class="md-layout-item md-layout comments">
      <div class="md-layout">
        <div class="md-layout-item md-layout md-elevation-4 comments__header">
          <md-button
            class="md-raised md-primary"
            @click="setFormMode(true)">
            New Message
          </md-button>

          <span class="md-subheading comments__heading">Messages</span>
        </div>

        <CommentsList
          :setFormMode="setFormMode"/>
      </div>
    </md-content>

    <div class="md-layout-item">
      <CommentsForm
        v-if="showForm"
        :isEdit="isEdit"
        :showMessage="showMessage"
        :setFormMode="setFormMode"/>
    </div>

    <md-snackbar
      md-position="center"
      :md-active.sync="message.show"
      md-persistent>
      {{ message.text }}
    </md-snackbar>
  </main>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import CommentsList from './components/CommentsList.vue'
import CommentsForm from './components/CommentsForm.vue'

export default {
  name: 'app',

  components: {
    CommentsList,
    CommentsForm
  },

  data: () => ({
    showForm: false,
    isEdit: false,
    message: {
      show: false,
      text: ''
    }
  }),

  computed: {
    ...mapState({
      comments: state => state.comments
    })
  },

  methods: {
    ...mapActions(['fetchComments']),

    ...mapMutations(['resetFormData']),

    showMessage (message) {
      this.message.show = true
      this.message.text = message
    },

    setFormMode (visibility, mode) {
      this.showForm = visibility
      this.isEdit = mode
      if (!mode) this.resetFormData()
    }
  },

  beforeMount () {
    this.fetchComments()
  }
}
</script>

<style>
  body {
    overflow-y: hidden;
  }

  .spinner {
    display: flex;
    justify-content: center;
    margin: 24px 0;
  }

  .comments__header {
    position: fixed;
    width: 50%;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    background-color: #fff;
    z-index: 2;
  }

  .comments__heading {
    align-self: left;
  }

  .comments__list {
    height: 100vh;
    width: 100%;
    margin-top: 104px;
    overflow-y: auto;
  }
</style>