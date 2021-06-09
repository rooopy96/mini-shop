"use strict";

// Fetch the Json data.
function loadItems() {
	return fetch("../data/data.json")
		.then(response => response.json())
		.then(data => data.items)
}

// Make the HTML String with data
function makeHTMLString(item) {
	return `
		<li class="item">
		<img src="${item.img}" alt="${item.type}" class="item__img">
			<div class="item__description">
				<span class="item__sex">${item.gender},</span>
				<span class="item__size">${item.size}</span>
			</div>
		</li>
	`
}

// Display the data on the screen
function displayItems(items) {
	const container = document.querySelector(".items")

	container.innerHTML = items.map((item) => {
		return makeHTMLString(item)
	})
}

// Filter the data with btns
function onClickBtn(items) {
	const buttons = document.querySelector(".buttons");
	const homeBtn = document.querySelector(".home__logo");

	buttons.addEventListener("click", (event) => {
		const btnType = event.target.dataset.type;		
		const filtered = items.filter((item) => {
			return item.type === btnType || item.color === btnType;
		})
		displayItems(filtered)
	})

	homeBtn.addEventListener("click", () => {
		displayItems(items)
	})
}

// Main boombaya
loadItems()
	.then(items => {
		displayItems(items)
		onClickBtn(items)
	})
	.catch(console.log)