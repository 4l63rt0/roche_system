<template>
  <v-alert dense dismissible @input="onClose" :value="true" :type=type class="mb-3">
    {{ text }}
  </v-alert>
</template>

<script>
export default {
  props: [
    'text',
    'type'
    ],
  methods: {
    onClose () {
      this.$emit('dismissed')
    }
  }
}
</script>
