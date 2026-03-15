// 购物车功能
let cart = [];

function addToCart(name, price){
  cart.push({name, price});
  updateCart();
  showToast(name + " added to cart 💕");
}
// 更新购物车显示
function updateCart(){
  const cartItems = document.getElementById("cart-items");
  const totalText = document.getElementById("cart-total");

  if(cart.length===0){
    cartItems.innerHTML="<p>Your cart is empty</p>";
    totalText.textContent="";
    return;
  }

  cartItems.innerHTML="";
  let total=0;

  cart.forEach(item=>{
    const div=document.createElement("div");
    div.textContent = item.name + " - $" + item.price;
    cartItems.appendChild(div);
    total+=item.price;
  });

  totalText.textContent = "Total: $" + total.toFixed(2);
}

// Toast 提示
function showToast(message){
  const toast=document.createElement("div");
  toast.textContent = message;
  toast.style.position="fixed";
  toast.style.bottom="30px";
  toast.style.left="50%";
  toast.style.transform="translateX(-50%)";
  toast.style.background="#ff6fa5";
  toast.style.color="white";
  toast.style.padding="12px 20px";
  toast.style.borderRadius="25px";
  toast.style.fontSize="14px";
  toast.style.zIndex="1000";
  toast.style.opacity="0";
  toast.style.transition="opacity 0.5s ease";

  document.body.appendChild(toast);

  requestAnimationFrame(()=>{ toast.style.opacity='1'; });
  setTimeout(()=>{
    toast.style.opacity='0';
    toast.addEventListener('transitionend',()=>toast.remove());
  },2000);
}

// Checkout 按钮
document.getElementById("checkout-btn").addEventListener("click",()=>{
  if(cart.length===0){
    alert("Your cart is empty!");
    return;
  }
  alert("Checkout successful 💕 (Demo)");
});

// 滚动浮动效果 - Banner 文本
const bannerText = document.querySelector('.banner-text');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  bannerText.style.transform = `translate(-50%, calc(-50% - ${scrollY * 0.3}px))`;
  bannerText.style.opacity = `${Math.max(1 - scrollY / 400, 0)}`;
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

products.forEach(product => productObserver.observe(product));

const titleObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      sectionTitle.style.opacity='1';
      sectionTitle.style.transform='translateY(0)';
    }
  });
},{ threshold:0.3 });

titleObserver.observe(sectionTitle);
