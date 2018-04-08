<template>
  <md-content class="md-scrollbar comments__list">
    <div
      v-if="sendingList"
      class="spinner">
      <md-progress-spinner md-mode="indeterminate"/>
    </div>

    <md-card
      v-for="comment in comments"
      :key="comment.id">
      <div @click="showComment(comment.id)">
        <md-ripple>
          <md-card-header>
            <div class="md-title">{{ comment.author }}</div>
          </md-card-header>

          <md-card-content>{{ comment.text }}</md-card-content>
        </md-ripple>
      </div>
    </md-card>
  </md-content>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'CommentsList',

  props: ['setFormMode'],

  computed: {
    ...mapState({
      comments: state => state.comments.comments,
      sendingList: state => state.comments.sendingList
    })
  },

  methods: {
    ...mapMutations(['setFormData']),

    showComment (id) {
      // no need to use a new ajax request for getting single comment, if we have not too much of them
      let comment = this.comments.find((comment) => comment.id === id)
      for (let property in comment) {
        this.setFormData({ key: property, value: comment[property] })
      }
      this.setFormMode(true, true)
    }
  }
}
</script>