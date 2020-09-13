<template>
  <div>
    <v-file-input type="file" accept="image/*" @change="onFilePicked" :label=getLabelText></v-file-input>
    <v-img :src="imageUrl" width="275px"></v-img>
  </div>
</template>

<script>
export default {
  props: [
    'myLabel'
  ],
  data() {
    return {
      imageUrl: "",
      labelText: "",
      image: null
    }
  },
  computed: {
    getLabelText() {
      if (!this.myLabel) {
        return "Add Picture"
      } else {
        return this.myLabel
      }
    }
  },
  methods: {
    onFilePicked (event) {
      const files = event
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files)
      this.$emit('childImage', event)
    }
  }
}
</script>