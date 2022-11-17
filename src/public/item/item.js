import { createEl } from "../modules.js";

const urlParams = new URLSearchParams(window.location.search);
const idNeeded = urlParams.get('id');
const container1 = document.getElementById('container-1');
const container2 = document.getElementById('container-2');

let cartArr;
let items = JSON.parse(localStorage.getItem('items'));
let product;

items.forEach(i => {
    if (i.id == idNeeded) {
        product = i;
    }
});

if (!product) {
    alert('No item found');
}

if (!localStorage.getItem('cart')) {
    cartArr = [];
} else {
    cartArr = JSON.parse(localStorage.getItem('cart'));
}

function showAll(item) {
    let imageBox = createEl('', 'div', 'border-[8px] border-pink rounded-2xl md:w-[85%] w-full');
    let imageEl = document.createElement('img');
    imageEl.src = item.image;
    imageEl.className = 'w-full md:h-[38rem] h-[32rem] object-cover';

    let infoBox = createEl('', 'div', 'py-12 flex flex-col gap-10');
    let itemName = createEl(item.name, 'h1', 'text-5xl text-wrap w-[90%]');
    let itemPrice = createEl(`$${item.price}`, 'p', 'text-4xl font-secondary');
    let itemInfo = createEl(item.description, 'p', 'font-secondary text-[#383838] text-xl  text-wrap w-[85%]');
    let addToCart = createEl('<i class="fa-solid fa-cart-shopping"></i>', 'button';
    addToCart.className = 'bg-pink h-16 w-20 text-dark hover:bg-[#D99DC8] border-[2px] border-dark rounded-xl';
    container1.appendChild(imageBox);
    imageBox.appendChild(imageEl);

    container2.appendChild(infoBox);
    infoBox.appendChild(itemName);
    infoBox.appendChild(itemPrice);
    infoBox.appendChild(createEl('', 'hr', 'border-[2px] w-[85%]'));
    infoBox.appendChild(itemInfo);
    container2.appendChild(addToCart);

    addToCart.addEventListener('click', () => {
        cartArr.push(item);
        localStorage.setItem('cart', JSON.stringify(cartArr));
    });
}

showAll(product);

