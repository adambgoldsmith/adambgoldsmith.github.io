import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true });
const canvas = document.querySelector('#canvas-div');
renderer.setSize(window.innerWidth, window.innerHeight);
canvas.appendChild(renderer.domElement);

const loader = new GLTFLoader();
loader.load('/public/models/cursor.gltf', (gltf) => {
    scene.add(gltf.scene);
}, undefined, (error) => {
    console.error(error);
});

// add a light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 0, 5);
scene.add(light);

camera.position.z = 5;

const animate = () => {
    requestAnimationFrame(animate);
    
    scene.children[1].rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();
