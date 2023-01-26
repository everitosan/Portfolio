<script>
  import { onMount } from "svelte"
  import { reducedMotion } from "../utils/motion"
  import * as THREE from "three"
  let element
  let figure
  let renderer
  let scene
  let camera

  const loop = () => {
    figure.rotation.x += 0.005;
    figure.rotation.y += 0.007;
    renderer.render(scene, camera)
    if (!reducedMotion()) {
      requestAnimationFrame(loop)
    }
  }

  const fixAspectRadio = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  const init = () => {
    scene = new THREE.Scene()
    renderer = new THREE.WebGLRenderer({ canvas: element})
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.position.setZ(60)
    camera.position.setY(-14)

    /*
    * Geometry
    */
    const geometry = new THREE.DodecahedronGeometry(15, 0)
    const material = new THREE.MeshStandardMaterial({ 
      color: 0xffbe0b,
      wireframe: true
    }) 
    figure = new THREE.Mesh(geometry, material)
    figure.position.y =  15
    scene.add(figure)

    /*
    * Lights
    */
    const pointLight  = new THREE.PointLight(0xff4fff)
    pointLight.position.set(15,15,13)
    scene.add(pointLight)

    const l1 = new THREE.SpotLight(0x4f8fff)
    l1.position.set(-10,30,30)
    scene.add(l1)

    const ambientLight = new THREE.AmbientLight(0xffffff)
    scene.add(ambientLight)


    const gridHelper = new THREE.GridHelper(200, 50)
    scene.add(gridHelper)

    scene.position.y = -15

    renderer.render(scene, camera)
  }

  onMount(() => {
    init()
    loop()
    addEventListener("resize", fixAspectRadio)
  })

</script>

<canvas id="3d" bind:this={element} ></canvas>