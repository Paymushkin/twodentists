// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

const searchBtn = document.getElementById("search-btn"),
	  formFilters = document.getElementById("filters")

if (searchBtn) {
	searchBtn.addEventListener("click", ()=> {
		formFilters.classList.toggle("search-active")
	})
}


const showFilters = document.getElementById("show-filters")
const hideFilters = document.getElementById("hide-filters")
const mobileFilters = document.getElementById("mobile-filters")

if (showFilters) {
	showFilters.addEventListener("click", ()=> {
		mobileFilters.classList.add("active")
		document.querySelector('body').classList.add("mob-filters-active")
	})
}

if (hideFilters) {
	hideFilters.addEventListener("click", ()=> {
		mobileFilters.classList.remove("active")
		document.querySelector('body').classList.remove("mob-filters-active")
	})
}

// изменение размера скроллбара
const scrollbar = document.querySelector(".scrollbar-hover")
scrollbar.addEventListener("mouseover", ()=> {
	document.body.classList.toggle("scrollbar-zoom")
})

// копирование ссылки 
if(document.querySelector('button[data-link]')) {
	const linkButton = document.querySelector('button[data-link]');
	const text = document.getElementById("info-text");
	// console.log(text)
	linkButton.addEventListener("click", ()=> {
			const copyText = linkButton.dataset.link
			try {
				navigator.clipboard.writeText(copyText);
				text.textContent = "Скопировано!"
				text.classList.add("active")
			} catch (err) {
				text.textContent = "Не скопировалось"
				text.classList.add("active")
			}


			setTimeout(() => {
				text.classList.remove("active")
			}, 2000);
		})
}

const loader = document.getElementById('loader') || null

// if (loader) {
// 	document.addEventListener("load", ()=> {
// 		setTimeout(() => {
// 			loader.remove()
// 		}, 2000);
// 	})
// }

if (loader) {
	document.onreadystatechange = function () {
		if (document.readyState == "complete") {
			setTimeout(() => {
				loader.remove()
			}, 2000);
		}
	}
}

// document.addEventListener("beforePopupOpen", function (e) {
// 	// Попап
// 	const currentPopup = e.detail.popup.targetOpen.element;
// 	if (currentPopup.classList.contains("popup-swiper")) {
// 		console.log("это попап со свайпером", e)
// 	}
// });