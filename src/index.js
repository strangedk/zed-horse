import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import combineBuffer from './buffer/combineBuffer';
import CrossFade from './crossFade/CrossFade';
import CustomCamera from './customObjects/CustomCamera';
import CustomDirectionalLight from './customObjects/CustomDirectionalLight';
import CustomHemisphereLight from './customObjects/CustomHemisphereLight';
import CustomLensFlare from './customObjects/CustomLensFlare';
import CustomRenderer from './customObjects/CustomRenderer';
import CustomScene from './customObjects/CustomScene';
import LightGlobal from './light/LightGlobal';
import CustomLoadingManager from './loadingManager/CustomLoadingManager';
import { randomFloat, degrees, radians } from './math/MathHelpers';
import createMesh from './mesh/createMesh';
import MeshCube from './mesh/MeshCube';
import MeshGround from './mesh/MeshGround';
import Particles from './particles/Particles';
import createRenderPass from './renderPass/createRenderPass';
import ScreenShake from './screen/ScreenShake';
import Params from './settings/Params';
import Settings from './settings/Settings';
import ShadersData from './shaders/ShadersData';
import { MeshLambertMaterial, MathUtils, MeshPhongMaterial } from 'three';
import CustomSun from './customObjects/CustomSun';

var light;
var scene, renderer, camera, controls;
var model, skeleton, mixer, clock;
var shadMat;
var currentTextureId;
var mixers = [];
var idleAction, walkAction, runAction;
var idleWeight, walkWeight, runWeight;
var actions, settings;
var singleStepMode = false;
var sizeOfNextStep = 0;
var mouse = new THREE.Vector2(), raycaster = new THREE.Raycaster();
var materialShader, uniforms, uniforms1, uniforms2;
var uniformsHorse = [];
var sound;
var horseShadows = [];

var ground;
var movingLight;
var horseMesh;
var horses = [];

const params = new Params();
const particles = new Particles();
const screenShake = new ScreenShake();

var composer;
var foots = [];
var footsBone = [];
var newLookAtPos = CustomCamera.initialLookAtPos;
var horseModelPositions;

let horseMirrorCamera;
let horseMirrorPlane;
let horseMirrorRenderTarget;

var manager;
const progressBar = document.querySelector('#progress');
const loadingOverlay = document.querySelector('#loading-overlay');
const zedLogo = document.querySelector('#logo');
const footer = document.querySelector('#footer');
const vhsLogo = document.querySelector('#vhsFooter');

let percentComplete = 1;
let frameID = { id: 0 };

var prevPosX = 0;
var tapCounter = 0;
var lastCreatedHorseShadowTime = 0;

const updateAmount = 1.5;

