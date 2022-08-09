import * as THREE from 'three';

function MeshGround(manager) {
    const textureLoader1 = new THREE.TextureLoader(manager);
    const groundTexture = textureLoader1.load('./public/models/newhorse/textures/neon2.jpg');
    
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.anisotropy = 16;
    groundTexture.repeat.set(30, 5);
    
    const material = new THREE.MeshPhongMaterial({
        map: groundTexture,
        transparent: true,
        opacity: 0.6,
    });

    const ground = new THREE.Mesh(new THREE.PlaneBufferGeometry(100, 5), material);
    ground.rotation.x = -Math.PI / 2;
    ground.rotation.z = Math.PI / 2;
    ground.receiveShadow = true;

    return ground;
}

export default MeshGround;