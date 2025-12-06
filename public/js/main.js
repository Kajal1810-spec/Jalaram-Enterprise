
const $ = s => document.querySelector(s), $$ = s => Array.from(document.querySelectorAll(s));
async function loadProducts(){ const res = await fetch('/api/products'); const products = await res.json(); window.__products = products; renderProducts(products); renderTags(products); updateCartCount(); }
function renderTags(products){ const tags = Array.from(new Set(products.map(p=>p.tag))); const el = $('#tags'); el.innerHTML = '<button class="tag-btn" data-tag="all">All</button> ' + tags.map(t=>`<button class="tag-btn" data-tag="${t}">${t}</button>`).join(' '); $$('.tag-btn').forEach(b=> b.onclick = ()=>{ const tag = b.dataset.tag; if(tag==='all') renderProducts(window.__products); else renderProducts(window.__products.filter(p=>p.tag===tag)); }); }
function renderProducts(list){ const grid = $('#product-grid'); grid.innerHTML=''; list.forEach(p=>{ const card = document.createElement('div'); card.className='card'; card.innerHTML = `<div class="product-image">${p.img? `<img src="${p.img}" style="max-width:100%;max-height:120px">` : '<svg width="120" height="80" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="80" rx="10" fill="#fff0fb"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#7a4de6" font-size="12">${p.title}</text></svg>'}</div><div class="product-title">${p.title}</div><div class="product-desc">${p.desc||''}</div><div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px"><div style="font-weight:700">₹${p.price}</div><div style="display:flex;gap:8px"><a class="btn ghost" href="/pages/product.html?id=${p.id}">View</a><button class="btn primary add" data-id="${p.id}">Add</button></div></div>`; grid.appendChild(card); }); $$('.btn.add').forEach(b=> b.onclick = e => addToCart(Number(e.currentTarget.dataset.id),1)); }
function getCart(){ return JSON.parse(localStorage.getItem('je_cart')||'{}'); } function saveCart(c){ localStorage.setItem('je_cart', JSON.stringify(c)); updateCartCount(); } function addToCart(id, qty=1){ const c = getCart(); c[id]=(c[id]||0)+qty; saveCart(c); alert('Added to cart'); } function updateCartCount(){ const c = getCart(); const count = Object.values(c).reduce((s,n)=>s+n,0); document.getElementById('cart-count').textContent = count; }
document.addEventListener('DOMContentLoaded',()=>{ loadProducts(); $('#search')?.addEventListener('input', e=>{ const q = e.target.value.toLowerCase().trim(); renderProducts(window.__products.filter(p=>p.title.toLowerCase().includes(q) || (p.desc||'').toLowerCase().includes(q))); }); $('#sort')?.addEventListener('change', e=>{ const v = e.target.value; let sorted = [...window.__products]; if(v==='low') sorted.sort((a,b)=>a.price-b.price); if(v==='high') sorted.sort((a,b)=>b.price-a.price); renderProducts(sorted); }); });


// show "My Orders" link if logged in
function updateAuthUI(){
  const token = localStorage.getItem('je_token');
  const controls = document.querySelector('.controls');
  if(!controls) return;
  const existing = document.getElementById('my-orders-link');
  if(token && !existing){
    const a = document.createElement('a');
    a.href = '/pages/orders.html';
    a.id = 'my-orders-link';
    a.className = 'btn ghost';
    a.textContent = 'My Orders';
    controls.appendChild(a);
  }
}
document.addEventListener('DOMContentLoaded', ()=>{ updateAuthUI(); });
