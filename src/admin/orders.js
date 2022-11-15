import { createEl, fetchData } from "../public/modules.js";

let orders = JSON.parse(localStorage.getItem('orders'));
const container = document.getElementById('container');
let orderID = 0;
const restore = document.getElementById('restore');

restore.addEventListener('click', () => {
    fetchData('../../data/products.json');
});

if (orders) {
    orders.forEach(order => {
        const box = createEl('', 'div', 'bg-pink flex justify-between w-[55%] mx-auto px-3 py-4 rounded-md')
        const ID = createEl(`Order ID: ${orderID}`, 'p', 'font-secondary');
        const price = createEl(`$${order.total}` , 'p' , 'font-secondary');
        const orderDate = createEl(order.time , 'p');
        container.appendChild(box);
        box.appendChild(ID);
        box.appendChild(price);
        box.appendChild(orderDate);
        orderID++;
    });
} else {
    const message = createEl('There are no orders.', 'p' , 'text-2xl mx-auto')
    container.appendChild(message);
}
