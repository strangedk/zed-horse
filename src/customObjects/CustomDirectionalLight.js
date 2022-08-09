import * as THREE from 'three';

function CustomDirectionalLight() {
    var dirLight = new THREE.DirectionalLight(0xffffff)
	dirLight.position.set(-3, 1, 10)
	dirLight.castShadow = true
	dirLight.shadow.camera.top = 1
	dirLight.shadow.camera.bottom = -1
	dirLight.shadow.camera.left = -1
	dirLight.shadow.camera.right = 1
	dirLight.shadow.camera.near = 0.1
	dirLight.shadow.camera.far = 40

    return dirLight;
}

export default CustomDirectionalLight;