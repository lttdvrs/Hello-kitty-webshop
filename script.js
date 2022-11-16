import { createEl, fetchData } from "./src/public/modules.js";

const file = '../../../data/products.json';
const container = document.getElementById('items-container')

if (!localStorage.getItem('items') || localStorage.getItem('items') == '[]') {
    fetchData(file);
}

let cartArr;
let items = JSON.parse(localStorage.getItem('items'));

if (!localStorage.getItem('cart')){
    cartArr = [];
} else {
    cartArr = JSON.parse(localStorage.getItem('cart'));
}

items.forEach(item => {
    const box = createEl(' ', 'div', 'box w-80');
    const imagebox = createEl(' ', 'div', 'bg-pink border-[8px] border-pink rounded-2xl');
    const linkToItem = createEl(' ', 'a');
    linkToItem.href = `../item/item.html?id=${item.id}`;
    const image = document.createElement('img');
    image.src = item.image;
    image.className = 'w-full h-96 object-cover';

    const infobox = createEl(' ', 'div', 'flex justify-center flex-col gap-2 pt-2');
    const buyNameBox = createEl(' ', 'div', 'flex justify-between');
    const productName = createEl(item.name, 'h1', 'text-wrap mx-auto text-lg text-center');
    const productPrice = createEl(`$${item.price}`, 'p' , 'mx-auto text-xl font-secondary');
    const addToCart = createEl('<i class="fa-solid fa-cart-shopping"></i>', 'button', 'bg-pink h-8 w-10 text-dark hover:bg-[#D99DC8] ');
    container.appendChild(box);
    box.appendChild(imagebox);
    imagebox.appendChild(linkToItem);
    linkToItem.appendChild(image)
    box.appendChild(infobox);
    infobox.appendChild(buyNameBox);
    buyNameBox.appendChild(productName);
    buyNameBox.appendChild(addToCart);
    infobox.appendChild(productPrice);

    addToCart.addEventListener('click', () => {
        cartArr.push(item)
        localStorage.setItem('cart', JSON.stringify(cartArr));
    });
});
