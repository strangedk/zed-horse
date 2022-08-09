import * as THREE from 'three';

function MeshCube(manager) {
    const geometryCube = new THREE.CubeGeometry(50, 50, 50);
    const cubeMaterials = [
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader(manager).load(
                './public/img/nightsky_ft.png'
            ),
            side: THREE.DoubleSide,
        }), //front side
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader(manager).load(
                './public/img/nightsky_bk.png'
            ),
            side: THREE.DoubleSide,
        }), //back side
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader(manager).load(
                './public/img/nightsky_up.png'
            ),
            side: THREE.DoubleSide,
        }), //up side
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader(manager).load(
                './public/img/nightsky_dn.png'
            ),
            side: THREE.DoubleSide,
        }), //down side
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader(manager).load(
                './public/img/nightsky_rt.png'
            ),
            side: THREE.DoubleSide,
        }), //right side
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader(manager).load(
                './public/img/nightsky_lf.png'
            ),
            side: THREE.DoubleSide,
        }), //left side
    ]

    const cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);
    const cube = new THREE.Mesh(geometryCube, cubeMaterial);

    return cube;
}

export default MeshCube;