import * as THREE from 'three';

function CustomRenderer() {
	const renderer = new THREE.WebGLRenderer({
		antialias: true
	})
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.toneMapping = THREE.ReinhardToneMapping;
	renderer.setClearColor(0xffffff, 0);
	renderer.shadowMap.enabled = true;


	return renderer;
}

export default CustomRenderer;