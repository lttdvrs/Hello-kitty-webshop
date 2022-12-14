import { createEl, deleteFromData } from "../modules.js";

let cartItems = JSON.parse(localStorage.getItem('cart'));
const container1 = document.getElementById('container-1');
const container2 = document.getElementById('container-2');
let difIDS = [];
let only = [];
const subtotalEl = document.getElementById('subtotal');
const total = document.getElementById('total');
const shippingEl = document.getElementById('shipping');
let subtotal = 0;
const order = document.getElementById('order-btn');
let orderTotal = 0;

if (cartItems != null) {
    cartItems.forEach(item => {
        difIDS.push(item.id);
    });
    difIDS.forEach(id => {
        if (!only.includes(id)) {
            only.push(id);
        }
    });
    cartItems = cartItems.sort(function (a, b) {
        return (a.id - b.id);
    });
    cartItems.reverse();
    cartItems.forEach(item => {
        subtotal += Number(item.price);
        let amount = difIDS.filter(x => x == item.id).length;
        const box = createEl('', 'div', 'box flex gap-6');
        box.id = item.id;
        const imageBox = createEl('', 'div', 'border-[8px] border-pink rounded-2xl w-52');
        const image = document.createElement('img');
        image.src = item.image;
        image.className = 'object-cover h-56 w-full';
        const infoBox = createEl('', 'div', 'py-3 flex flex-col gap-4');
        const itemName = createEl(item.name, 'h1', 'text-xl text-wrap ');
        const itemPrice = createEl(`$${item.price}`, 'p', 'font-secondary text-xl');
        const parent = createEl('', 'div', 'w-fit flex gap-3 pt-6 items-center');
        const decrease = createEl('-', 'button', 'text-3xl ');
        const amountInCart = createEl(amount, 'p', 'text-xl ');
        const increase = createEl('+', 'button', 'text-3xl ');

        if (only.includes(item.id)) {
            container1.appendChild(box);
            box.appendChild(imageBox);
            imageBox.appendChild(image);
            box.appendChild(infoBox);

            const InfoBoxValues = [itemName, itemPrice, document.createElement('hr'), parent];
            InfoBoxValues.forEach(i => {
                infoBox.appendChild(i);
            });
            const amountBoxValues = [decrease, amountInCart, increase];
            amountBoxValues.forEach(a => {
                parent.appendChild(a);
            });
            only.splice(only.indexOf(item.id), 1);
        }
        increase.addEventListener('click', () => {
            cartItems.push(item);
            localStorage.setItem('cart', JSON.stringify(cartItems));
            difIDS.push(item.id);
            Number(subtotal += item.price).toFixed(2);
            orderTotal = price(subtotal);
            amountInCart.innerHTML = difIDS.filter(x => x == item.id).length;
        });

        decrease.addEventListener('click', () => {
            deleteFromData(cartItems, item, 'cart');
        });
    });
} else {
    const message = createEl('There are no items in your cart.', 'p', 'mx-auto');
    container1.appendChild(message);
}

orderTotal = price(subtotal);
let orderMessage = createEl('', 'p', 'text-xl font-secondary text-right');

function orderDetails(orderedItems) {
    let allItems = [];
    let orderDets = {};
    let ID;
    if (!localStorage.getItem('orders')) {
        ID = 0;
    } else {
        let orders = JSON.parse(localStorage.getItem('orders'));
        ID = orders.length;
    }
    orderedItems.forEach(item => {
        allItems.push(item);
    });

    orderDets.id = ID;
    orderDets.total = orderTotal;
    orderDets.time = new Date().toLocaleTimeString();
    orderDets.items = allItems;

    return orderDets;
}

order.addEventListener('click', () => {
    if (cartItems != null) {
        processOrder(orderDetails(cartItems));
        localStorage.removeItem('cart');
        orderMessage.innerHTML = 'Order succesfull!';
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    } else {
        orderMessage.innerHTML = 'Order unsuccesfull';
    }
    container2.appendChild(orderMessage);
});

function processOrder(ordered) {
    if (!localStorage.getItem('orders')) {
        let arrie = [];
        arrie.push(ordered);
        localStorage.setItem('orders', JSON.stringify(arrie));
    } else {
        let orderArr = JSON.parse(localStorage.getItem('orders'));
        orderArr.push(ordered);
        localStorage.setItem('orders', JSON.stringify(orderArr));
    }
}

function price(sub) {
    let shipping = sub >= 100 ? 0 : 5;
    subtotalEl.innerHTML = `$${Number(sub).toFixed(2)}`;
    shippingEl.innerHTML = `$${shipping}`;
    let totalPrice = Number(sub + shipping).toFixed(2);
    total.innerHTML = `$${totalPrice}`;

    return totalPrice;
}