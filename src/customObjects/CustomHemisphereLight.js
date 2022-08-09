import * as THREE from 'three';

function CustomHemisphereLight() {
    var hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 10, 0);
    
    return hemiLight;
}

export default CustomHemisphereLight;