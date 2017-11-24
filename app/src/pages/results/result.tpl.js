export default (data) => {
    let list = '<div class="grid masonry">';
    data.images.forEach((element) => {
      list += `
          <img src="packs/${data.id}/${element.src}">
      `;  
    });
    list += '</div>';

    const notFound = '<div class="not-found">Nothing found for this search :(</div>'

    const message = `Result for "${data.query}"`;

    return `
        <h1>${data.query ? message : 'All results'} shown</h1>
        ${list}
        <textarea class="copy-area"></textarea>
        <div class="panel">Copied to your clipboard!</div>
    `;
};