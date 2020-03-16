<template>
  <div class="contents">
    <PageAbout :title="title" />
    <div class="profile">
      <img class="profile_img" src="~/assets/imgs/bb8.jpg" />
      <div class="profile_content">
        <h1 class="name text-center">Ryu1</h1>
        <hr class="line" align="left" color="black" />
        <div class>
          Studying computer science at Sophia University
          Department of imformation and communication sciences.
          <br />Over 2 years experience in iOS, Web, XR development.
          <br />
          <br />
          <table class="mx-auto">
            <tbody>
              <tr>
                <th>Name</th>
                <td>深見龍一(Ryuichi Fukami)</td>
              </tr>
              <tr>
                <th>University</th>
                <td>上智大学 理工学部 情報理工学科</td>
              </tr>
              <tr>
                <th>GitHub</th>
                <td>
                  <a class="hover" href="https://github.com/fukami421">fukami421</a>
                </td>
              </tr>
              <tr>
                <th>Twitter</th>
                <td>
                  <a class="hover" href="https://twitter.com/ryu1_ryu421">@ryu1_ryu421</a>
                </td>
              </tr>
              <tr>
                <th>Facebook</th>
                <td>
                  <a
                    class="hover"
                    href="https://www.facebook.com/profile.php?id=100009608564208"
                  >Ryuichi Fukami</a>
                </td>
              </tr>
              <tr>
                <th>Qiita</th>
                <td>
                  <a class="hover" href="https://qiita.com/ryu1_f">@ryu1_f</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="profile_about text-center">
      <h1 class="text-center profile_about">Job Experience</h1>
      <hr class="line" align="center" color="black" />
      <div class="flex_areas d-flex justify-content-around flex-wrap">
        <div class="flex_area about_size">
          <div class="h3 job_kind">Web Engineer</div>
          <div class="h5">SmartSocial株式会社</div>
          <div>2017/07~2018/03</div>
          <br />
          <div>Worked on Web Application using wordpress</div>
          <div />
        </div>
        <div class="flex_area about_size">
          <div class="h3 job_kind">Software Engineer</div>
          <div class="h5">Asukalab株式会社</div>
          <div>2018/03~Current</div>
          <br />
          <div>
            Worked on Software Application using
            <br />Unity, Swift, C#, Node.js, Three.js, Python
          </div>
          <div />
        </div>
        <div class="flex_area about_size">
          <div class="h3 job_kind">XR Engineer</div>
          <div class="h5">株式会社ARMY</div>
          <div>2019/04(1month)</div>
          <br />
          <div>Worked on Hyper Casual Games using Unity</div>
          <div />
        </div>
        <div class="flex_area about_size">
          <div class="h3 job_kind">Web Engineer</div>
          <div class="h5">チームラボ株式会社</div>
          <div>2019/08(2weeks)</div>
          <br />
          <div>Worked on Web Application using AWS, Golang</div>
          <div />
        </div>
        <div class="flex_area about_size">
          <div class="h3 job_kind">iOS Engineer</div>
          <div class="h5">Sansan株式会社</div>
          <div>2019/08/30(1day)</div>
          <br />
          <div>Worked on iOS mobile Application using Swift</div>
          <div />
        </div>
        <div class="flex_area about_size">
          <div class="h3 job_kind">iOS Engineer</div>
          <div class="h5">メディア工房</div>
          <div>2019/10~Current</div>
          <br />
          <div>Worked on iOS mobile Application using Swift</div>
          <div />
        </div>
        <div class="flex_area about_size">
          <div class="h3 job_kind">iOS Engineer</div>
          <div class="h5">CyberAgent</div>
          <div>2020/02(1month)</div>
          <br />
          <div>Worked on iOS mobile Application using Swift</div>
          <div />
        </div>
        <div class="flex_area about_size">
          <div class="h3 job_kind">iOS Engineer</div>
          <div class="h5">Wantedly</div>
          <div>2020/03(2Weeks)</div>
          <br />
          <div>Worked on iOS mobile Application using Swift</div>
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
      title: 'Hello World! This is About View!'
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

  /* margin-right: 0; */
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

.about_size {
  width: 40%;
  min-height: 30vh;
  border-radius: 7px;
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

.flex_area:hover {
  /* background-color: white; */
  /* border-style: groove; */
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
/* .table_header {
} */
</style>
