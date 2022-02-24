<template lang="pug">
  .example {{ msg }}
  //  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello Vue Component'
    }
  }
}
</script>

<style lang="scss" scoped>
.example {
  font-weight: bold;
}
</style>