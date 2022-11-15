import { createEl, deleteFromData, fetchData } from "../public/modules.js";

const file = '../../data/products.json';
const container1 = document.getElementById('container-1');
const restore = document.getElementById('restore');

restore.addEventListener('click', () => {
    fetchData('../../data/products.json');
});

if (!localStorage.getItem('items') || localStorage.getItem('items') == '[]') {
    fetchData(file);
}

let items = JSON.parse(localStorage.getItem('items'));

if (items.length >= 1) {
    items.forEach(item => {
        const box = createEl('', 'div', 'box flex font-secondary gap-2 items-center border-dark border-[2px] pr-2');
        const imageBox = createEl('', 'div', 'w-24');
        const image = document.createElement('img');
        image.src = item.image;
        image.className = 'object-cover w-full h-24';
        const infoBox = createEl('', 'div', 'flex flex-col w-56');
        const itemID = createEl(`ID: ${item.id}`, 'p', 'text-lg font-primary');
        const itemName = createEl(item.name, 'p', 'text-md');
        const itemPrice = createEl(`$${item.price}`, 'p', 'text-xl');

        const editBox = createEl('', 'div', 'flex flex-col gap-2');
        const editBTN = createEl('edit', 'a', 'bg-pink py-1 border-[1px] w-14 text-center');
        editBTN.href = `./products/createUpdate.html?id=${item.id}`;
        const deleteBTN = createEl('delete', 'button', 'bg-pink py-1 border-[1px] w-14');

        container1.appendChild(box);
        box.appendChild(imageBox);
        imageBox.appendChild(image);
        box.appendChild(infoBox);
        infoBox.appendChild(itemID);
        infoBox.appendChild(itemName);
        infoBox.appendChild(itemPrice);
        box.appendChild(editBox);
        editBox.appendChild(editBTN);
        editBox.appendChild(deleteBTN);

        deleteBTN.addEventListener('click', () => {
            deleteFromData(items, item, 'items');
        });
    });
}

