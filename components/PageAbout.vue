<template>
  <div class="under_header">
    <h1 class="no_margin">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
.under_header {
  background-color: aqua;
  height: 100px;
  /* padding-top: 28px;
  margin-top: 56px; */
  display: flex;
  align-items: center;
  justify-content: center;
}

.no_margin {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 50%;
  margin-bottom: 0;
  margin: 0;
}
</style>
