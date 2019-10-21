<template>
  <div class="header">
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav4"
        aria-controls="navbarNav4"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div id="navbarSupportedContent" class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active border-right border-left border-info">
            <nuxt-link to="/" class="nav-link">&nbsp;Home&nbsp;</nuxt-link>
          </li>
          <li class="nav-item active border-right border-info">
            <nuxt-link to="/about" class="nav-link">&nbsp;About&nbsp;</nuxt-link>
          </li>
          <li class="nav-item active border-right border-info">
            <nuxt-link to="/work" class="nav-link">&nbsp;Works&nbsp;</nuxt-link>
          </li>
          <li class="nav-item active border-right border-info">
            <nuxt-link to="/skill" class="nav-link">&nbsp;Skills&nbsp;</nuxt-link>
          </li>
        </ul>
      </div>
      <!-- <form class="form-inline my-2 my-lg-0" action="/search" method="get">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          name="search"
        />
        <button class="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
      </form>-->
    </nav>
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
.header {
  clear: both;
  width: 100%;
  height: 56px;
  background-color: aquamarine;
}
</style>
