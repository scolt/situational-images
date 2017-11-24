export default (data) => {
    let list = '';
    data.forEach((element) => {
      list += `
        <li id="${element.pack}">
            <img src="packs/${element.pack}/${element.logo}">
            <h2>${element.description}</h2>
        </li>
      `;  
    });
    return `
        <h1>You can choose any of provided packs</h1>
        <ul class="home">${list}</ul>
    `
};