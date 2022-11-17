import { fetchData } from "../../public/modules.js";

const name = document.getElementById('name');
const price = document.getElementById('price');
const description = document.getElementById('description');
const url = document.getElementById('url');
const send = document.getElementById('send');

const nameErr = document.getElementById('nameErr');
const priceErr = document.getElementById('priceErr');
const descriptionErr = document.getElementById('descriptionErr');
const urlErr = document.getElementById('urlErr');
const message = document.getElementById('message');

if (!localStorage.getItem('items')) {
    fetchData(fetchData('../../../data/products.json'));
}

let item;
let items = JSON.parse(localStorage.getItem('items'));
const urlParams = new URLSearchParams(window.location.search);

let idNeeded;
let title = document.getElementById('title');
title.innerText = 'Adding a product';
send.innerText = 'add';

if (urlParams.get('id')) {
    idNeeded = urlParams.get('id');
    items.forEach(i => {
        if (i.id == idNeeded) {
            item = i;
        }
    });
    if (!item) {
        alert('No item found');
        idNeeded = null;
    }
    title.innerText = 'Editing a product';
    send.innerText = 'edit';
}
let ids = [];
let URL = document.getElementById('URL');

url.addEventListener('input', (e) => {
    if (isImage(e.target.value)) {
        URL.src = e.target.value;
        URL.className = 'object-cover h-full w-full';
    } else {
        URL.src = '';
    }
});

if (idNeeded) {
    name.value = item.name;
    price.value = item.price;
    description.value = item.description;
    url.value = item.image;
    URL.src = item.image;
    URL.className = 'object-cover h-full w-full';
}

send.addEventListener('click', (e) => {
    e.preventDefault();
    if (idNeeded) {
        if (!showAndValidate()) {
            items.forEach(i => {
                if (i.id == idNeeded) {
                    i.name = name.value;
                    i.price = Number(price.value);
                    i.description = description.value;
                    i.image = url.value;
                }
            });
            localStorage.setItem('items', JSON.stringify(items));
            showMessageAndReload(`${item.name} was updated`);
        }
    } else if (!showAndValidate()) {
        const obj = {
            description: description.value,
            id: getLastId(),
            image: url.value,
            name: name.value,
            price: Number(price.value),
        };
        items.push(obj);
        localStorage.setItem('items', JSON.stringify(items));
        showMessageAndReload(`${obj.name} was added`);
    }
});

function getLastId() {
    items.forEach(product => {
        ids.push(product.id);
    });

    return Math.max(...ids) + 1;
}

function showMessageAndReload(text) {
    message.innerText = text;
    setInterval(() => {
        window.location.reload();
    }, 3000);
}

function isImage(link) {
    return /https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)/.test(link);
}

function showAndValidate() {
    let error = 0;
    let pattern = /^[0-9]*(.{1}[0-9]{2})?$/;

    if (!name.value) {
        nameErr.innerText = 'Please fill in a product name';
        error = 1;
    } else if (name.value.length > 35) {
        nameErr.innerText = 'Choose a product name with less than or 35 characters';
        error = 1;
    } else {
        nameErr.innerText = '';
    }

    if(!price.value) {
        priceErr.innerText = 'Please fill in price';
        error = 1;
    } else if (isNaN(price.value)) {
        priceErr.innerText = 'You have to fill in a correct number';
        error = 1;
    } else if (!price.value.match(pattern)) {
        priceErr.innerText = 'Please fill in a number with only 2 or less numbers after the dot.';
        error = 1;
    } else {
        priceErr.innerText = '';
    }

    if (!description.value) {
        descriptionErr.innerText = 'Please fill in a description';
        error = 1;
    } else {
        descriptionErr.innerText = '';
    }

    if (!url.value) {
        url.innerText = 'Please fill in a url';
        error = 1;
    } else if (!isImage(url.value)) {
        error = 1;
        urlErr.innerText = 'Please use a valid url';
    } else {
        urlErr.innerText = '';
    }

    return error
}