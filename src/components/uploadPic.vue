<template>
    <div>
        <v-file-input 
            type="file"
            accept="image/*"
            @change="onFilePicked"
            label="Add Picture" 
            >
        </v-file-input>
        <v-img 
            :src="imageUrl"
            width="275px"
            >
        </v-img>
    </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: '',
      image: null
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