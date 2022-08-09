import * as THREE from 'three'

class ShadersData {
    constructor() {
        this.uniforms = {
            time: { value: 1.0 },
            u_resolution: { value: new THREE.Vector2() },
            u_mouse: { value: new THREE.Vector2() },
            u_helmet_texture: { value: null },
        };
        this.uniforms1 = {
            time: { type: 'f', value: 1.0 },
            resolution: { type: 'v2', value: new THREE.Vector2() },
            u_helmet_texture: { value: null },
        };
        this.uniforms2 = {
            time: { type: 'f', value: 1.0 },
            resolution: { type: 'v2', value: new THREE.Vector2() },
            u_helmet_texture: { value: null },
        };
        this.shadMat = new THREE.ShaderMaterial({
            uniforms: this.uniforms1,
            vertexShader: document.getElementById('vertexShader').textContent,
            fragmentShader: document.getElementById('fragmentShader').textContent,
            // wireframe: true,
            skinning: true,
        });
        this.uniformsHorse = [
            {
                time: { type: 'f', value: 1.0 },
                resolution: { type: 'v2', value: new THREE.Vector2() },
                u_helmet_texture: { value: null },
            },
            {
                time: { type: 'f', value: 1.0 },
                resolution: { type: 'v2', value: new THREE.Vector2() },
                u_helmet_texture: { value: null },
            },
            {
                time: { type: 'f', value: 1.0 },
                resolution: { type: 'v2', value: new THREE.Vector2() },
                u_helmet_texture: { value: null },
            },
            {
                time: { type: 'f', value: 1.0 },
                resolution: { type: 'v2', value: new THREE.Vector2() },
                u_helmet_texture: { value: null },
            },
            {
                time: { type: 'f', value: 1.0 },
                resolution: { type: 'v2', value: new THREE.Vector2() },
                u_helmet_texture: { value: null },
            },
            {
                time: { type: 'f', value: 1.0 },
                resolution: { type: 'v2', value: new THREE.Vector2() },
                u_helmet_texture: { value: null },
            },
            {
                time: { type: 'f', value: 1.0 },
                resolution: { type: 'v2', value: new THREE.Vector2() },
                u_helmet_texture: { value: null },
            },
            {
                time: { type: 'f', value: 1.0 },
                resolution: { type: 'v2', value: new THREE.Vector2() },
                u_helmet_texture: { value: null },
            },
            {
                time: { type: 'f', value: 1.0 },
                resolution: { type: 'v2', value: new THREE.Vector2() },
                u_helmet_texture: { value: null },
            },
            {
                time: { type: 'f', value: 1.0 },
                resolution: { type: 'v2', value: new THREE.Vector2() },
                u_helmet_texture: { value: null },
            },
            {
                time: { type: 'f', value: 1.0 },
                resolution: { type: 'v2', value: new THREE.Vector2() },
                u_helmet_texture: { value: null },
            },
        ];
        this.shaderHorse = [
            new THREE.ShaderMaterial({
                uniforms: this.uniformsHorse[0],
                vertexShader: document.getElementById('vertexShader').textContent,
                fragmentShader: document.getElementById('fragmentShader1').textContent,
                skinning: true,
            }),
            new THREE.ShaderMaterial({
                uniforms: this.uniformsHorse[1],
                vertexShader: document.getElementById('vertexShader').textContent,
                fragmentShader: document.getElementById('fragmentShader2').textContent,
                skinning: true,
            }),
            new THREE.ShaderMaterial({
                uniforms: this.uniformsHorse[2],
                vertexShader: document.getElementById('vertexShader').textContent,
                fragmentShader: document.getElementById('fragmentShader3').textContent,
                skinning: true,
            }),
            new THREE.ShaderMaterial({
                uniforms: this.uniformsHorse[3],
                vertexShader: document.getElementById('vertexShader').textContent,
                fragmentShader: document.getElementById('fragmentShader4').textContent,
                skinning: true,
            }),
            new THREE.ShaderMaterial({
                uniforms: this.uniformsHorse[4],
                vertexShader: document.getElementById('vertexShader').textContent,
                fragmentShader: document.getElementById('fragmentShader5').textContent,
                skinning: true,
            }),
            new THREE.ShaderMaterial({
                uniforms: this.uniformsHorse[5],
                vertexShader: document.getElementById('vertexShader').textContent,
                fragmentShader: document.getElementById('fragmentShader6').textContent,
                skinning: true,
            }),
            new THREE.ShaderMaterial({
                uniforms: this.uniformsHorse[6],
                vertexShader: document.getElementById('vertexShader').textContent,
                fragmentShader: document.getElementById('fragmentShader6').textContent,
                skinning: true,
            }),
            new THREE.ShaderMaterial({
                uniforms: this.uniformsHorse[7],
                vertexShader: document.getElementById('vertexShader').textContent,
                fragmentShader: document.getElementById('fragmentShader6').textContent,
                skinning: true,
            }),
            new THREE.ShaderMaterial({
                uniforms: this.uniformsHorse[8],
                vertexShader: document.getElementById('vertexShader').textContent,
                fragmentShader: document.getElementById('fragmentShader6').textContent,
                skinning: true,
            }),
            new THREE.ShaderMaterial({
                uniforms: this.uniformsHorse[9],
                vertexShader: document.getElementById('vertexShader').textContent,
                fragmentShader: document.getElementById('fragmentShader6').textContent,
                skinning: true,
            }),
            new THREE.ShaderMaterial({
                uniforms: this.uniformsHorse[10],
                vertexShader: document.getElementById('vertexShader').textContent,
                fragmentShader: document.getElementById('fragmentShader').textContent,
                skinning: true,
            }),
        ];
    }
}

export default ShadersData;