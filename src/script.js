import * as THREE from "three";
import "./style.css";
// import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import CANNON from "cannon";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

/**
 * Debug
 */
const gui = new GUI();

// cursor
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5; // value from -0.5 to 0.5
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// classic import
const gltfLoader = new GLTFLoader();
gltfLoader.load("/models/road/road.glb", (gltf) => {
  gltf.scene.scale.set(0.1, 0.1, 0.1);
  gltf.scene.position.set(0, -0.5, 0);
  scene.add(gltf.scene);
});

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
directionalLight.position.set(0.25, 3, -2.25);
scene.add(directionalLight);

// Object

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);

camera.position.x = -3;
camera.position.y = 2;
camera.position.z = 0;
camera.lookAt(mesh.position);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.target.y = 1;
// controls.update();

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(new THREE.Color("ivory"));
renderer.render(scene, camera);

// Time : Adaptation to the framerate
// Clock : preferred way
const clock = new THREE.Clock();

// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
// gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 });

// Animation
const anim = () => {
  // clock : preferred way
  const elapsedTime = clock.getElapsedTime();

  //   Update objects
  // mesh.rotation.y = elapsedTime * Math.PI * 2;
  // mesh.position.y = Math.sin(elapsedTime);
  // mesh.position.x = Math.cos(elapsedTime);
  //   camera.position.y = Math.sin(elapsedTime);
  //   camera.position.x = Math.cos(elapsedTime);
  //   camera.lookAt(mesh.position);

  // update controls
  controls.update();

  //   Render
  renderer.render(scene, camera);

  // Call anim again on the next frame
  window.requestAnimationFrame(anim);
};

anim();
