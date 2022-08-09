import * as THREE from 'three';

class LightGlobal {
    constructor() {
        const sphere = new THREE.SphereBufferGeometry(0.01, 1, 1)
        this.value = new THREE.PointLight(0xff0040, 0.1, 1)
        this.value.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xff0040 })));        
    }
}

export default LightGlobal;