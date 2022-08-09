import * as THREE from 'three';

function createMesh(positions, scene, scale, x, y, z, color) {
	var geometry = new THREE.BufferGeometry();
	geometry.setAttribute('position', positions.clone());
	geometry.setAttribute('initialPosition', positions.clone());

	geometry.attributes.position.setUsage(THREE.DynamicDrawUsage);

	var clones = [[0, 0, 0]];

	for (var i = 0; i < clones.length; i++) {
		var c = i < clones.length - 1 ? 0x252525 : color;

		var mesh = new THREE.Points(geometry, new THREE.PointsMaterial({ size: 0.02, color: c }));
		mesh.scale.x = mesh.scale.y = mesh.scale.z = scale;

		mesh.position.x = x + clones[i][0];
		mesh.position.y = y + clones[i][1];
		mesh.position.z = z + clones[i][2];

		scene.add(mesh);

		return mesh;
	}
}

export default createMesh;