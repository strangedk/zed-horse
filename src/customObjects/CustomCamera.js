import * as THREE from 'three';

const initialLookAtPos = new THREE.Vector3(0, 1.0, 0);

function CustomCamera(audioListener) {
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.set(3.4, 2.8, -2);
	camera.lookAt(initialLookAtPos);
	camera.add(audioListener);

	return camera;
}

CustomCamera.initialLookAtPos = initialLookAtPos;

export default CustomCamera;