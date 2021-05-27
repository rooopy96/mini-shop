"use strict";

function loadItem() {
	const items = fetch("data/data.json")
		.then(response => response.json())
		.then(json => json.items)

	return items
}

function displayItems(items) {
	const container = document.querySelector(".items");

	container.innerHTML = items.map((value) => {
		return makeHTMLString(value)
	}).join("")
}

function makeHTMLString(item) {
	return `
		<li class="item">
			<img src=${item.img} alt=${item.type}>
			<span>${item.gender}, ${item.size}</span>
		</li>
	`
}

function onClickBtn(items) {
	const btn = document.querySelector(".buttons");
	const logo = document.querySelector(".logo");

	logo.addEventListener("click", ()=> {
		window.location.reload();
	})
	btn.addEventListener("click", (event) => {
		const dataset = event.target.dataset
		const type = dataset.type
		const filteredItem = items.filter((value) => {
			return value.type === type ||
				value.color === type
		})

		displayItems(filteredItem)
	})
}

loadItem()
	.then(items => {
		displayItems(items)
		onClickBtn(items)
	})
	.catch(console.log)