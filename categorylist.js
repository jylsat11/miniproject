const SERVER_URL = 'http://127.0.0.1:8000'

async function getCategories() {
    let response = await fetch(`${SERVER_URL}/blog/category`);
    let data = await response.json();
    return data
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  
async function insertCategories() {
    let categories = await getCategories();
    categories.forEach(category => {
        document.body.insertAdjacentHTML('beforeend', `
            <div id="${category.id}">
                <h1>${category.id}</h1>
                <h1>${category.name}</h1>
            </div>
        `)
    })
}

insertCategories()