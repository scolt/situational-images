export default (data) => {
    return `
        <div class="search" style="background-image: url(packs/${data.packName}/${data.logo})">
            <div class="search-bar">
                <input type="text" placeholder="Typo anything (e.g. обнимашки)">
                <button>Search</button>
            </div>
        </div>
    `
}