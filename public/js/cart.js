function getCart(){ return JSON.parse(localStorage.getItem('je_cart')||'{}'); }
async function renderCart(){
  const cart = getCart(); const keys = Object.keys(cart).map(Number);
  if(keys.length===0){ document.getElementById('cart-items').innerHTML = '<div class="small">Your cart is empty</div>'; return; }
  const res = await fetch('/api/products'); const products = await res.json();
  let total = 0; const el = document.getElementById('cart-items'); el.innerHTML='';
  keys.forEach(k=>{ const p = products.find(x=>x.id===k); const q = cart[k]; total += p.price*q; const row = document.createElement('div'); row.className='cart-row'; row.innerHTML = `<div style="flex:1"><div style="font-weight:700">${p.title}</div><div class="small">₹${p.price} × ${q} = ₹${p.price*q}</div></div><div><button class="btn ghost dec" data-id="${k}">−</button> <button class="btn primary inc" data-id="${k}">+</button></div>`; el.appendChild(row); });
  document.getElementById('cart-total').textContent = total.toFixed(2);
  document.querySelectorAll('.inc').forEach(b=> b.onclick = e=> { const id=e.currentTarget.dataset.id; cart[id]=(cart[id]||0)+1; localStorage.setItem('je_cart', JSON.stringify(cart)); renderCart(); });
  document.querySelectorAll('.dec').forEach(b=> b.onclick = e=> { const id=e.currentTarget.dataset.id; cart[id] = (cart[id]||0)-1; if(cart[id]<=0) delete cart[id]; localStorage.setItem('je_cart', JSON.stringify(cart)); renderCart(); });
  document.getElementById('checkout').onclick = async ()=>{
    const token = localStorage.getItem('je_token');
    const buyer = token? 'user' : prompt('Enter your name (guest)');
    const payload = { buyer, cart };
    const r = await fetch('/api/checkout', { method:'POST', headers:{'content-type':'application/json', 'authorization': token? 'Bearer '+token : ''}, body: JSON.stringify(payload)});
    const result = await r.json();
    if(result.success){
      localStorage.removeItem('je_cart'); alert('Order placed: '+result.orderId); location.href='/';
    } else if(result.url){ // Stripe session url
      window.location = result.url;
    } else alert('Checkout failed: ' + (result.error||'unknown'));
  };
}
renderCart();