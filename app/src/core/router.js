import { stateService } from '../services';

export default class Router {
    constructor(routes) {
        this.routes = routes;
        window.addEventListener('hashchange', () => {
            this.openNewState();
        });
        this.openNewState();
    }

    openNewState() {
        let state =  this.parseCurrentHash();
        if (!state) {
            state = {
                component: this.routes['*'],
            }
        }
        stateService.setParams(state.params);
        state.component.init();
    }

    parseCurrentHash() {
        const currentRoute = window.location.hash.replace('#', '') || '/';
        const currentRoutesPaths = currentRoute.split('/').filter((path) => !!path);
        let exactRoute = null;
        Object.keys(this.routes).forEach(route => {
            const possibleRoutesPaths = route.split('/').filter((path) => !!path);
            if (possibleRoutesPaths.length === currentRoutesPaths.length && !exactRoute) {
                const possibleParams = {};
                const filteredPath = possibleRoutesPaths.filter((path, index) => {
                    let isMatch = false;
                    if (path[0] === ':' && currentRoutesPaths[index]) {
                        possibleParams[path.replace(':', '')] = currentRoutesPaths[index];
                        isMatch = true;
                    } else if (path === currentRoutesPaths[index]) {
                        isMatch = true;
                    }
                    return isMatch;
                });

                if (filteredPath.length === possibleRoutesPaths.length) {
                    exactRoute = {
                        path: route,
                        component: this.routes[route],
                        params: possibleParams
                    }
                }
            }
        });

        return exactRoute;
    };
} 