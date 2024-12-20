let noi = 0; // Number of Items
let items = []; // Items
let itemsChecked = []; // Checked Items

let saved = localStorage.getItem("saved"); // If there is saved data
let loaded = false; // If the data is loaded

function addItem() {
    // Create a new item
    noi++;
    items.push("Item #" + noi);
    const id = noi-1;

    const item = document.createElement("div");
    const button = document.createElement("button");
    const input = document.createElement("input");
    const checkbox = document.createElement("input");

    button.innerHTML = "-"; //Button text
    button.setAttribute("class", "deleteButton"); //Button class
    button.setAttribute("onclick", "removeItem(this, id)"); // Button onclick event

    input.setAttribute("value", items[noi-1]); //Input type
    input.setAttribute("oninput", "items[" + id + "] = this.value"); //Input oninput event

    itemsChecked.push("false"); // Add the item to the checked items
    checkbox.setAttribute("type", "checkbox"); //Checkbox type
    checkbox.setAttribute("class", "checkbox"); //Checkbox class
    checkbox.setAttribute("onchange", "itemsChecked[" + id + "] = this.checked"); //Checkbox onchange event

    item.appendChild(button);
    item.appendChild(input);
    item.appendChild(checkbox);


    const element = document.getElementById("list");
    element.appendChild(item);
    console.log("Item #" + noi + " added");
    console.log(items);
    console.log(itemsChecked);
}

function removeItem(button, id) {
    // Remove the item
    noi--;
    const element = button.parentElement;
    element.remove();
    items.splice(id, 1);
    itemsChecked.splice(id, 1);
    console.log("Item #" + noi + " removed");
    console.log(items)
}

function saveItems() {
    // Save the items
    loaded = true;
    localStorage.setItem("saved", "true");
    localStorage.setItem("items", JSON.stringify(items));
    localStorage.setItem("itemsChecked", JSON.stringify(itemsChecked)); // Save as JSON string
    console.log("Items saved");
    console.log(items);
    console.log(itemsChecked);
}

function loadItems() {
    // Load the items
    if (localStorage.getItem("saved") === "true" && !loaded) {
        loaded = true;
        items = JSON.parse(localStorage.getItem("items")) || [];
        itemsChecked = JSON.parse(localStorage.getItem("itemsChecked")) || [];
        noi = items.length;
        for (let i = 0; i < items.length; i++) {
            const item = document.createElement("div");
            const button = document.createElement("button");
            const input = document.createElement("input");
            const checkbox = document.createElement("input");

            button.innerHTML = "-"; //Button text
            button.setAttribute("class", "deleteButton"); //Button class
            button.setAttribute("onclick", `removeItem(this, ${i})`); // Button onclick event

            input.setAttribute("value", items[i]); //Input type
            input.setAttribute('class', 'input'); //Input class
            input.setAttribute("oninput", `items[${i}] = this.value`); //Input oninput event

            checkbox.setAttribute("type", "checkbox"); //Checkbox type
            checkbox.setAttribute("class", "checkbox"); //Checkbox class
            checkbox.checked = itemsChecked[i] === true; //Checkbox checked
            checkbox.setAttribute("onchange", `itemsChecked[${i}] = this.checked; saveItems();`); //Checkbox onchange event

            item.appendChild(button);
            item.appendChild(input);
            item.appendChild(checkbox);

            const element = document.getElementById("list");
            element.appendChild(item);
        }
    }
}

function clearItems() {
    // Clear the items
    localStorage.clear();
    console.log("Items cleared");
}

window.onload = loaded=false;