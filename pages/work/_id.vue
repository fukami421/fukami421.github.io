<template>
  <div class="contents">
    <PageAbout :title="title" />
    <div class="works_about">
      <WorkAbout />
      <div class="work_content">
        <img
          v-if="$route.params.id === 'Segalnet'"
          class="work_img"
          src="~/assets/imgs/segalnet.png"
        />
        <img
          v-if="$route.params.id === 'Slash Jump'"
          class="work_img"
          src="~/assets/imgs/slashjump.png"
        />
        <img
          v-if="$route.params.id === 'FlyFlyFly改'"
          class="work_img"
          src="~/assets/imgs/flyflyfly.png"
        />
        <img
          v-if="$route.params.id === 'Peace For Train'"
          class="work_img"
          src="~/assets/imgs/peace_for_train.png"
        />
        <img
          v-if="$route.params.id === 'Ryustagram'"
          class="work_img"
          src="~/assets/imgs/ryustagram.png"
        />
        <img
          v-if="$route.params.id === 'This Home Page'"
          class="work_img"
          src="~/assets/imgs/homepage.png"
        />
        <img v-if="$route.params.id === 'bb8_'" class="work_img" src="~/assets/imgs/bb8_.jpg" />
        <div class="work_about">
          <div v-if="$route.params.id === 'Segalnet'">
            <div class="item_key">使用ツール:</div>
            <div class="item_value">WordPress</div>
            <div class="item_key">開発人数:</div>
            <div class="item_value">チーム開発</div>
            <div class="item_key">url:</div>
            <a class="item_value" href="https://www.smartsocial.co.jp/seagullnetwork/">紹介サイト</a>
          </div>
          <div v-else-if="$route.params.id === 'Slash Jump'">
            <div class="item_key">使用ツール:</div>
            <div class="item_value">Unity</div>
            <div class="item_key">開発人数:</div>
            <div class="item_value">エンジニア1人, 企画1人</div>
            <div class="item_key">制作期間:</div>
            <div class="item_value">1ヶ月半</div>
            <div class="item_key">url:</div>
            <a
              class="item_value"
              href="https://apps.apple.com/jp/app/jumpingfeeds/id1466340447?l=en"
            >App Store</a>
          </div>
          <div v-else-if="$route.params.id === 'FlyFlyFly改'">
            <div class="item_key">使用ツール:</div>
            <div class="item_value">Unity</div>
            <div class="item_key">開発人数:</div>
            <div class="item_value">10人程度</div>
            <div class="item_key">url:</div>
            <a class="item_value" href="https://www.youtube.com/embed/Q9UPGWtliUg">プレイ動画</a>
          </div>
          <div v-else-if="$route.params.id === 'Peace For Train'">
            <div class="item_key">Client Side:</div>
            <div class="item_value">Xamarin.Forms(C#, Xaml)</div>
            <div class="item_key">Server Side:</div>
            <div class="item_value">Node.js</div>
            <div class="item_key">その他のツール:</div>
            <div class="item_value">Azure</div>
            <div class="item_key">開発人数:</div>
            <div class="item_value">個人開発</div>
            <div class="item_key">制作期間:</div>
            <div class="item_value">2ヶ月</div>
          </div>
          <div v-else-if="$route.params.id === 'Ryustagram'">
            <div class="item_key">使用ツール:</div>
            <div class="item_value">Laravel, Google認証</div>
            <div class="item_key">開発人数:</div>
            <div class="item_value">個人開発</div>
            <div class="item_key">制作期間:</div>
            <div class="item_value">10日間</div>
            <div class="item_key">url:</div>
            <a class="item_value" href="https://github.com/fukami421/RyuStagram">github</a>
          </div>
          <div v-else-if="$route.params.id === 'This Home Page'">
            <div class="item_key">使用ツール:</div>
            <div class="item_value">Nuxt.js</div>
            <div class="item_key">開発人数:</div>
            <div class="item_value">個人開発</div>
            <div class="item_key">制作期間:</div>
            <div class="item_value">3日間</div>
          </div>
        </div>
        <div class="work_detail">
          <div v-if="$route.params.id === 'Segalnet'" class="work_description">
            概要:
            <br />SmartsSocial株式会社で、Webエンジニアとしてチームで開発したWebアプリケーションです。私はメッセージ受信時の自動メール送信部分と、チャットのUIを担当しました。
          </div>
          <div v-else-if="$route.params.id === 'Slash Jump'" class="work_description">
            概要:
            <br />株式会社ARMYで、企画者と私(エンジニア)で作成したiOS, Android用ハイパーカジュアルゲームです。任天堂New スーパーマリオブラザーズのミニゲームである
            <a
              href="https://www.youtube.com/watch?v=MCRb9YABNeE"
            >トランポリンマリオ</a>を模倣して、マリオをりんご、ゴールをワニに変えて作りました。
          </div>
          <div v-else-if="$route.params.id === 'FlyFlyFly改'" class="work_description">
            概要:
            <br />東京大学のインカレサークルとして五月祭に展示した作品です。私がサークルに入る前から、FlyFlyFlyという作品はあったのですが、新しくFlyFlyFly改として細部を作り込むということで開発に参加したました。
            この作品は、実際に体験者がハンモックに乗って、上空を飛行しながら向かってくる敵を攻撃しながらゴールを目指すというものなのですが、私はいくつかあるステージのうちの、とあるステージのゴーストに触れるとリアクションがアクションを発生させるようにしました。
          </div>
          <div v-else-if="$route.params.id === 'Peace For Train'" class="work_description">
            概要:
            <br />普段通勤などで電車に乗っているときに、席を譲られるべき人(高齢者や障害者)が席に座れずに、若者が座っているという状況に直面することは時折あると思います。このアプリはそういった、本来席を譲られるべき人に向けて作りました。
            アプリの概要としましては、ユーザー登録(DBと紐付いています)を完了しているユーザーがログイン後、"席を譲ってほしい"または"席を譲ってあげたい"のどちらかを選択することができ、選択肢によって異なるBeacon(異なるUuIDを設定することで、異なる種のBeaconを発信することができます)を発信します。ここでお互いがBeaconを取得できれば、席の交換を開始します。しかし、電車の中で相手がどこらへんの位置にいるのか把握するのは難しいと思います。ここで、Beaconによって相手までの距離を測定し、相手を探します。その結果相手を認識することができれば、席の交換が成立です。
          </div>
          <div v-else-if="$route.params.id === 'Ryustagram'" class="work_description">
            概要:
            <br />TeamlabのサマーインターンにWebエンジニアとして参加した際に、課題としてInstagramもどきのWebアプリを作成している人がいたので、私もインターン終了後に取り組んでみました。ユーザー情報はGoogleのOAuthを用いており、MySQLで管理しています。
          </div>
          <div v-else-if="$route.params.id === 'This Home Page'" class="work_description">
            概要:
            <br />現在閲覧している私のポートフォリオサイトです。
          </div>
        </div>
        <!-- <div class="profile_content"></div> -->
      </div>
    </div>
  </div>
  <!-- ToDo
  1. workの画像の大きさをbb8_.jpgに全部合わせる
  2. このサイトの作り込み
  -->
</template>

<script>
import PageAbout from '~/components/PageAbout.vue'
import WorkAbout from '~/components/WorkAbout.vue'
export default {
  components: {
    PageAbout,
    WorkAbout
  },
  layout: 'default',
  data() {
    return {
      title: 'Hello World! This is idに対応したプロジェクト名 View!',
      work_title: 'idに対応したプロジェクト名'
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

.work_content {
  height: 35vh;
  width: 100%;
}
.work_img {
  width: 60%;
  left: 0;
}

.work_about {
  display: block;
  float: right;
  width: 30vw;
  height: 100%;
  margin-left: 2vw;
}

.item_key {
  width: 100%;
}

.item_value {
  width: 100%;
  margin-bottom: 2vh;
  font-size: 3vh;
}

.work_detail {
  width: 100%;
  height: auto;
  margin-top: 5vh;
}

.work_description {
}
/* @media screen and (max-width: 896px) {
  .item_value {
    width: 100%;
    margin-bottom: 1vh;
    font-size: 2vmax;
  }
}
@media screen and (max-width: 1024px) {
  .item_value {
    width: 100%;
    margin-bottom: 2vh;
    font-size: 1vmax;
  }
} */
</style>
