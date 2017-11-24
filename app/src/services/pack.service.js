import preload from '../utility/preload';

const PACK_BASE_PATH = 'packs';

class PackService {
    constructor() {
        this.cache = {
            packs: null,
            images: {}
        };
    }

    getPackInfo(packName) {
        return this.getPacks().then(packs => packs.find(item => item.pack === packName));
    }

    getPacks() {
        return new Promise((resolve, reject) => {
            if (this.cache.packs) {
                resolve(this.cache.packs);
                return;
            }

            fetch('packs/all.json')
                .then(res => res.json())
                .then(result => {
                    this.cache.packs = result;
                    resolve(this.cache.packs);
                });
        });
    }

    getAllImages(packName) {
        return new Promise((resolve, reject) => {
            if (this.cache.images[packName]) {
                resolve(this.cache.images[packName]);
                return;
            }

            fetch(`${PACK_BASE_PATH}/${packName}/pack.description.json`)
                .then(res => res.json())
                .then(result => {
                    this.cache.images[packName] = result;
                    resolve(this.cache.images[packName]);
                });
        });
    }

    getImagesByTag(packName, query) {
        return new Promise((resolve, reject) => {
            this.getAllImages(packName).then(({images}) => {
                let filtered = images;
                if (query) {
                    filtered = images.filter(image => 
                        image.tags.join().toLowerCase().indexOf(query) > -1
                    );
                }
                const imagesSrcs = filtered.map(item => `${PACK_BASE_PATH}/${packName}/${item.src}`);
                preload(imagesSrcs).then(() => resolve(filtered));
            })
        });
    }

    getAllTags(packName) {
        const result = [];
        this.cache.images[packName].images.forEach((image) => {
            image.tags.forEach(tag => {
                if (result.indexOf(tag) === -1) {
                    result.push(tag);
                }
            })
        });
        return result.sort(() => Math.random() - 0.5);
    }
}

export let packService = new PackService(); 