import './home.css';
import tpl from './home.tpl';
import Page from '../../core/page';
import { stateService } from '../../services';
export default class Home extends Page {
    constructor(container) {
        super(container, tpl);
    }

    init() {
        super.init();
        this.fetchList().then((result) => {
            this.viewData = result;
            this.render()
        });
    }

    fetchList() {
        return fetch('packs/all.json').then((res) => res.json());
    }

    viewAfterRender() {
        const lis = this.container.querySelectorAll('li');
        const handler = (e) => this.openSearchWithin(e.currentTarget.id);
        lis.forEach((li) => {
            this.bindEvent('click', li, handler);
        });
    }

    openSearchWithin(id) {
        stateService.go(`/search/${id}`);
    }
}