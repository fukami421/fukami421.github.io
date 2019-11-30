<template>
  <div class="footer">
    <p class="content">Copyright © 2019 Ryuichi Fukami. All Rights Reserved.</p>
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
.footer {
  clear: both;
  width: 100%;
  height: 7vh;
  background-color: aquamarine;
  bottom: 0%;
}

.content {
  display: flex;
  align-items: center;
  justify-content: left;
  padding-left: 5%;
  height: 100%;
  font-size: 1em;
  margin-bottom: 0;
}
</style>
