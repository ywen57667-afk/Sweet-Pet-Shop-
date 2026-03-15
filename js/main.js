let cart = [];

function addToCart(name, price){

cart.push({name,price});

updateCart();

showToast(name + " added to cart 💕");

}



function updateCart(){

const cartItems=document.getElementById("cart-items");

const totalText=document.getElementById("cart-total");



if(cart.length===0){

cartItems.innerHTML="<p>Your cart is empty</p>";

totalText.textContent="";

return;

}



cartItems.innerHTML="";

let total=0;



cart.forEach(item=>{

const div=document.createElement("div");

div.textContent=item.name + " - $" + item.price;

cartItems.appendChild(div);

total+=item.price;

});



totalText.textContent="Total: $" + total.toFixed(2);

}



function showToast(message){

const toast=document.createElement("div");

toast.textContent=message;



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



document.body.appendChild(toast);



setTimeout(()=>{

toast.remove();

},2000);

}



document.getElementById("checkout-btn").addEventListener("click",()=>{

if(cart.length===0){

alert("Your cart is empty!");

return;

}

alert("Checkout successful 💕 (Demo)");

});
