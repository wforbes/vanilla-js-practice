let inputText = document.querySelector("#add-txt");
let inputButton = document.querySelector("#add-btn");

function handleClick() {
	let listItemText = inputText.value;
	if (!listItemText || listItemText === "") return;

	let list = document.querySelector("#item-list");

	let newListItem = document.createElement("li");
	newListItem.classList.add("list-item");
	let newContent = document.createTextNode(listItemText);

	newListItem.appendChild(newContent);
	list.appendChild(newListItem);

	inputText.value = "";
}

inputButton.addEventListener("click", handleClick)