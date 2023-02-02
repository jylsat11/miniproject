const SERVER_URL = 'http://127.0.0.1:8000'

async function getCategories() {
    let response = await fetch(`${SERVER_URL}/blog/category`);
    let data = await response.json();
    return data
}

async function insertCategories() {
    let categories = await getCategories();
    categories.forEach(category => {
        let select = document.getElementById('category')[0];
        let option = document.createElement('option');
        option.setAttribute('value',`${category.id}`);
        option.innerText = `${category.name}`;
        select.append(option);
    })
}

async function insertCategoriesFilter() {
    let categories = await getCategories();
    categories.forEach(category => {
        let select = document.getElementById('category1');
        let option = document.createElement('option');
        option.setAttribute('value',`${category.id}`);
        option.innerText = `${category.name}`;
        select.append(option);
    })
}

async function getFilteredArticles() {
    let response = await fetch(`${SERVER_URL}/blog/article/`);
    let data = await response.json(); // 여기도 꼭 await 를 해주어야 함
    return data;
  }
  
  async function insertFilteredArticle() {
      let articles = await getFilteredArticles();
      articles.forEach((article) => {
          document.body.insertAdjacentHTML('beforeEnd', `
              <div id="${article.id}">
                  <h1 onclick="showContentModal(event)">${article.title}</h1>
              </div>
          `)
      })
  }
  
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  
async function deletePost(id) {
    let token = getCookie('access_token')
    let response = await fetch(`${SERVER_URL}/blog/article/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    if (response.status === 204) { // DELETE 요청 성공
        let post = document.getElementById(id);
        post.remove();
    }
}

async function getArticles() {
  let response = await fetch(`${SERVER_URL}/blog/article`);
  let data = await response.json(); // 여기도 꼭 await 를 해주어야 함
  return data;
}

async function insertArticles() {
    let articles = await getArticles();
    articles.forEach((article) => {
        document.body.insertAdjacentHTML('beforeEnd', `
            <div id="${article.id}">
                <h1 onclick="showContentModal(event)">${article.title}</h1>
            </div>
        `)
    })
}

async function getArticle(id) {
    let response = await fetch(`${SERVER_URL}/blog/article/${id}`);
    let data = await response.json(); // 여기도 꼭 await 를 해주어야 함
    return data;
  }

async function insertArticle(id) {
    let article = await getArticle(id);
    let item = document.getElementById('item1');
    item.innerHTML = `
        <div id="${article.id}">
            <h1>${article.title}</h1>
            <p>${article.author}<p>
            <p>${article.content}<p>
            <p>${article.image}<p>
            <p>${article.category.id}<p>
            <p>${article.category.name}<p>
            <p>${article.created_time}<p>
            <p>${article.updated_time}<p>
            <button onclick="closeContentModal()">창닫기</button>
        </div>
        `

}

async function postArticle(article) {
    let token = getCookie('access_token');
    let response = await fetch(`${SERVER_URL}/blog/article`, {
        method:'POST',
        body: article,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    let data = await response.json();
    return data
}

async function submitArticle() {
    let form = document.getElementById('form');
    let formData = new FormData(form);
    let result = await postArticle(formData);
    console.log(result)
}

const showModal = () => {
    insertCategories()
    let modal = document.getElementById('modal');
    modal.style.display = 'flex';
    modal.style.animation = 'fadein 2s';
}
const closeModal = () => {
    let modal = document.getElementById('modal');
    modal.style.animation = 'fadeout 2s';
    setTimeout(() => modal.style.display = 'none', 2000);
}

const showContentModal = (event) => {
    insertArticle(event.target.parentElement.id)
    let modal = document.getElementById('contentModal');
    modal.style.display = 'flex';
    modal.style.animation = 'fadein 2s';
}
const closeContentModal = () => {
    let modal = document.getElementById('contentModal');
    modal.style.animation = 'fadeout 2s';
    setTimeout(() => modal.style.display = 'none', 2000);
}

insertArticles()
insertCategoriesFilter()