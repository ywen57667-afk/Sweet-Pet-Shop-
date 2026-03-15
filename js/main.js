// 购物车
let cart = [];
function addToCart(name, price, paylink){
  cart.push({name, price, paylink});
  updateCart();
  showToast(`${name} added to cart!`);
}

function updateCart(){
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  if(cart.length===0){
    cartItems.innerHTML='<p>Your cart is empty.</p>';
    cartTotal.textContent='';
    return;
  }
  cartItems.innerHTML='';
  let total=0;
  cart.forEach(item=>{
    const div=document.createElement('div');
    div.textContent=`${item.name} - ¥${item.price}`;
    cartItems.appendChild(div);
    total+=item.price;
  });
  cartTotal.textContent=`Total: ¥${total}`;
}

// Toast 提示
function showToast(message){
  const toast=document.createElement('div');
  toast.textContent=message;
  toast.style.position='fixed';
  toast.style.bottom='20px';
  toast.style.left='50%';
  toast.style.transform='translateX(-50%)';
  toast.style.background='rgba(255,111,165,0.9)';
  toast.style.color='white';
  toast.style.padding='12px 20px';
  toast.style.borderRadius='25px';
  toast.style.fontSize='14px';
  toast.style.zIndex='1000';
  toast.style.opacity='0';
  toast.style.transition='opacity 0.5s ease';
  document.body.appendChild(toast);
  requestAnimationFrame(()=>{ toast.style.opacity='1'; });
  setTimeout(()=>{ toast.style.opacity='0'; toast.addEventListener('transitionend',()=>toast.remove()); },2000);
}

// Banner 滚动浮动
const bannerText = document.querySelector('.banner-text');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  bannerText.style.transform = `translate(-50%, calc(-50% - ${scrollY*0.3}px))`;
  bannerText.style.opacity = `${Math.max(1 - scrollY/400, 0)}`;
});

// 产品滚动淡入
const products = document.querySelectorAll('.product');
const sectionTitle = document.querySelector('.section-title');
const productObserver = new IntersectionObserver((entries, obs)=>{
  entries.forEach((entry, idx)=>{
    if(entry.isIntersecting){
      entry.target.style.transitionDelay = `${idx*0.15}s`;
      entry.target.classList.add('show');
      obs.unobserve(entry.target);
    }
  });
},{ threshold:0.2 });
products.forEach(p=>productObserver.observe(p));
const titleObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      sectionTitle.style.opacity='1';
      sectionTitle.style.transform='translateY(0)';
    }
  });
},{ threshold:0.3 });
titleObserver.observe(sectionTitle);

// Checkout Modal
const checkoutBtn = document.getElementById('checkout-btn');
const modal = document.getElementById('checkoutModal');
const closeBtn = document.querySelector('.close-btn');
const checkoutForm = document.getElementById('checkoutForm');

checkoutBtn.addEventListener('click', ()=>{
  if(cart.length===0){ alert('Your cart is empty!'); return; }
  modal.style.display='flex';
});
closeBtn.addEventListener('click', ()=>{ modal.style.display='none'; });
window.addEventListener('click', (e)=>{ if(e.target===modal) modal.style.display='none'; });

// 表单提交
checkoutForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const customer = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    address: document.getElementById('address').value,
    cart: cart
  };
  const total = cart.reduce((sum,i)=>sum+i.price,0);

  const templateParams = {
    to_name: customer.name,
    to_email: customer.email,
    order_details: customer.cart.map(i=>`${i.name} - ¥${i.price}`).join('<br>'),
    total_amount: `¥${total}`,
    address: customer.address
  };

  emailjs.send('YOUR_SERVICE_ID','template_m2drzub', templateParams)
    .then(response=>{
      console.log('Email sent!', response.status,response.text);
      showOrderSuccess();
      cart=[];
      updateCart();
      window.open("https://wise.com/paylink-demo","_blank");
    }, err=>{
      alert('Failed to send email, please try again.');
      console.error(err);
    });

  modal.style.display='none';
});

// 下单成功特效
function showOrderSuccess(){
  const successDiv = document.createElement('div');
  successDiv.textContent='🎉恭喜下单成功！🎉';
  successDiv.style.position='fixed';
  successDiv.style.top='50%';
  successDiv.style.left='50%';
  successDiv.style.transform='translate(-50%,-50%)';
  successDiv.style.padding='30px 50px';
  successDiv.style.background='pink';
  successDiv.style.color='white';
  successDiv.style.fontSize='24px';
  successDiv.style.fontWeight='700';
  successDiv.style.borderRadius='30px';
  successDiv.style.zIndex='2000';
  successDiv.style.textAlign='center';
  successDiv.style.opacity='0';
  successDiv.style.transition='opacity 0.5s ease, transform 0.5s ease';
  document.body.appendChild(successDiv);
  requestAnimationFrame(()=>{
    successDiv.style.opacity='1';
    successDiv.style.transform='translate(-50%,-50%) scale(1.1)';
  });
  setTimeout(()=>{
    successDiv.style.opacity='0';
    successDiv.addEventListener('transitionend',()=>successDiv.remove());
  },2500);
  if(typeof confetti==='function'){
    confetti({particleCount:80, spread:70, origin:{y:0.6}});
  }
}
