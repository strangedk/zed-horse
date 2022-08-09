import * as THREE from 'three';
function combineBuffer(model, bufferName) {
	let count = 0

	model.traverse(child => {
		if (child.isMesh) {
			var buffer = child.geometry.attributes[bufferName]

			count += buffer.array.length
		}
	});

	let combined = new Float32Array(count)
	let offset = 0

	model.traverse(child => {
		if (child.isMesh) {
			var buffer = child.geometry.attributes[bufferName]

			combined.set(buffer.array, offset)
			offset += buffer.array.length
		}
	});

	return new THREE.BufferAttribute(combined, 3)
}

export default combineBuffer;