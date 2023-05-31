import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls' //to use mouse to move around//
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

//Three objects needed//
const scene = new THREE.Scene(); //stage which encompases all objects
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000); //FOV, Aspect ratio, how much you see//
const renderer = new THREE.WebGLRenderer({canvas: document.getElementById('app')});
const controls = new OrbitControls(camera, document.getElementById('app')); //controls require camera to function//c 

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight) //full width of screen//
camera.position.setZ(30); 

renderer.render(scene, camera);


const geometry = new THREE.SphereGeometry