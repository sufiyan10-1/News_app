const API_KEY = "8304f7b0c5a043f68cef9f7067c3b094";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("india"));

async function fetchNews (query){
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}
function bindData(articles) {
    const cardContianer = document.getElementById('card-contianer');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardContianer.innerHTML = "";
    
       articles.forEach((article) => {
        if(!article.urlTOImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        cardContianer.appendChild(cardClone);
    });
}
