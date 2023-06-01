import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls' //to use mouse to move around//
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

//textures for objects//
const planetXImg = new THREE.TextureLoader().load('Sun Layout.jpg');
const planetYImg = new THREE.TextureLoader().load('mercury layout.png');
//Three objects needed//
const scene = new THREE.Scene(); //stage which encompases all objects
const camera = new THREE.PerspectiveCamera(85, window.innerWidth/window.innerHeight, 0.1, 1000); //FOV, Aspect ratio, how much you see//
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

const smallPlanetGeometry = new THREE.SphereGeometry(6, 18, 16);
const smallPlanetMaterial = new THREE.MeshStandardMaterial({map: planetYImg});
const planetY = new THREE.Mesh(smallPlanetGeometry, smallPlanetMaterial);
planetY.position.set(-20, 20, -20);

scene.add(planetY)

const innerLight = new THREE.AmbientLight(0xffffff);
const sunRays = new THREE.DirectionalLight(0xff9a3c, 1);
sunRays.position.set(-9, 15, -10)
sunRays.intensity = 2 //makes directional light brighter//
sunRays.target = planetY //point light to object planey y//

scene.add(innerLight);
scene.add(sunRays);

// made for planet(2) to continuously spin/orbit//
function animate(time) {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  planetX.rotation.y = time / 5000;


}

renderer.setAnimationLoop(animate)

//used as reference of axis//
const grid = new THREE.GridHelper(50); //param 1 increases surface area of grid, param 2 divides boxes in grid//
scene.add(grid)


function stars() {
  const geometry = new THREE.SphereGeometry(0.25)
  const material = new THREE.MeshStandardMaterial({color: 'white'})
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100)) // randomly generates an x, y, z position for star

  star.position.set(x, y, z);
  scene.add(star)
}

Array(200).fill().forEach(stars)

// const space = new THREE.TextureLoader().load('space layout.jpg');
// scene.background = space


