import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true });
const canvas = document.querySelector('#canvas-div');
renderer.setSize(window.innerWidth, window.innerHeight);
canvas.appendChild(renderer.domElement);

const loader = new GLTFLoader();

let cursor, cubic, notch;

loader.load('/public/models/cursor.gltf', (gltf) => {
    cursor = gltf.scene;
    scene.add(cursor);
}, undefined, (error) => {
    console.error(error);
});

loader.load('/public/models/portfolio-key(cubic).glb', (gltf) => {
    cubic = gltf.scene;
    scene.add(cubic);
    cubic.visible = false;
    if (window.innerWidth < 600) {
        cubic.position.set(-2.8, 1, 0);
    }
}, undefined, (error) => {
    console.error(error);
});

loader.load('/public/models/portfolio-key(notch).glb', (gltf) => {
    notch = gltf.scene;
    scene.add(notch);
    notch.visible = false;
    if (window.innerWidth < 600) {
        notch.position.set(2.8, -1, 0);
    }
}, undefined, (error) => {
    console.error(error);
});

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 0, 5);
scene.add(light);

var light2 = new THREE.AmbientLight(0xffffff);
scene.add(light2);

camera.position.z = 5;

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const triggerThreshold1 = 800;

    if (scrollPosition < triggerThreshold1) {
        cursor.visible = true;
        cubic.visible = false;
        notch.visible = false;
        light.visible = true;
        light2.visible = false;
    } else {
        cursor.visible = false;
        cubic.visible = true;
        notch.visible = true;
        light.visible = false;
        light2.visible = true;
    }
});

const animate = () => {
    requestAnimationFrame(animate);
    
    cubic.rotation.x += 0.01;
    notch.rotation.x -= 0.01;
    cursor.rotation.y += 0.01;

    renderer.render(scene, camera);
}
animate();