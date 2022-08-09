import * as THREE from 'three';
import { randomInt } from '../math/MathHelpers';

class Particles {
    constructor() {
        this.particles = [];

        this.moveParticles = (time) => {
            this.particles.forEach((particle) => {
                particle.position.z += particle.speed * time
                if (particle.position.z > particle.maxZ) {
                    particle.position.z = particle.minZ
                }
            })
        }

        this.hide = () => {
            if (this.particles)
                this.particles.forEach(p => p.visible = false);
        }

        this.show = () => {
            if (this.particles)
                this.particles.forEach(p => p.visible = true);
        }

        this.createParicles = () => {
            const particleMaterial = new THREE.MeshBasicMaterial({
                color: 0xffaaf1,
                opacity: 0.5,
            })

            const colorCold = Math.random() * 0x101010;
            const colorWarn = 0xd3f208; // Like ZEST logo

            if (Math.random() > 0.8) {
                particleMaterial.color.setHex(colorWarn);
                particleMaterial.opacity = 0.7;
            } else {
                particleMaterial.color.setHex(colorCold);
                particleMaterial.opacity = 0.5;
            }

            const particle = new THREE.Mesh(
                new THREE.BoxGeometry(0.03, 0.02, 1),
                particleMaterial
            )

            particle.moving = false
            particle.speed = randomInt(6, 30)
            particle.maxZ = randomInt(20, 30)
            particle.minZ = randomInt(-30, -20)
            particle.receiveShadow = true;
            scene.add(particle)
            const sr = randomInt(3, 6)
            const r = randomInt(0, 360)
            const x = sr * Math.cos(r)
            const y = Math.abs(sr * Math.sin(r)) - 1
            const z = particle.minZ
            particle.position.set(x, y, z)

            this.particles.push(particle)
        }
    }
}

export default Particles;