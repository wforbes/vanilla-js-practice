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
	let listItem = {
		id: 'item-' + listItems.length,
		text: listItemText,
		done: false
	};

	renderListItem(listItem);
	inputText.value = "";
	listItems.push(listItem);
	saveListItems();
}

function handleKeypress(event) {
	if (event.key === "Enter") {
		handleClick();
	}
}

function renderListItem(item) {
	let listItem = document.createElement("li");
	listItem.classList.add("list-item");
	listItem.id = item.id;
	
	let itemCheckbox = createItemCheckbox(item);
	listItem.appendChild(itemCheckbox);

	let title = document.createElement("span");
	title.classList.add("title");
	let textNode = document.createTextNode(item.text);
	title.appendChild(textNode);
	listItem.appendChild(title);

	itemList.appendChild(listItem);

	if (item.done) {
		title.style.textDecoration = "line-through";
	} else {
		title.style.textDecoration = "none";
	}
}

function createItemCheckbox(item) {
	let newItemCheckbox = document.createElement("input");
	newItemCheckbox.type = "checkbox";
	newItemCheckbox.checked = item.done;
	newItemCheckbox.addEventListener("change", handleCheckboxChange);
	return newItemCheckbox;
}

function handleCheckboxChange(event) {
	let listItemElement = event.target.parentElement;
	let listItem = listItems.find(item => item.id === listItemElement.id);
	listItem.done = event.target.checked;
	listItemElement.querySelector(".title").style.textDecoration = (listItem.done)
		? "line-through"
		: "none";
	saveListItems();
}