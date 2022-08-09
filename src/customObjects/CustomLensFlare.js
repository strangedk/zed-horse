import * as THREE from 'three';
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare.js'

class CustomLensFlare {
    constructor(scene, manager) {
        this.scene = scene;

        this.createLensFlare = (manager) => {
            var textureLoader = new THREE.TextureLoader(manager);
            var textureFlare0 = textureLoader.load('./public/textures/lensflare/lensflare0.png');
            var textureFlare3 = textureLoader.load('./public/textures/lensflare/lensflare3.png');
        
            this.addLight(0.095, 0.5, 0.9, 0, 0.5, 20, new THREE.PointLight(0xffffff, 0.1, 20), textureFlare0, textureFlare3);
        }

        this.addLight = (h, s, l, x, y, z, pointLight, texture1, texture2) => {
            this.light = pointLight;
            this.light.color.setHSL(h, s, l);
            this.light.position.set(x, y, z);
            this.scene.add(this.light);
    
            var lensflare = new Lensflare();
            lensflare.addElement(new LensflareElement(texture1, 70, 0, this.light.color));
            lensflare.addElement(new LensflareElement(texture2, 60, 0.6));
            lensflare.addElement(new LensflareElement(texture2, 70, 0.7));
            lensflare.addElement(new LensflareElement(texture2, 120, 0.9));
            lensflare.addElement(new LensflareElement(texture2, 70, 1));
            this.light.add(lensflare);
        }

        this.createLensFlare(manager);
    }
}

export default CustomLensFlare;