/* ZanaMovies frontend. Connect Supabase before enabling uploads or real catalog data. */
const grid=document.getElementById('movieGrid');
const searchInput=document.getElementById('searchInput');
const filters=[...document.querySelectorAll('.filter')];
const watchModal=document.getElementById('watchModal');
const adminModal=document.getElementById('adminModal');
const player=document.getElementById('moviePlayer');
let activeGenre='All';
let movies=[];
document.getElementById('year').textContent=new Date().getFullYear();
function escapeHTML(value=''){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function renderMovies(){
 const query=searchInput.value.trim().toLowerCase();
 const shown=movies.filter(m=>(activeGenre==='All'||m.genre===activeGenre||m.category===activeGenre)&&[m.title,m.description,m.genre,m.category,m.year].join(' ').toLowerCase().includes(query));
 if(!shown.length){grid.innerHTML='<div class="empty-state"><h3>No movies found yet</h3><p>Try another search or category. New titles will appear here when the catalog is connected.</p></div>';return;}
 grid.innerHTML=shown.map(m=>`<article class="movie-card" tabindex="0" role="button" data-id="${escapeHTML(m.id)}" aria-label="Watch ${escapeHTML(m.title)}"><div class="movie-poster">${m.poster_url?'<img loading="lazy" src="'+escapeHTML(m.poster_url)+'" alt="">':''}<span class="poster-label">${escapeHTML(m.title)}</span><span class="play-badge">▶</span></div><div class="movie-meta"><span>${escapeHTML(m.year||'Movie')}</span><span class="tag">${escapeHTML(m.genre||m.category||'Film')}</span></div><p class="movie-title">${escapeHTML(m.title)}</p></article>`).join('');
 grid.querySelectorAll('.movie-card').forEach(card=>{const open=()=>playMovie(card.dataset.id);card.addEventListener('click',open);card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}})});
}
function playMovie(id){
 const m=movies.find(x=>String(x.id)===String(id));if(!m)return;
 document.getElementById('playerTitle').textContent=m.title;
 document.getElementById('playerDescription').textContent=m.description||'';
 if(!m.video_url){document.getElementById('playerDescription').textContent='This movie does not have a video file attached yet.';player.removeAttribute('src');player.load();}
 else{player.src=m.video_url;player.load();}
 watchModal.classList.remove('hidden');
}
filters.forEach(b=>b.addEventListener('click',()=>{filters.forEach(x=>x.classList.remove('active'));b.classList.add('active');activeGenre=b.dataset.genre;renderMovies();}));
searchInput.addEventListener('input',renderMovies);
document.getElementById('adminBtn').addEventListener('click',()=>adminModal.classList.remove('hidden'));
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>document.getElementById(b.dataset.close).classList.add('hidden')));
[watchModal,adminModal].forEach(m=>m.addEventListener('click',e=>{if(e.target===m)m.classList.add('hidden')}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){watchModal.classList.add('hidden');adminModal.classList.add('hidden');player.pause();}});
watchModal.addEventListener('transitionend',()=>{if(watchModal.classList.contains('hidden'))player.pause();});
/* Empty until the database and storage are configured; no fake movie listings. */
movies=[];
renderMovies();