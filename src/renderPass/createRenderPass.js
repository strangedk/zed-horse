import * as THREE from 'three';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';

function createRenderPass(params, scene, camera, renderer, sound, onChangeTextureId) {
	const renderScene = new RenderPass(scene, camera);
	const bloomPass = new UnrealBloomPass(
		new THREE.Vector2(window.innerWidth, window.innerHeight),
		1.5,
		0.4,
		0.85
	);

	bloomPass.threshold = params.bloomThreshold;
	bloomPass.strength = params.bloomStrength;
	bloomPass.radius = params.bloomRadius;

	const composer = new EffectComposer(renderer);
	composer.addPass(renderScene);
	composer.addPass(bloomPass);

	const gui = new GUI();

	const folderGraphics = gui.addFolder('Effects');
	folderGraphics.add(params, 'exposure', 0.1, 2).onChange(value => {
		renderer.toneMappingExposure = Math.pow(value, 4.0);
	})

	folderGraphics.add(params, 'bloomThreshold', 0.0, 1.0).onChange(value => {
		bloomPass.threshold = Number(value);
	})

	folderGraphics.add(params, 'bloomStrength', 0.0, 3.0).onChange(value => {
		bloomPass.strength = Number(value);
	})

	folderGraphics
		.add(params, 'bloomRadius', 0.0, 1.0)
		.step(0.01)
		.onChange(value => {
			bloomPass.radius = Number(value)
		})

	const folderSound = gui.addFolder('Sound');
	folderSound.add(params, 'volume', 0.0, 1.0).onChange(value => {
		sound.setVolume(value);

		if (sound != null)
			sound.play();
	})

	//#region texture dat.gui using
	const texturesParams = { '0': false, '1': false, '2': false, '3': false };
	const texturesNames = params.horseNames;
	const folderTextures = gui.addFolder('Textures');

	const onChange = value => {
		onChangeTextureId(value);
	}
	const setCheckedProperty = property => {
		for (let param in texturesParams)
			texturesParams[param] = false;
		texturesParams[property] = true;

		onChange(property);
	}

	folderTextures.add(texturesParams, '0').name(texturesNames[0]).listen().onChange(() => setCheckedProperty('0'));
	folderTextures.add(texturesParams, '1').name(texturesNames[1]).listen().onChange(() => setCheckedProperty('1'));
	folderTextures.add(texturesParams, '2').name(texturesNames[2]).listen().onChange(() => setCheckedProperty('2'));
	folderTextures.add(texturesParams, '3').name(texturesNames[3]).listen().onChange(() => setCheckedProperty('3'));
	//#endregion

	return { composer };
}

export default createRenderPass;