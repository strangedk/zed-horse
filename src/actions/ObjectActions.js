

class ObjectActions {
    constructor() {
        this.setSetting = (settings) => {
            this.settings = settings;
            return this;
        }

        this.setActions = (idle, walk, run) => {
            this.idleAction = idle;
            this.walkAction = walk;
            this.runAction = run;
            return this;
        }

        this.singleStepCallback;

        function deactivateAllActions() {
            actions.forEach(function (action) {
                action.stop()
            })
        }

        this.activateAllActions = () => {
            CrossFade.setWeight(idleAction, settings[Settings.SETTING_MODIFY_IDLE_WEIGHT]);
            CrossFade.setWeight(walkAction, settings[Settings.SETTING_MODIFY_WALK_WEIGHT]);
            CrossFade.setWeight(runAction, settings[Settings.SETTING_MODIFY_RUN_WEIGHT]);

            actions.forEach(function (action) {
                action.play();
            })
        }
        
        this.pauseAllActions = () => { actions.forEach(action => action.paused = true) }
        this.unPauseAllActions = () => { actions.forEach(action => action.paused = false) }

        function toSingleStepMode(callback) { 
            this.unPauseAllActions();

            callback();
        }
    }
}

export default ObjectActions;