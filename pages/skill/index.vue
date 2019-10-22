<template>
  <div class="contents">
    <PageAbout :title="title" />
    <div class="profile_about text-center">
      <h1 class="text-center profile_about">Skills</h1>
      <hr class="line" align="center" color="black" />
      <div class="flex_areas d-flex justify-content-around flex-wrap">
        <div class="flex_area skill_size rounded-circle vertical_middle">
          <div class="h3 no_margin_bottom">html/css</div>
          <div />
        </div>
        <div class="flex_area skill_size rounded-circle vertical_middle">
          <div class="h3 no_margin_bottom">Javascript</div>
          <div />
        </div>
        <div class="flex_area skill_size rounded-circle vertical_middle">
          <div class="h3 no_margin_bottom">Node.js</div>
          <div />
        </div>
        <div class="flex_area skill_size rounded-circle vertical_middle">
          <div class="h3 no_margin_bottom">Three.js</div>
          <div />
        </div>
        <div class="flex_area skill_size rounded-circle vertical_middle">
          <div class="h3 no_margin_bottom">Nuxt.js</div>
          <div />
        </div>
        <div class="flex_area skill_size rounded-circle vertical_middle">
          <div class="h3 no_margin_bottom">
            Xamarin.Forms
            <br />(C#, xaml)
          </div>
          <div />
        </div>
        <div class="flex_area skill_size rounded-circle vertical_middle">
          <div class="h3 no_margin_bottom">Unity</div>
          <div />
        </div>
        <div class="flex_area skill_size rounded-circle vertical_middle">
          <div class="h3 no_margin_bottom">Swift</div>
          <div />
        </div>
        <div class="flex_area skill_size rounded-circle vertical_middle">
          <div class="h3 no_margin_bottom">
            <div class="white">PHP</div>
            <br />Laravel
          </div>
          <div />
        </div>
        <div class="flex_area skill_size rounded-circle vertical_middle">
          <div class="h3 no_margin_bottom">Python</div>
          <div />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageAbout from '~/components/PageAbout.vue'

export default {
  components: {
    PageAbout
  },
  layout: 'default',
  data() {
    return {
      title: 'Hello World! This is Skills View!'
    }
  }
}
</script>

<style>
.contents {
  width: 100%;
  min-height: 100vh;
}

.logo {
  margin-top: 5vh;
  text-align: center;
}

.profile {
  width: 100%;
  height: 50vh;
  margin-top: 3vh;
}
.profile_img {
  position: relative;
  float: left;
  height: 100%;
  margin-left: 20vw;
  margin-right: 5vw;
}

.profile_content {
  display: inline-block;
  width: 40%;
}

.name {
  margin-top: 5%;
  margin-bottom: 3vh;
}

.line {
  width: 100%;
}

.profile_about {
  width: 60%;
  margin: auto;
  margin-top: 10vh;
}

th {
  font-weight: normal;
  padding-right: 2vw;
}

.flex_areas {
  width: 100%;
  height: auto;
  margin-right: 0;
  align-self: stretch;
}

.skill_size {
  width: 18vw;
  height: 18vw;
}

.flex_area {
  margin-bottom: 5vh;
  background-color: aqua;
  transition: 0.5s;
  border-style: groove;
  border-color: aqua;
  padding-right: 10px;
  padding-left: 10px;
}

.no_border {
  border-radius: 50%;
}

.flex_area:hover {
  opacity: 0.8;
  background-color: #f0ffff;
  color: #0000cd;
  border-radius: 10px;
}

.job_kind {
  margin-top: 10%;
  margin-bottom: 10%;
}

.hover {
  transition: 0.5s;
}
.hover:hover {
  color: rgb(30, 236, 236);
}

.vertical_middle {
  display: flex;
  align-items: center;
  justify-content: center;
}

.no_margin_bottom {
  margin-bottom: 0;
}
</style>
