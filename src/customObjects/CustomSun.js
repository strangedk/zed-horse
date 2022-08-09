import * as THREE from 'three';
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare.js'

class CustomSun {
    constructor(scene, manager) {
        this.scene = scene;

        this.createLensFlareSun = (manager) => {
            const textureLoader = new THREE.TextureLoader(manager);
            const textureFlareLight = textureLoader.load('./public/textures/lensflare/lensflare3.png');
            const textureFlare = textureLoader.load('./public/textures/lensflare/lensflare0.png');            
            this.addLight(0.08, 0.8, 0.5, 2, 1.4, 24, new THREE.PointLight(0xffffff, 2, 3), textureFlare, textureFlareLight);
        }

        this.addLight = (h, s, l, x, y, z, pointLight, texture1, texture2) => {
            this.light = pointLight;
            this.light.color.setHSL(h, s, l);
            this.light.position.set(x, y, z);
            this.scene.add(this.light);

            const lensflare = new Lensflare();
            lensflare.addElement(new LensflareElement(texture1, 170, 0, this.light.color));
            lensflare.addElement(new LensflareElement(texture2, 60, 0.6, new THREE.Color(0xfffcf5)));
            lensflare.addElement(new LensflareElement(texture2, 70, 0.7));
            lensflare.addElement(new LensflareElement(texture2, 120, 0.9, new THREE.Color(0xffff00)));
            lensflare.addElement(new LensflareElement(texture2, 70, 1));
            this.light.add(lensflare);
        }

        this.createLensFlareSun(manager);
    }
}

export default CustomSun;