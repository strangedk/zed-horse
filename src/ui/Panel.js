import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import Settings from '../settings/Settings';

class Panel {
    constructor(settings) {
        this.crossFadeControls = [];

        const {crossFadeControls} = this;

        const panel = new GUI();
        const folder = panel.addFolder('Crossfading');
        
        crossFadeControls.push(folder.add(settings, Settings.SETTING_FROM_GALLOP_TO_WALK));
        crossFadeControls.push(folder.add(settings, Settings.SETTING_FROM_WALK_TO_GALLOP));
        crossFadeControls.push(folder.add(settings, Settings.SETTING_FROM_GALLOP_TO_JUMP));
        crossFadeControls.push(folder.add(settings, Settings.SETTING_FROM_JUMP_TO_GALLOP));
        folder.add(settings, Settings.SETTING_USE_DEFAULT_DURATION);
        folder.add(settings, Settings.SETTING_USE_CUSTOM_DURATION, 0, 10, 0.01);
    
        crossFadeControls.forEach(function (control) {
            // Oh my God... sorry, it's terrible, but I have no time to fix this (M.Novko)
            control.classList1 = control.domElement.parentElement.parentElement.classList;
            control.classList2 = control.domElement.previousElementSibling.classList;
    
            control.setDisabled = function () {
                control.classList1.add('no-pointer-events');
                control.classList2.add('control-disabled');
            }
    
            control.setEnabled = function () {
                control.classList1.remove('no-pointer-events');
                control.classList2.remove('control-disabled');
            }
        })
        panel.close();
    }
}

export default Panel;