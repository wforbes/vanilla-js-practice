let inputText = document.querySelector("#add-txt");
let inputButton = document.querySelector("#add-btn");
let itemList = document.querySelector("#item-list");

let listItems = [];
let sessionStorageKey = "listItems";
let savedListItems = sessionStorage.getItem(sessionStorageKey);

init();

function init() {
	inputButton.addEventListener("click", handleClick);
	inputText.addEventListener("keypress", handleKeypress);
	setupSessionStorage();
}

function setupSessionStorage() {
	if (savedListItems) {
		listItems = JSON.parse(savedListItems);
		renderListItems();
	} else {
		sessionStorage.setItem(sessionStorageKey, JSON.stringify(listItems));
	}
}

function renderListItems() {
	itemList.innerHTML = "";
	/* // array forEach() method 
	listItems.forEach(renderListItem);
	*/
	// classic for loop
	for (let i = 0; i < listItems.length; i++) {
		renderListItem(listItems[i]);
	}
}

function saveListItems() {
	sessionStorage.setItem(sessionStorageKey, JSON.stringify(listItems));
}

function handleClick() {
	let listItemText = inputText.value;
	if (!listItemText || listItemText === "") return;
	renderListItem(listItemText);
	inputText.value = "";
	listItems.push(listItemText);
	saveListItems();
}

function handleKeypress(event) {
	if (event.key === "Enter") {
		handleClick();
	}
}

function renderListItem(itemText) {
	let listItem = document.createElement("li");
	listItem.classList.add("list-item");
	let textNode = document.createTextNode(itemText);
	listItem.appendChild(textNode);
	itemList.appendChild(listItem);
}
