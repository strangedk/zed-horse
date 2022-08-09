import Settings from "../settings/Settings";

class CrossFade {
    constructor(settings, mixer) {
        this.settings = settings;
        this.mixer = mixer;

        this.executeCrossFade = (startAction, endAction, duration) => {
            // Not only the start action, but also the end action must get a weight of 1 before fading
            // (concerning the start action this is already guaranteed in this place)

            CrossFade.setWeight(endAction, 1)
            endAction.time = 0

            // Crossfade with warping - you can also try without warping by setting the third parameter to false

            startAction.crossFadeTo(endAction, duration, true)
        }

        this.synchronizeCrossFade = (startAction, endAction, duration) => {
            const { mixer, executeCrossFade } = this;
            mixer.addEventListener('loop', onLoopFinished);

            function onLoopFinished(event) {
                if (event.action === startAction) {
                    mixer.removeEventListener('loop', onLoopFinished);

                    executeCrossFade(startAction, endAction, duration);
                }
            }
        }

        this.getCrossFadeDuration = (defaultDuration) => {
            const { settings } = this;
            // Switch default crossfade duration <-> custom crossfade duration
            if (settings[Settings.SETTING_USE_DEFAULT_DURATION]) {
                return defaultDuration;
            } else {
                return settings[Settings.SETTING_USE_CUSTOM_DURATION];
            }
        }

        this.prepareCrossFade = (startAction, endAction, defaultAction, defaultDuration) => {
            // Switch default / custom crossfade duration (according to the user's choice)
            const duration = this.getCrossFadeDuration(defaultDuration);

            // If the current action is default 'idle' (duration 4 sec), execute the crossfade immediately;
            // else wait until the current action has finished its current loop
            if (startAction === defaultAction) {
                this.executeCrossFade(startAction, endAction, duration);
            } else {
                this.synchronizeCrossFade(startAction, endAction, duration);
            }
        }
    }
}

CrossFade.setWeight = (action, weight) => {
    action.enabled = true
    action.setEffectiveTimeScale(1)
    action.setEffectiveWeight(weight)
}

export default CrossFade;