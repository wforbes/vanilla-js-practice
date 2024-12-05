let inputText = document.querySelector("#add-txt");
let inputButton = document.querySelector("#add-btn");
let itemList = document.querySelector("#item-list");

let listItems = [];
let nextItemId = 0;
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
		setNextItemId();
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

function setNextItemId() {
	for (let i = 0; i < listItems.length; i++) {
		let idNum = +listItems[i].id.split('-')[1];
		if (idNum > nextItemId) nextItemId = idNum;
	}
	nextItemId++;
	return nextItemId;
}

function saveListItems() {
	sessionStorage.setItem(sessionStorageKey, JSON.stringify(listItems));
}

function handleClick() {
	let listItemText = inputText.value;
	if (!listItemText || listItemText === "") return;
	let listItem = {
		id: 'item-' + nextItemId++,
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

	let btnContainer = document.createElement("div");
	btnContainer.classList.add("btn-container");

	let editButton = createEditButton();
	btnContainer.appendChild(editButton);

	let deleteButton = createDeleteButton();
	btnContainer.appendChild(deleteButton);

	listItem.appendChild(btnContainer);

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

function createEditButton() {
	let editButton = document.createElement("input");
	editButton.type = "button";
	editButton.value = "✏️";
	editButton.classList.add("edit-btn");
	editButton.addEventListener("click", handleEditClick);
	return editButton;
}

function handleEditClick(event) {
	//if already editing, cancel that edit and begin this one
	let editingItemIdx = listItems.findIndex(item => item?.editing === true);
	if (editingItemIdx !== -1) {
		listItems[editingItemIdx].text = listItems[editingItemIdx].originalText;
		delete listItems[editingItemIdx].editing;
		delete listItems[editingItemIdx].originalText;
		let editingListItem = document.getElementById(listItems[editingItemIdx].id)
		editingListItem.querySelector(".title").textContent = listItems[editingItemIdx].text;
		let editBtnElement = editingListItem.querySelector(".edit-btn");
		editBtnElement.value = "✏️";
		editBtnElement.removeEventListener("click", handleSaveClick);
		editBtnElement.addEventListener("click", handleEditClick);
		saveListItems();
	}

	let listItemElement = event.target.parentElement.parentElement;
	let editIdx = listItems.findIndex(item => item.id === listItemElement.id);
	if (editIdx === -1) return;
	listItems[editIdx].editing = true;
	listItems[editIdx].originalText = listItems[editIdx].text;
	let titleElement = listItemElement.querySelector(".title");
	titleElement.textContent = "";
	let inputElement = document.createElement("input");
	inputElement.type = "text";
	inputElement.classList.add("edit-txt");
	inputElement.value = listItems[editIdx].text;
	titleElement.appendChild(inputElement);
	inputElement.focus();
	let editBtnElement = listItemElement.querySelector(".edit-btn");
	editBtnElement.value = "💾";
	editBtnElement.removeEventListener("click", handleEditClick);
	editBtnElement.addEventListener("click", handleSaveClick);
	saveListItems();
}

function createDeleteButton() {
	let deleteButton = document.createElement("input");
	deleteButton.type = "button";
	deleteButton.value = "❌";
	deleteButton.classList.add("delete-btn");
	deleteButton.addEventListener("click", handleDeleteClick);
	return deleteButton;
}

function handleDeleteClick(event) {
	let listItemElementId = event.target.parentElement.parentElement.id;
	event.target.parentElement.parentElement.remove();
	listItems = listItems.filter(item => item.id !== listItemElementId);
	saveListItems();
}

function handleSaveClick(event) {
	let listItemElement = event.target.parentElement.parentElement;
	let listItemId = listItemElement.id;
	let saveIdx = listItems.findIndex(item => item.id === listItemId);
	if (saveIdx === -1) return;
	let updatedTitle = listItemElement.querySelector("input.edit-txt").value;
	console.log(updatedTitle);
	if (!updatedTitle || updatedTitle === "") return;
	listItems[saveIdx].text = updatedTitle;
	let titleElement = listItemElement.querySelector(".title");
	titleElement.innerHTML = "";
	let textNode = document.createTextNode(listItems[saveIdx].text);
	titleElement.appendChild(textNode);
	delete listItems[saveIdx].editing;
	delete listItems[saveIdx].originalText;
	let editBtnElement = listItemElement.querySelector(".edit-btn");
	editBtnElement.value = "✏️";
	editBtnElement.removeEventListener("click", handleSaveClick);
	editBtnElement.addEventListener("click", handleEditClick);
	saveListItems();
}
