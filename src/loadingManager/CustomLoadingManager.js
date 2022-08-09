import * as THREE from 'three';

class CustomLoadingManager {
    constructor() {
        this.manager = new THREE.LoadingManager();

        this.setFrameId = frameID => {
            this.frameID = frameID;
            return this;
        }

        this.setVisibleObjects = (...rest) => {
            this.visibleObjects = Array.from(rest);
            return this;
        }

        this.setInvisibleObjects = (...rest) => {
            this.invisibleObjects = Array.from(rest);
            return this;
        }

        this.setProgressBarData = (progressBar, progressBarAnimate) => {
            this.progressBar = progressBar;
            this.progressBarAnimate = progressBarAnimate;
            return this;
        }

        this.init = () => {
            const { manager, frameID, visibleObjects, invisibleObjects, progressBar, progressBarAnimate } = this;
            let itemsLoadedWatch, itemsTotalWatch;
            
            manager.onStart = function (url, itemsLoaded, itemsTotal) {
                itemsLoadedWatch = itemsLoaded;
                itemsTotalWatch = itemsTotal;

                console.log(`Start loading file: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files.`);
                if (frameID !== null)
                    return;
                progressBarAnimate((itemsLoaded / itemsTotal) * 100);
            }

            manager.onLoad = function () {
                cancelAnimationFrame(frameID);

                invisibleObjects.forEach(element => {
                    element.style.visibility = 'hidden';
                });

                visibleObjects.forEach(element => {
                    element.style.visibility = 'visible';
                });
            }

            manager.onProgress = function (url, itemsLoaded, itemsTotal) {
                progressBar.style.width = (itemsLoaded / itemsTotal) * 100 + '%';
                console.info(`Loading file: ${url}. \nLoaded ${itemsLoaded} of ${itemsTotal} files.`);
            }
            manager.onError = function (url) {
                console.error(`There was an error loading ${url}`);
                progressBar.style.backgroundColor = 'red';
            }

            return this;
        }
    }
}

export default CustomLoadingManager;