const API_KEY = "8304f7b0c5a043f68cef9f7067c3b094";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("india"));

function reload(){
   window.location.reload(); 
}

async function fetchNews (query) {
    const  res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    console.log(data); 
    bindData(data.articles);    
}
function bindData(articles){
  const cardContainer = document.getElementById('card-contianer');
  const newsCardTemplate = document.getElementById('template-news-card'); 

  cardContainer.innerHTML = "";

  articles.forEach((article) => {
   if(!article.urlToImage) return; 
   const cardClone = newsCardTemplate.content.cloneNode(true);
   fillDataInCard(cardClone, article);
   cardContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article){
    const newsImage = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-dic');

    newsImage.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/jakarta"
    });
   newsSource.innerHTML = `${article.source.name} · ${date}`;
   
   cardClone.firstElementChild.addEventListener('click', () => {
       window.open(article.url,"_block");
   });
}
 let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('news-input');

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});
