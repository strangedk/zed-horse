const MODELS = [
	{ name: 'newhorse1' }, //1
	{ name: 'newhorse2' },
	{ name: 'newhorse3' },
	{ name: 'newhorse4' },
	{ name: 'newhorse5' },
	{ name: 'newhorse6' },
	{ name: 'newhorse7' },
	{ name: 'newhorse8' },
	{ name: 'newhorse9' },
	{ name: 'newhorse10' }, //10
]
const UNITS = [
	{
		modelName: 'newhorse1', // Will use the 3D model from file models/gltf/Soldier.glb
		meshName: 'Horse_E_SkiningHorse', // Name of the main mesh to animate
		position: { x: 0.8, y: 0, z: 0.5 }, // Where to put the unit in the scene
		scale: 0.4, // Scaling of the unit. 1.0 means: use original size, 0.1 means "10 times smaller", etc.
		animationName: 'gallop1', // Name of animation to run
		textureName: '1',
	},
	{
		modelName: 'newhorse2',
		meshName: 'Horse_E_SkiningHorse',
		position: { x: 1.6, y: 0, z: 0.6 },
		scale: 0.4,
		animationName: 'gallop2',
		textureName: '2',
	},
	{
		modelName: 'newhorse3',
		meshName: 'Horse_E_SkiningHorse',
		position: { x: -0.8, y: 0, z: 0.4 },
		scale: 0.4,
		animationName: 'gallop3',
		textureName: '3',
	},
	{
		modelName: 'newhorse4',
		meshName: 'Horse_E_SkiningHorse',
		position: { x: -1.6, y: 0, z: 0.7 },
		scale: 0.4,
		animationName: 'gallop1',
		textureName: '4',
	},
	{
		modelName: 'newhorse5',
		meshName: 'Horse_E_SkiningHorse',
		position: { x: 2, y: 0, z: 2 },
		scale: 0.4,
		animationName: 'gallop2',
		textureName: '5',
	},
	{
		modelName: 'newhorse6',
		meshName: 'Horse_E_SkiningHorse',
		position: { x: 0.4, y: 0, z: 1.9 },
		scale: 0.4,
		animationName: 'gallop3',
		textureName: '6',
	},
	{
		modelName: 'newhorse7',
		meshName: 'Horse_E_SkiningHorse',
		position: { x: -0.4, y: 0, z: 2.1 },
		scale: 0.4,
		animationName: 'gallop1',
		textureName: '7',
	},
	{
		modelName: 'newhorse8',
		meshName: 'Horse_E_SkiningHorse',
		position: { x: -1.2, y: 0, z: 2.3 },
		scale: 0.4,
		animationName: 'gallop2',
		textureName: '8',
	},
	{
		modelName: 'newhorse9',
		meshName: 'Horse_E_SkiningHorse',
		position: { x: 1.2, y: 0, z: 2.2 },
		scale: 0.4,
		animationName: 'gallop3',
		textureName: '9',
	},
	{
		modelName: 'newhorse10',
		meshName: 'Horse_E_SkiningHorse',
		position: { x: 0, y: 0, z: 0.6 },
		scale: 0.4,
		animationName: 'gallop2',
		textureName: '10',
	},
];

export { MODELS, UNITS }