function initShaders() {
	const shadersData = new ShadersData();
	uniforms = shadersData.uniforms;
	uniforms1 = shadersData.uniforms1;
	uniforms2 = shadersData.uniforms2;
	shadMat = shadersData.shadMat;
	uniformsHorse = shadersData.uniformsHorse;
}
function init() {
	const container = document.getElementById('container');
	const listener = new THREE.AudioListener();

	camera = CustomCamera(listener);
	sound = new THREE.Audio(listener);
	manager = new CustomLoadingManager()
		.setFrameId(frameID.id)
		.setVisibleObjects(zedLogo, footer, vhsLogo)
		.setInvisibleObjects(loadingOverlay)
		.setProgressBarData(progressBar, animateBar)
		.init().manager;

	const audioLoader = new THREE.AudioLoader(manager);
	audioLoader.load('./public/sounds/IntrostandbyLoop.mp3', buffer => {
		sound.setBuffer(buffer)
		sound.setLoop(true)
		sound.setVolume(1.0)
	});

	clock = new THREE.Clock();
	scene = CustomScene();

	const hemiLight = CustomHemisphereLight();
	scene.add(hemiLight);

	const dirLight = CustomDirectionalLight();
	scene.add(dirLight);

	createHorseMirror();

	const cube = MeshCube(manager);
	scene.add(cube);

	ground = MeshGround(manager); // Sure, it's global
	scene.add(ground);

	let ddsLoader = new DDSLoader(manager);
	let ddsMap = ddsLoader.load('./public/textures/compressed/explosion_dxt5_mip.dds');
	ddsMap.anisotropy = 4;

	const basicMaterial = new THREE.MeshBasicMaterial({
		map: ddsMap,
		side: THREE.DoubleSide,
		blending: THREE.AdditiveBlending,
		depthTest: false,
		transparent: true,
		opacity: 0.3,
	});

	const loader = new GLTFLoader(manager);
	loader.load('./public/models/horses/newhorse.gltf', function (gltf) {
		model = gltf.scene;

		horseModelPositions = combineBuffer(model, 'position');

		model.traverse(function (child) {
			var bfoot = false;

			if (child.isMesh && child.name == 'Horse_E_SkiningHorse') {
				uniforms1.u_helmet_texture.value = child.material.map;
				createHorseShadows(child.geometry, 1);
				horseMesh = child.geometry;
				child.material = shadMat;
			} else if (child.name == 'Horse_E_SkiningHorsi__L_Toe') {
				bfoot = true;
			} else if (child.name == 'Horse_E_SkiningHorsi__R_Toe') {
				bfoot = true;
			} else if (child.name == 'Horse_E_SkiningHorsi__L_Finger') {
				bfoot = true;
			} else if (child.name == 'Horse_E_SkiningHorsi__R_Finger') {
				bfoot = true;
			} else if (child.name == 'Horse_E_SkiningEyes') {
				const eyesMaterial = new MeshPhongMaterial({
					color: 0xffffff,
					emissive: 0xffffff,
					emissiveIntensity: 10,
					specular: 0xffffff,
					side: THREE.DoubleSide,
					blending: THREE.AdditiveBlending,
					needUpdate: true,
					depthTest: true,
					transparent: false,
					skinning: true,
				});

				child.material = eyesMaterial;
			}

			if (bfoot) {
				footsBone.push(child)
				const footParticle = new THREE.Mesh(new THREE.PlaneBufferGeometry(0.25, 0.25), basicMaterial);
				footParticle.rotation.x = -Math.PI / 2;
				footParticle.rotation.z = Math.PI / 2;
				foots.push(footParticle);
				scene.add(footParticle);
				const worldPosition = child.getWorldPosition(new THREE.Vector3());
				footParticle.position.set(worldPosition.x, worldPosition.y, worldPosition.z);
			}
		})

		model.scale.set(0.7, 0.7, 0.7);
		model.position.set(0, 0, 0);
		scene.add(model);

		model.traverse(object => {
			if (object.isMesh) object.castShadow = true
		});

		var animations = gltf.animations;

		mixer = new THREE.AnimationMixer(model);
		var actionIDs = [1, 2, 4];
		idleAction = mixer.clipAction(animations[0]);
		walkAction = mixer.clipAction(animations[actionIDs[0]]);
		runAction = mixer.clipAction(animations[3]);

		actions = [idleAction, walkAction, runAction]

		for (var i = 0; i < 100; i++) {
			particles.createParicles()
		}

		createPanel();

		createRenderPassWrapper();
		activateAllActions();
		createLights();

		new CustomSun(scene, manager);

		animate();
	})
	window.scene = scene;

	renderer = CustomRenderer();

	container.appendChild(renderer.domElement)
	uniforms1.resolution.value.x = renderer.domElement.width
	uniforms1.resolution.value.y = renderer.domElement.height

	for (var i = 0; i < uniformsHorse.length; i++) {
		uniformsHorse[i].resolution.value.x = renderer.domElement.width
		uniformsHorse[i].resolution.value.y = renderer.domElement.height
	}

	controls = new OrbitControls(camera, renderer.domElement)

	controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
	controls.dampingFactor = 0.05
	controls.screenSpacePanning = false
	controls.minDistance = 3
	controls.maxDistance = 10
	controls.maxPolarAngle = Math.PI / 2
	controls.enablePan = false
	window.addEventListener('touchend', onTouchEnd, false)
	document.addEventListener('click', onClick, false)
	window.addEventListener('resize', onWindowResize, false)
	window.addEventListener('mousemove', onMouseMove, false)
}
function updateTexture(textureId) {
	if (textureId === currentTextureId)
		return;
	else
		currentTextureId = textureId;

	const onTextureLoaded = () =>
		model.traverse(child => {
			if (child.isMesh && child.name == 'Horse_E_SkiningHorse') {
				child.material.map = horseTexture;
				uniforms1.u_helmet_texture.value = child.material.map;
			}
		}
		);

	const path = './public/models/horses/';
	const horses = params.horseNames;
	const currentHorseURL = `${path}${horses[textureId]}.jpg`
	const horseTexture = new THREE.TextureLoader(manager).load(currentHorseURL, onTextureLoaded);
}
function animateBar(target) {
	percentComplete += updateAmount;
	if (percentComplete < target) {
		progressBar.style.width = percentComplete + '%';
	} else {
		percentComplete = 0;
	}
	frameID.id = requestAnimationFrame(animateBar);
}
function changeAnimation() {
	const defaultAction = idleAction;
	tapCounter++
	if (idleWeight === 1 && tapCounter === 1) {
		prepareCrossFade(idleAction, walkAction, defaultAction, 0.2)
	} else if (walkWeight === 1 && tapCounter === 2) {
		prepareCrossFade(walkAction, runAction, defaultAction, 0.2)
		setTimeout(() => {
			prepareCrossFade(runAction, walkAction, defaultAction, 0.1)
		}, 700)
	} else if (walkWeight === 1 && tapCounter >= 3) {
		tapCounter = 0
		prepareCrossFade(walkAction, idleAction, defaultAction, 0.2)
	}

	if (tapCounter >= 3) tapCounter = 0
}
function createRenderPassWrapper() {
	const onChangeTextureId = value => updateTexture(value);
	const renderPass = createRenderPass(params, scene, camera, renderer, sound, onChangeTextureId);
	composer = renderPass.composer;
}
function createHorseMirror() {
	scene.add(new THREE.AxesHelper(5));

	const renderTarget = new THREE.WebGLRenderTarget(512, 512, { format: THREE.RGBAFormat });
	const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight);

	// normalize:
	camera.rotateX(radians(-90));
	// From cut:
	camera.rotateY(radians(70));
	camera.position.set(6.0, 2.3, 0);

	scene.add(camera);
	scene.add(new THREE.CameraHelper(camera));

	const geometry = new THREE.PlaneGeometry(4, 4, 4, 4);
	geometry.rotateX(radians(-90));

	const material = new THREE.MeshBasicMaterial({
		map: renderTarget
	});

	const mirror = new THREE.Mesh(geometry, material);
	mirror.position.set(0, 0.001, 0.15);
	scene.add(mirror);

	horseMirrorCamera = camera;
	horseMirrorPlane = mirror;
	horseMirrorRenderTarget = renderTarget;
}
function updateMirrorCamera() {
	if (!horseMirrorCamera)
		return;

	particles.hide();
	ground.visible = false;
	horseMirrorPlane.visible = false;
	horseShadows.forEach(s => s.visible = false);
	foots.forEach(s => s.visible = false);

	renderer.setRenderTarget(horseMirrorRenderTarget);
	renderer.render(scene, horseMirrorCamera);

	particles.show();
	ground.visible = true;
	horseMirrorPlane.visible = true;
	horseShadows.forEach(s => s.visible = true);
	foots.forEach(s => s.visible = true);
}
function updateHorseShadowPos(time) {
	horseShadows.forEach((hs) => {
		hs.position.z += time * 3
		updatePositionsHorseShadow(hs)
		if (hs.position.z > 4) {
			hs.position.z = 0
		}
	})
}
function createHorseShadows(mesh, z) {
	var hs = createMesh(horseModelPositions, scene, 0.65, 0, 0, 0, 0xff7744)

	hs.speed = 0.005 + Math.random()
	hs.verticesDown = 0
	hs.verticesUp = 0
	hs.direction = 0
	hs.speed = 0.015
	hs.delay = Math.floor(0 + 0.2 * Math.random())
	hs.start = Math.floor(0 + 0.2 * Math.random())

	horseShadows.push(hs)
}
function updatePositionsHorseShadow(data, time) {
	var delta = 0.02
	var positions = data.geometry.attributes.position
	var initialPositions = data.geometry.attributes.initialPosition

	var count = positions.count

	var resetPos = false
	if (data.position.z > 4) {
		resetPos = true
	}
	for (var i = 0; i < count; i++) {
		if (resetPos) {
			var ix = initialPositions.getX(i)
			var iy = initialPositions.getY(i)
			var iz = initialPositions.getZ(i)
			positions.setXYZ(i, ix, iy, iz)
		} else {
			var px = positions.getX(i)
			var py = positions.getY(i)
			var pz = positions.getZ(i)

			positions.setXYZ(
				i,
				px,
				py,
				pz + Math.abs(pz + 3) * randomFloat(0.01, 0.03)
			)
		}
		// rising up
	}

	positions.needsUpdate = true
}
function createLensFlare() {
	const customLensFlare = new CustomLensFlare(scene, manager);
	movingLight = customLensFlare.light;
}
function onTouchEnd() {
	if (idleWeight == 1 || runWeight == 1 || walkWeight == 1) {
		changeAnimation()
	}
}
function calcFootsPos() {
	var i = 0
	foots.forEach((foot) => {
		var pos = footsBone[i].getWorldPosition(new THREE.Vector3())
		if (pos.y < 0.02) {
			foot.visible = true
			var pos11 = new THREE.Vector3()
			pos11.y -= 0.01
			footsBone[i].getWorldPosition(pos11)
			foot.position.set(pos11.x, pos11.y - 0.05, pos11.z)
			// console.log(Date.now());
		} else {
			foot.visible = false
		}
		i++
	})
}
function createLights() {
	light = new LightGlobal();
	scene.add(light.value)
}
function onMouseMove(event) {
	event.preventDefault();
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	if (prevPosX == 0) prevPosX = mouse.x;
	newLookAtPos.z += prevPosX - mouse.x;
	prevPosX = mouse.x;

	camera.lookAt(newLookAtPos);

	var vec = new THREE.Vector3();
	var pos = new THREE.Vector3();
	vec.set(
		(event.clientX / window.innerWidth) * 2 - 1,
		-(event.clientY / window.innerHeight) * 2 + 1,
		0.5
	);
	vec.unproject(camera);
	vec.sub(camera.position).normalize();
	const distance = -camera.position.z / vec.z;
	pos.copy(camera.position).add(vec.multiplyScalar(distance));
	if (movingLight == null) return;
	movingLight.position.set(pos.x, pos.y, pos.z);
}
function onClick(event) {
	// if (horseShadows.length < 3) return
	event.preventDefault()
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
	raycaster.setFromCamera(mouse, camera)

	var intersections = raycaster.intersectObjects(scene.children, true)

	if (
		intersections.length > 0 &&
		(idleWeight == 1 || runWeight == 1 || walkWeight == 1)
	) {
		var object = intersections[0].object
		if (
			object.type === 'LineSegments' ||
			object.type === 'SkinnedMesh' ||
			object.type === 'SkeletonHelper'
		) {
			changeAnimation()
		}
	}
	if (sound != null) sound.play()
}
function createPanel() {
	settings = new Settings()
		.setActions(idleAction, walkAction, runAction)
		.setCallbackActions(activateAllActions, deactivateAllActions, pauseAllActions, toSingleStepMode)
		.setCrossfadeCallback(prepareCrossFade)
		.setData();

	// Need only to debug animation crossfade.
	// Depends on settings. Must be combined with renderPass
	// const panel = new Panel(settings);
	// crossFadeControls = panel.crossFadeControls;
}
function deactivateAllActions() {
	actions.forEach(function (action) {
		action.stop()
	})
}
function activateAllActions() {
	CrossFade.setWeight(idleAction, settings[Settings.SETTING_MODIFY_IDLE_WEIGHT]);
	CrossFade.setWeight(walkAction, settings[Settings.SETTING_MODIFY_WALK_WEIGHT]);
	CrossFade.setWeight(runAction, settings[Settings.SETTING_MODIFY_RUN_WEIGHT]);

	actions.forEach(function (action) {
		action.play();
	})
}
function pauseAllActions() {
	actions.forEach(function (action) {
		action.paused = true
	})
}
function unPauseAllActions() {
	actions.forEach(function (action) {
		action.paused = false
	})
}
function toSingleStepMode() {
	unPauseAllActions();

	singleStepMode = true;
	sizeOfNextStep = settings[Settings.SETTING_MODIFY_STEP_SIZE];
}
function prepareCrossFade(startAction, endAction, defaultAction, defaultDuration) {
	// Make sure that we don't go on in singleStepMode, and that all actions are unpaused
	singleStepMode = false;
	unPauseAllActions();
	// We are using composition here, for the better structure
	new CrossFade(settings, mixer).prepareCrossFade(startAction, endAction, defaultAction, defaultDuration);
}
function updateWeightSliders() {
	settings[Settings.SETTING_MODIFY_IDLE_WEIGHT] = idleWeight;
	settings[Settings.SETTING_MODIFY_WALK_WEIGHT] = walkWeight;
	settings[Settings.SETTING_MODIFY_RUN_WEIGHT] = runWeight;
}
function onWindowResize() {
	const width = window.innerWidth
	const height = window.innerHeight

	composer.setSize(width, height)

	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
	uniforms1.resolution.value.x = renderer.domElement.width
	uniforms1.resolution.value.y = renderer.domElement.height

	for (let i = 0; i < uniformsHorse.length; i++) {
		uniformsHorse[i].resolution.value.x = renderer.domElement.width
		uniformsHorse[i].resolution.value.y = renderer.domElement.height
	}
	renderer.setSize(window.innerWidth, window.innerHeight)
}
function createHorseShadow() {
	if (horseShadows.length > 2)
		return;
	var nowTime = Date.now();

	if (nowTime - lastCreatedHorseShadowTime > 4000) {
		lastCreatedHorseShadowTime = nowTime;
		createHorseShadows(horseMesh, 1);
	}
}
function animate() {
	calcFootsPos();
	if (materialShader) {
		var delta = 0.01;
		var aa = materialShader.uniforms.time.value;
		materialShader.uniforms.time.value += delta * 5;
		materialShader.uniforms.time.value = clock.elapsedTime;
	}

	requestAnimationFrame(animate);

	idleWeight = idleAction.getEffectiveWeight();
	walkWeight = walkAction.getEffectiveWeight();
	runWeight = runAction.getEffectiveWeight();

	// Update the panel values if weights are modified from "outside" (by crossfadings)
	updateWeightSliders();

	// Get the time elapsed since the last frame, used for mixer update (if not in single step mode)
	var mixerUpdateDelta = clock.getDelta();

	// If in single step mode, make one step and then do nothing (until the user clicks again)
	if (singleStepMode) {
		mixerUpdateDelta = sizeOfNextStep;
		sizeOfNextStep = 0;
	}

	// Update the animation mixer, the stats panel, and render this frame
	for (var i = 0; i < mixers.length; ++i) {
		mixers[i].update(mixerUpdateDelta);
	}
	mixer.update(mixerUpdateDelta);
	controls.update();
	uniforms1.time.value += mixerUpdateDelta * 5;
	uniforms2.time.value += mixerUpdateDelta * 4;
	var aa;
	for (var i = 0; i < uniformsHorse.length; i++) {
		aa = i - 5;
		if (aa == 0) aa = 1;
		uniformsHorse[i].time.value += mixerUpdateDelta * (3 / (i + 2));
		aa = Math.cos(uniformsHorse[i].time.value) * 0.004 * (1.0 / aa);

		if (horses[i] != null) {
			horses[i].translateZ(aa);
		}
	}
	var groundOffSet = mixerUpdateDelta / 3;

	groundOffSet += mixerUpdateDelta * walkWeight * 2 + mixerUpdateDelta * runWeight;

	particles.moveParticles(groundOffSet);
	ground.material.map.offset.x += groundOffSet;
	updateHorseShadowPos(groundOffSet);

	screenShake.update(camera);
	camera.lookAt(newLookAtPos);

	var time = Date.now() * 0.0005;

	light.value.position.x = Math.sin(time * 0.7) * 3;
	light.value.position.y = Math.abs(Math.cos(time * 0.5) * 1);
	light.value.position.z = Math.cos(time * 0.3) * 3;

	updateMirrorCamera();

	createHorseShadow();
	composer.render();
}

initShaders()
init()