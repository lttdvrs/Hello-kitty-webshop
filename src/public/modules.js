function createEl(input, element, cName = null) {
    const e = document.createElement(element);
    e.innerHTML = input;
    e.className = cName;
    return e;
}

function fetchData(file) {
    fetch(file)
    .then((response) => response.json())
    .then((products) => {
        localStorage.setItem('items', JSON.stringify(products));
        window.location.reload();
    });
}

function deleteFromData(array, variable, storage) {
    let index = array.indexOf(variable);
    array.splice(index, 1);
    localStorage.setItem(storage, JSON.stringify(array));
    window.location.reload();
}


// function showAndValidate() {
//     let error = 0;
//     let pattern = new RegExp(/^[0-9]*(.{1}[0-9]{2})?$/);

//     if (!name.value) {
//         nameErr.innerText = 'Please fill in a product name';
//         error = 1;
//     } else if (name.value.length > 25) {
//         nameErr.innerText = 'Please make a product name with less than or 25 letters';
//     } else {
//         nameErr.innerText = '';
//     }

//     if(!price.value) {
//         priceErr.innerText = 'Please fill in price';
//         error = 1;
//     } else if (isNaN(price.value)) {
//         priceErr.innerText = 'You have to fill in a correct number';
//         error = 1;
//     } else if (!price.value.match(pattern)){
//         priceErr.innerText = 'Please fill in a number with only 2 or less numbers after the .';
//         error = 1;
//     } else {
//         priceErr.innerText = '';
//     }

//     if (!description.value) {
//         descriptionErr.innerText = 'Please fill in a description';
//         error = 1;
//     } else {
//         descriptionErr.innerText = '';
//     }

//     if (!url.value) {
//         url.innerText = 'Please fill in a url';
//         error = 1;
//         urlErr.innerText = 'Please fill in a url';
//     } else if (!isImage(url.value)) {
//         error = 1;
//         urlErr.innerText = 'Please use a valid url';
//     } else {
//         urlErr.innerText = '';
//     }

//     return error
// }

export { createEl, fetchData, deleteFromData}