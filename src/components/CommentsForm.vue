<template>
  <div class="form">
    <md-field>
      <label>Name</label>

      <md-input
        v-model="author"
        :disabled="sendingForm"/>
    </md-field>

    <md-field>
      <label>Message</label>

      <md-textarea
        v-model="text"
        :disabled="sendingForm"/>
    </md-field>

    <div
      class="form__errors"
      v-show="errors.length">
      Please correct the following error(s):

      <p
        v-for="error in errors"
        :key="error">
        {{ error }}
      </p>
    </div>

    <div
      class="form__buttons"
      v-if="isEdit">
      <md-button
        class="md-raised md-accent"
        @click="onDeleteComment"
        :disabled="sendingForm">
        Delete
      </md-button>

      <md-button
        class="md-raised md-primary"
        @click="onUpdateComment"
        :disabled="sendingForm">
        Save
      </md-button>
    </div>

    <div
      class="form__buttons"
      v-else>
      <md-button
        class="md-raised"
        @click="setFormMode(false, false)"
        :disabled="sendingForm">
        Cancel
      </md-button>

      <md-button
        class="md-raised md-primary"
        @click="onSendComment"
        :disabled="sendingForm">
        Send
      </md-button>
    </div>

    <div
      v-if="sendingForm"
      class="spinner">
      <md-progress-spinner md-mode="indeterminate"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import axios from 'axios'

export default {
  name: 'CommentsForm',

  props: [
    'isEdit',
    'showMessage',
    'setFormMode'
  ],

  data: () => ({
    errors: []
  }),

  computed: {
    ...mapState({
      form: state => state.comments.form,
      sendingForm: state => state.comments.sendingForm
    }),

    author: {
      get () {
        this.errors = []
        return this.form.author
      },

      set (value) {
        this.setFormData({ key: 'author', value: value })
      }
    },

    text: {
      get () {
        this.errors = []
        return this.form.text
      },

      set (value) {
        this.setFormData({ key: 'text', value: value })
      }
    }
  },

  methods: {
    ...mapMutations([
      'setFormData'
    ]),

    ...mapActions([
      'sendComment',
      'updateComment',
      'deleteComment'
    ]),

    validateForm () {
      this.errors = []
      if (!this.author) this.errors.push('Name required.')
      if (!this.text) this.errors.push('Message required.')
      if (this.author.length === 1) this.errors.push('Name is too short.')
      if (this.author[0] === ' ') this.errors.push('Name can\'t start with a space.')
      if (this.text[0] === ' ') this.errors.push('Message can\'t start with a space.')
      if (this.author && this.text && !this.errors.length) return true
      return false
    },

    onSendComment () {
      if (this.validateForm()) {
        this.sendComment()
            .then(r => {
              this.showMessage('A comment was successfully added')
              this.setFormMode(false, false)
            })
            .catch(err => {
              this.showMessage('An error occured while adding a comment')
              this.setFormMode(false, false)
            })
      }
    },

    onUpdateComment () {
      if (this.validateForm()) {
        this.updateComment()
            .then(r => {
              this.showMessage('A comment was successfully updated')
              this.setFormMode(false, false)
            })
            .catch(err => {
              this.showMessage('An error occured while updating a comment')
              this.setFormMode(false, false)
            })
      }
      
    },

    onDeleteComment () {
      if (this.validateForm()) {
        this.deleteComment()
          .then(r => {
            this.showMessage('A comment was successfully deleted')
            this.setFormMode(false, false)
          })
          .catch(err => {
            this.showMessage('An error occured while deleting a comment')
            this.setFormMode(false, false)
          })
      }
    }
  }
}
</script>

<style scoped>
  .form {
    padding: 16px;
  }

  .form__buttons {
    display: flex;
    justify-content: flex-end;
    margin-right: -8px;
  }

  .form__errors {
    color: red;
  }
</style>