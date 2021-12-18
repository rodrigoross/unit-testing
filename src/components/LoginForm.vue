<template>
  <form @submit.prevent="onSubmit">
      <!-- Seguindo as boas praticas foi inserido um atributo data-testid no elemento de input. -->
    <input type="text" v-model="name" data-testid="name-input"/>
    <button type="submit">Submit</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      name: ''
    }
  },
  methods: {
    onSubmit() {
      this.$emit('formSubmitted', { name: this.name })
    }
  }
}
</script>