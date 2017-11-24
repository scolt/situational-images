import './styles.css';
import Router from './core/router';

import Home from './pages/home/home';
import Search from './pages/search/search';
import Result from './pages/results/result';
import '../libs/flex_masonry.js';

const container = document.querySelector('#view');

const home = new Home(container);
const search = new Search(container);

const router = new Router({
    '/': new Home(container),
    '/search/:id': new Search(container),
    '/search/:id/results/:query': new Result(container),
    '/search/:id/results': new Result(container),
    '*': new Home(container)
});