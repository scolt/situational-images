class StateService {
    go(state) {
        window.location.hash = state;
    }

    getParams() {
        return this.params;
    }

    setParams(params) {
        this.params = params;
    }
}

export let stateService = new StateService(); 