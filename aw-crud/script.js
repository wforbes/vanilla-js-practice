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
	listItems.forEach((item) => {
		let newListItem = document.createElement("li");
		newListItem.classList.add("list-item");
		newListItem.textContent = item;
		itemList.appendChild(newListItem);
	});
}

function saveListItems() {
	sessionStorage.setItem(sessionStorageKey, JSON.stringify(listItems));
}

function handleClick() {
	let listItemText = inputText.value;
	if (!listItemText || listItemText === "") return;

	let newListItem = document.createElement("li");
	newListItem.classList.add("list-item");
	let newContent = document.createTextNode(listItemText);

	newListItem.appendChild(newContent);
	itemList.appendChild(newListItem);

	inputText.value = "";
	listItems.push(listItemText);
	saveListItems();
}

function handleKeypress(event) {
	if (event.key === "Enter") {
		handleClick();
	}
}

