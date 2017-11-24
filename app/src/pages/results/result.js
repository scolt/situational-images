import './result.css';
import result from './result.tpl';
import noResult from './no.result.tpl';
import Page from '../../core/page';
import { stateService, packService } from '../../services';

export default class Search extends Page {
    constructor(container) {
        super(container, null);
    }

    init() {
        super.init();
        const { id, query } = stateService.getParams();
        packService.getImagesByTag(id, query).then((images) => {
            this.viewData = {id, query, images};
            if (images.length) {
                this.template = result;
                this.render();
                flex_masonry('.masonry');
            } else {
                this.template = noResult;
                this.viewData.tags = packService.getAllTags(id);
                this.render();
            }            
        });
    }

    viewAfterRender() {
        const lis = Array.prototype.slice.call(this.container.querySelectorAll('img'));
        const handler = (e) => this.openCopyWindow(e.currentTarget.src);
        lis.forEach((li) => {
            this.bindEvent('click', li, handler);
        });
    }

    openCopyWindow(src) {
        try {
            const copyTextarea = document.querySelector('.copy-area');
            const panel = document.querySelector('.panel');
            copyTextarea.value = src;
            copyTextarea.select();
            const successful = document.execCommand('copy');
            if (!successful) {
                throw new Error();
            } else {
                panel.className += ' active';
                setTimeout(() => {
                    panel.className = panel.className.replace(' active', ''); 
                }, 1000);
            }
        } catch (err) {
            window.prompt('You can copy this link', src);
        }
    }
}