import * as THREE from "../src/Three";
if (! Detector.webgl) Detector.addGetWebGLMessage();
let container: HTMLDivElement, stats: Stats;
let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;
init();
animate();
function init() {
  container = document.createElement('div');
  document.body.appendChild(container);
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.y = 400;
  scene = new THREE.Scene();
  let light: THREE.Light, object: THREE.Object3D;
  scene.add(new THREE.AmbientLight(0x404040));
  light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0, 1, 0);
  scene.add(light);
  const map: THREE.Texture = new THREE.TextureLoader().load('textures/UV_Grid_Sm.jpg');
  map.wrapS = map.wrapT = THREE.TextureWrapping.Repeat;
  map.anisotropy = 16;
  const material: THREE.Material = new THREE.MeshLambertMaterial({ map: map, side: THREE.SideMode.Double });
  //
  object = new THREE.Mesh(new THREE.SphereGeometry(75, 20, 10), material);
  object.position.set(-400, 0, 200);
  scene.add(object);
  object = new THREE.Mesh(new THREE.IcosahedronGeometry(75, 1), material);
  object.position.set(-200, 0, 200);
  scene.add(object);
  object = new THREE.Mesh(new THREE.OctahedronGeometry(75, 2), material);
  object.position.set(0, 0, 200);
  scene.add(object);
  object = new THREE.Mesh(new THREE.TetrahedronGeometry(75, 0), material);
  object.position.set(200, 0, 200);
  scene.add(object);
  //
  object = new THREE.Mesh(new THREE.PlaneGeometry(100, 100, 4, 4), material);
  object.position.set(-400, 0, 0);
  scene.add(object);
  object = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 100, 4, 4, 4), material);
  object.position.set(-200, 0, 0);
  scene.add(object);
  object = new THREE.Mesh(new THREE.CircleGeometry(50, 20, 0, Math.PI * 2), material);
  object.position.set(0, 0, 0);
  scene.add(object);
  object = new THREE.Mesh(new THREE.RingGeometry(10, 50, 20, 5, 0, Math.PI * 2), material);
  object.position.set(200, 0, 0);
  scene.add(object);
  object = new THREE.Mesh(new THREE.CylinderGeometry(25, 75, 100, 40, 5), material);
  object.position.set(400, 0, 0);
  scene.add(object);
  //
  const points: THREE.Vector2[] = [];
  for (let i = 0; i < 50; i ++) {
    points.push(new THREE.Vector2(Math.sin(i * 0.2) * Math.sin(i * 0.1) * 15 + 50, (i - 5) * 2));
  }
  object = new THREE.Mesh(new THREE.LatheGeometry(points, 20), material);
  object.position.set(-400, 0, -200);
  scene.add(object);
  object = new THREE.Mesh(new THREE.TorusGeometry(50, 20, 20, 20), material);
  object.position.set(-200, 0, -200);
  scene.add(object);
  object = new THREE.Mesh(new THREE.TorusKnotGeometry(50, 10, 50, 20), material);
  object.position.set(0, 0, -200);
  scene.add(object);
  object = new THREE.AxisHelper(50);
  object.position.set(200, 0, -200);
  scene.add(object);
  object = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 50);
  object.position.set(400, 0, -200);
  scene.add(object);
  //
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  stats = new Stats();
  container.appendChild(stats.dom);
  //
  window.addEventListener('resize', onWindowResize, false);
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
//
function animate() {
  requestAnimationFrame(animate);
  render();
  stats.update();
}
function render() {
  const timer: number = Date.now() * 0.0001;
  camera.position.x = Math.cos(timer) * 800;
  camera.position.z = Math.sin(timer) * 800;
  camera.lookAt(scene.position);
  for (let i = 0, l = scene.children.length; i < l; i ++) {
    const object: THREE.Object3D = scene.children[ i ];
    object.rotation.x = timer * 5;
    object.rotation.y = timer * 2.5;
  }
  renderer.render(scene, camera);
}
