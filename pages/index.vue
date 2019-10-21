<template>
  <div class="contents">
    <PageAbout :title="title" />
    <canvas id="canvas" />
    <!-- <div class="logo">
      <logo />
    </div>-->
  </div>
</template>

<script>
import * as THREE from 'three'
import ImageUtils from 'assets/textures/sky.jpg'
import PageAbout from '~/components/PageAbout.vue'

export default {
  components: {
    PageAbout
  },
  layout: 'default',
  // todo
  data() {
    const width = window.innerWidth
    const height = window.innerHeight
    const fontLoader = new THREE.FontLoader()

    const scene = new THREE.Scene()
    const renderer = null
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    const light = new THREE.DirectionalLight()
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 1.0)
    const material = new THREE.MeshNormalMaterial()
    const cube = new THREE.Mesh(geometry, material)
    const sphereGeometry = new THREE.SphereGeometry(100, 32, 32)
    sphereGeometry.scale(-1, 1, 1)
    const sphereMaterial = new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture(ImageUtils)
    })
    THREE.ImageUtils.loadTexture(ImageUtils).minFilter = THREE.LinearFilter
    const panorama = new THREE.Mesh(sphereGeometry, sphereMaterial)

    console.log(sphereMaterial)
    let text = null
    fontLoader.load(
      'https://threejs.org//examples/fonts/helvetiker_regular.typeface.json',
      function(font) {
        // ロードが完了したらTextのMesh生成
        const textGeometry = new THREE.TextGeometry('Ryu1', {
          font,
          size: 2.0,
          height: 0.25,
          curveSegments: 30
        })
        textGeometry.computeBoundingBox()
        textGeometry.center()
        text = new THREE.Mesh(
          textGeometry,
          new THREE.MeshStandardMaterial({ color: 0x6699ff, roughness: 0.5 })
        )
        text.rotation.y -= 0.2
        text.position.set(0, 0, -5)
        scene.add(text)
      }
    )
    // こっからOcean
    // const waterNormals = new THREE.TextureLoader(ImageUtils)
    // const water = Water(renderer, camera, scene, {
    //   textureWidth: 512,
    //   textureHeight: 512,
    //   waterNormals,
    //   alpha: 1.0,
    //   sunDirection: light.position.clone().normalize(),
    //   sunColor: 0xffffff,
    //   waterColor: 0x001e0f,
    //   distortionScale: 50.0
    // })
    // console.log('water: ' + water)
    // const parameters = {
    //   distance: 400,
    //   inclination: 0.49,
    //   azimuth: 0.205
    // }

    // const mirrorMesh = new THREE.Mesh(
    //   new THREE.PlaneBufferGeometry(
    //     parameters.width * 500,
    //     parameters.height * 500
    //   ),
    //   water.material
    // )
    // mirrorMesh.add(water)
    // mirrorMesh.rotation.x = -Math.PI * 0.5

    return {
      scene,
      renderer,
      camera,
      light,
      geometry,
      material,
      cube,
      text,
      panorama,
      title: 'Hello World! This is Home View!'
    }
  },
  mounted() {
    const $canvas = document.getElementById('canvas')
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: $canvas,
      alpha: true
    })

    this.camera.position.set(0, 0, 0)
    this.light.position.set(0, 0, 10)
    this.cube.position.set(0, 0, 0)
    this.panorama.position.set(0, 0, 0)
    this.scene.add(this.cube)
    this.scene.add(this.light)
    this.scene.add(this.panorama)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.render(this.scene, this.camera)
    this.renderer.setClearColor(0x000000, 0) // 背景の透明度の設定
    this.renderer.setPixelRatio(10)
    // this.renderer.setSize(this.width, this.height)
    this.animate()
  },
  methods: {
    animate() {
      requestAnimationFrame(this.animate)
      this.cube.rotation.x += 0.02
      this.cube.rotation.y += 0.02
      this.panorama.rotation.y += 0.001
      this.renderer.render(this.scene, this.camera)
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
  /* margin-top: 5vh; */
  text-align: center;
}

#canvas {
  /* margin-top: 5vh; */
  width: 100%;
  height: auto;
  /* min-height: 90vh; */
}
</style>
