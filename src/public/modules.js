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

export { createEl, fetchData, deleteFromData}