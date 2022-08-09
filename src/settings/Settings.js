class Settings {
    constructor() {
        this.setActions = (idle, walk, run) => {
            this.idleAction = idle;
            this.walkAction = walk;
            this.runAction = run;

            return this;
        }

        this.setCallbackActions = (activateAllActions, deactivateAllActions, pauseContinue, toSingleStepMode) => {
            this.activateAllActions = activateAllActions;
            this.deactivateAllActions = deactivateAllActions;
            this.pauseContinue = pauseContinue;
            this.toSingleStepMode = toSingleStepMode;

            return this;
        }

        this.setCrossfadeCallback = (prepareCrossFade) => {
            this.prepareCrossFade = prepareCrossFade;

            return this;
        }

        this.setData = () => {
            const {walkAction, runAction, idleAction} = this;
            const defaultAction = idleAction;

            this[Settings.SETTING_SHOW_MODEL] = true;
            this[Settings.SETTING_SHOW_SKELETON] = false;
            this[Settings.SETTING_DEACTIVATE_ALL] = this.deactivateAllActions;
            this[Settings.SETTING_ACTIVATE_ALL] = this.activateAllActions;
            this[Settings.SETTING_PAUSE_CONTINUE] = this.pauseContinue;
            this[Settings.SETTING_MAKE_SINGLE_STEP] = this.toSingleStepMode;
            this[Settings.SETTING_MODIFY_STEP_SIZE] = 0.05;
            this[Settings.SETTING_FROM_GALLOP_TO_WALK] = () => this.prepareCrossFade(walkAction, idleAction, defaultAction, 0.2);
            this[Settings.SETTING_FROM_WALK_TO_GALLOP] = () => this.prepareCrossFade(idleAction, walkAction, defaultAction, 0.2);
            this[Settings.SETTING_FROM_GALLOP_TO_JUMP] = () => this.prepareCrossFade(walkAction, runAction, defaultAction, 0.2);
            this[Settings.SETTING_FROM_JUMP_TO_GALLOP] = () => this.prepareCrossFade(runAction, walkAction, defaultAction, 0.9);
            this[Settings.SETTING_USE_DEFAULT_DURATION] = true;
            this[Settings.SETTING_USE_CUSTOM_DURATION] = 0.1;
            this[Settings.SETTING_MODIFY_IDLE_WEIGHT] = 1.0;
            this[Settings.SETTING_MODIFY_WALK_WEIGHT] = 0.0;
            this[Settings.SETTING_MODIFY_RUN_WEIGHT] = 0.0;
            this[Settings.SETTING_MODIFY_TIME_SCALE] = 1.0;

            return this;
        }
    }
}

Settings.SETTING_SHOW_MODEL = 'show model';
Settings.SETTING_SHOW_SKELETON = 'show skeleton';
Settings.SETTING_DEACTIVATE_ALL = 'deactivate all';
Settings.SETTING_ACTIVATE_ALL = 'activate all';
Settings.SETTING_PAUSE_CONTINUE = 'pause/continue';
Settings.SETTING_MAKE_SINGLE_STEP = 'make single step';
Settings.SETTING_MODIFY_STEP_SIZE = 'modify step size';
Settings.SETTING_FROM_GALLOP_TO_WALK = 'from gallop to walk';
Settings.SETTING_FROM_WALK_TO_GALLOP = 'from walk to gallop';
Settings.SETTING_FROM_GALLOP_TO_JUMP = 'from gallop to jump';
Settings.SETTING_FROM_JUMP_TO_GALLOP = 'from jump to gallop';
Settings.SETTING_USE_DEFAULT_DURATION = 'use default duration';
Settings.SETTING_USE_CUSTOM_DURATION = 'use custom duration';
Settings.SETTING_MODIFY_IDLE_WEIGHT = 'modify idle weight';
Settings.SETTING_MODIFY_WALK_WEIGHT = 'modify walk weight';
Settings.SETTING_MODIFY_RUN_WEIGHT = 'modify run weight';
Settings.SETTING_MODIFY_TIME_SCALE = 'modify time scale';

export default Settings;