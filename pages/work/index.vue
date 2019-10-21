<template>
  <div class="contents">
    <PageAbout :title="title" />
    <div class="works_about text-center">
      <h1 class="text-center">Works</h1>
      <hr class="line" align="center" color="black" />
      <div class="works_flex_areas d-flex justify-content-around flex-wrap">
        <nuxt-link to="work/Segalnet" class="link_to_work">
          <img class="work_flex_area" src="~/assets/imgs/segalnet.png" />
        </nuxt-link>
        <nuxt-link to="work/Slash Jump" class="link_to_work">
          <img class="work_flex_area" src="~/assets/imgs/slashjump.png" />
        </nuxt-link>
        <nuxt-link to="work/FlyFlyFly改" class="link_to_work">
          <img class="work_flex_area" src="~/assets/imgs/flyflyfly.png" />
        </nuxt-link>
        <nuxt-link to="work/Peace For Train" class="link_to_work">
          <img class="work_flex_area" src="~/assets/imgs/peace_for_train.png" />
        </nuxt-link>
        <nuxt-link to="work/Ryustagram" class="link_to_work">
          <img class="work_flex_area" src="~/assets/imgs/ryustagram.png" />
        </nuxt-link>
        <nuxt-link to="work/This Home Page" class="link_to_work">
          <img class="work_flex_area" src="~/assets/imgs/homepage.png" />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import PageAbout from '~/components/PageAbout.vue'
// import WorkAbout from '~/components/WorkAbout.vue'
export default {
  components: {
    PageAbout
    // WorkAbout
  },
  layout: 'default',
  data() {
    return {
      title: 'Hello World! This is Works View!',
      work_title: 'Works'
    }
  }
}
</script>

<style>
.contents {
  width: 100%;
  min-height: 100vh;
}

.line {
  width: 100%;
}

.works_about {
  width: 80%;
  margin: auto;
  margin-top: 7vh;
}

.work_flex_area {
  display: block;
  width: 100%;
  margin-bottom: 5vh;
  transition: 0.5s;
  border-style: groove;
  border-color: aqua;
}

.work_flex_area:hover {
  opacity: 0.4;
  color: #0000cd;
  transform: scale(1.1, 1.1);
  -webkit-transform: scale(1.1, 1.1);
  -moz-transform: scale(1.1, 1.1);
  -o-transform: scale(1.1, 1.1);
  -ms-transform: scale(1.1, 1.1);
  overflow: hidden;
}

.link_to_work {
  margin: 0%;
  width: 45%;
  overflow: hidden;
}

/* .link_to_work:hover {
  transform: scale(1.2);
} */
</style>
