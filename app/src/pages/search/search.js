import './search.css';
import tpl from './search.tpl';
import Page from '../../core/page';
import { stateService, packService } from '../../services';

export default class Search extends Page {
    constructor(container) {
        super(container, tpl);
    }

    init() {
        super.init();
        const packName = stateService.getParams().id;
        Promise.all([
            packService.getPackInfo(packName),
            packService.getAllImages(packName)
        ]).then((result) => {
            this.viewData.packName = stateService.getParams().id;
            this.viewData.logo = result[1].bg;
            this.render();
        });
    }

    viewAfterRender() {
        const button = this.container.querySelector('button');
        const input = this.container.querySelector('input');
        const handler = () => this.openResults(input.value);
        this.bindEvent('click', button, handler);
    }

    openResults(query) {
        const id = stateService.getParams().id
        stateService.go(`/search/${id}/results/${query}`);
    }
}