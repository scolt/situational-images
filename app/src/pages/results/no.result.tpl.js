export default (data) => {
    const notFound = '<div class="not-found">Nothing found for this search :(</div>'
    const message = `Result for "${data.query}"`;
    let list = '<div class="tags">';
    data.tags.forEach((element) => {
      list += `
          <a href="#/search/${data.id}/results/${element}/">
            ${element}
          </a>
      `;  
    });
    list += '</div>';

    return `
        <h1>${data.query ? message : 'All results'} shown</h1>
        ${notFound}
        <div class="not-found">You can try to find something below:</div>
        ${list}
    `;
};