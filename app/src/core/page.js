import spinner from '../components/spinner.tpl';

export default class Page {
    constructor(container, tpl) {
        this.viewData = {};
        this.container = container;
        this.template = tpl;
        this.binders = {
            click: []
        }
    }

    init() {
        this.viewBeforeRender();
    }

    render() {
        this.container.innerHTML = this.template(this.viewData);
        this.viewAfterRender && this.viewAfterRender();
    }

    bindEvent(event, element, handler) {
        this.binders[event].push({
            el: element,
            handler: handler
        });
        element.addEventListener('click', (e) => {
            handler(e);
        });
    }

    viewBeforeRender() {
        this.container.innerHTML = spinner();
    }

    viewAfterRender() {}

    viewBeforeClose() {
        Object.keys(this.binders).forEach(key => {
            this.binders[key].forEach(item => {
                item.el.removeEventListener(key, item.handler);
            })
        });
    }
}