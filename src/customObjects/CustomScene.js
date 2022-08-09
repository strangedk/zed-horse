import * as THREE from 'three';

function CustomScene() {
    const scene = new THREE.Scene();
	scene.background = new THREE.Color(0xa0a0a0);
    scene.fog = new THREE.Fog(0x000000, 10, 70);
    
    return scene;
}

export default CustomScene;