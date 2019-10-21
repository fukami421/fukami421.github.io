<template>
  <div>
    <h1 class="text-center">{{ $route.params.id }}</h1>
    <hr class="line" align="center" color="black">
  </div>
</template>

<script>
export default {
  props: {
    workTitle: {
      type: String,
      default: 'f'
    }
  }
}
</script>

<style>
.line {
  width: 100%;
}
</style>
