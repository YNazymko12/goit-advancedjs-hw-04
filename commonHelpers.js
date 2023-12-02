import{a as b,S as w,i as l}from"./assets/vendor-5f0e12e0.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const L="40905423-24d24966a8b04fca12252a818";async function d(o,t,i){return(await b.get(`https://pixabay.com/api/?key=${L}&q=${o}&image_type=photo&orientation=horizontal&safesearch=true&page=${t}&per_page=${i}`)).data}const $=document.querySelector(".gallery");function g(o){const t=o.map(({webformatURL:i,largeImageURL:s,tags:e,likes:r,views:n,comments:h,downloads:y})=>`
    <li class="photo-card">
    <a href="${s}">
      <img class="photo-img" src="${i}" alt="${e}" loading="lazy">
    </a>
    <div class="info">
        <p class="info-item">
            <b>Likes</b>${r}
        </p>
            <p class="info-item">
        <b>Views</b>${n}
        </p>
        <p class="info-item">
            <b>Comments</b>${h}
        </p>
        <p class="info-item">
            <b>Downloads</b>${y}
        </p>
    </div>
  </li>
  `).join("");$.insertAdjacentHTML("beforeend",t)}const v=document.querySelector(".search-form"),S=document.querySelector(".gallery");let a=1,c="",m=new w(".gallery a");const u=40;let f=!1;v.addEventListener("submit",P);window.addEventListener("scroll",p);async function P(o){if(o.preventDefault(),a=1,c=o.target.searchQuery.value.trim(),!c.trim()){l.warning({title:"Warning",message:"Please, fill the main field",position:"topRight"});return}S.innerHTML="";try{const{hits:t,totalHits:i}=await d(c,a,u);if(i===0){l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again.",maxWidth:"450px",position:"topRight"});return}g(t),m.refresh(),l.success({title:"Success",message:`Hooray! We found ${i} images!`,position:"topRight"})}catch(t){console.log(t)}}async function p(){if(E()&&!f){f=!0,a+=1;try{const{hits:o,totalHits:t}=await d(c,a,u);g(o),m.refresh();const i=Math.ceil(t/u);a>=i&&(l.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),window.removeEventListener("scroll",p))}catch(o){console.log(o)}finally{f=!1}}}function E(){return window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-360}
//# sourceMappingURL=commonHelpers.js.map
