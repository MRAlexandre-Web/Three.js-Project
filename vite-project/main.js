import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls' //to use mouse to move around//
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

const planetXImg = new THREE.TextureLoader().load('Sun Layout.jpg')

//Three objects needed//
const scene = new THREE.Scene(); //stage which encompases all objects
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000); //FOV, Aspect ratio, how much you see//
const renderer = new THREE.WebGLRenderer({canvas: document.getElementById('app')});
const controls = new OrbitControls(camera, document.getElementById('app')); //controls require camera to function//c 

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight) //full width of screen//
camera.position.setZ(30); 

renderer.render(scene, camera);


const planetGeometry = new THREE.SphereGeometry(15, 32, 16);
const planetMaterial = new THREE.MeshStandardMaterial({map: planetXImg});
const planetX = new THREE.Mesh(planetGeometry, planetMaterial);

scene.add(planetX);

const innerLight = new THREE.AmbientLight(0xffffff);
const sunRays = new THREE.DirectionalLight(0xfffff) 
scene.add(innerLight);

const planeGeometry = new THREE.PlaneGeometry(100, 100)
const planeMaterial = new THREE.MeshBasicMaterial({color: 0xfffff})
const referencePlane = new THREE.Mesh(planeGeometry, planeMaterial)

function animate(time) {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  planetX.rotation.y = time / 5000;


}

renderer.setAnimationLoop(animate)


const grid = new THREE.GridHelper(50); //param 1 increases surface area of grid, param 2 divides boxes in grid//
referencePlane.rotation.x = -0.5 * Math.PI
scene.add(grid)

scene.add(referencePlane)

function stars() {
  const geometry = new THREE.SphereGeometry(0.25)
  const material = new THREE.MeshStandardMaterial({color: 'white'})
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100)) // randomly generates an x, y, z position for star

  star.position.set(x, y, z);
  scene.add(star)
}

Array(200).fill().forEach(stars)

const space = new THREE.TextureLoader().load('space layout.jpg');
scene.background = space


