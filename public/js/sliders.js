function bildSliders() {
	console.log("свайпер")
	// BildSlider
	let sliders = document.querySelectorAll(`[class*="__swiper"]:not(.swiper-wrapper)`);
	if (sliders) {
		sliders.forEach(slider => {
			slider.parentElement.classList.add("swiper");
			slider.classList.add("swiper-wrapper");
			for (const slide of slider.children) {
				slide.classList.add('swiper-slide')
			}
		})
	}
}

// Инициализация слайдеров
function initSliders() {
	// добавление классов слайдерам
	// при необходимости отключить
	bildSliders();
	// Перечень слайдеров
	// Проверяем, есть ли слайдер на стронице
	if (document.querySelector('.offer__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.offer__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			observer: true,
			observeParents: true,
			observeSlideChildren: true,
			slidesPerView: 1,
			spaceBetween: 20,
			autoHeight: true,
			speed: 800,
			loop: true,

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.offer__navigation .prev',
				nextEl: '.offer__navigation .next',
			},
		});
	}

	if (document.querySelector('.personal__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.personal__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			observer: true,
			observeParents: true,
			observeSlideChildren: true,
			slidesPerView: 5,
			spaceBetween: 16,
			speed: 800,
			loop: true,

			// Пагинация
			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.personal__navigation .prev',
				nextEl: '.personal__navigation .next',
			},

			// Брейкпоинты

			breakpoints: {
				320: {
					slidesPerView: 2.2,
					spaceBetween: 10,
				},
				576: {
					slidesPerView: 2.2,
					spaceBetween: 10,
				},
				768: {
					slidesPerView: 3,
					spaceBetween: 15,
				},
				992: {
					slidesPerView: 4,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 5,
					spaceBetween: 20,
				},
			},
		});
	}

	if (document.querySelector('.gallery__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.gallery__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			observer: true,
			observeParents: true,
			observeSlideChildren: true,
			slidesPerView: 3,
			spaceBetween: 24,
			speed: 800,
			loop: true,

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.gallery__navigation .prev',
				nextEl: '.gallery__navigation .next',
			},

			// Брейкпоинты

			breakpoints: {
				320: {
					slidesPerView: 1.2,
					spaceBetween: 10,
					autoHeight: true,
				},
				576: {
					slidesPerView: 2,
					spaceBetween: 13,
				},
				768: {
					slidesPerView: 3,
					spaceBetween: 13,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
			},
		});
	}

	if (document.querySelector('.cases__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.cases__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			observer: true,
			observeParents: true,
			observeSlideChildren: true,
			slidesPerView: 4,
			spaceBetween: 17,
			speed: 800,

			// Пагинация

			pagination: {
				el: '.cases__pagination',
				clickable: true,
			},

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.cases__navigation .prev',
				nextEl: '.cases__navigation .next',
			},

			// Брейкпоинты

			breakpoints: {
				320: {
					slidesPerView: 1.2,
					spaceBetween: 20,
					autoHeight: true,
				},
				576: {
					slidesPerView: 2.2,
					spaceBetween: 20,
				},
				768: {
					slidesPerView: 3,
					spaceBetween: 10,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 20,
				},
			},
		});
	}

	if (document.querySelector('.awards__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.awards__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			observer: true,
			observeParents: true,
			observeSlideChildren: true,
			slidesPerView: 3,
			spaceBetween: 20,
			speed: 800,

			// Пагинация
			navigation: {
				prevEl: '.awards__navigation .prev',
				nextEl: '.awards__navigation .next',
			},
			// Брейкпоинты

			breakpoints: {
				320: {
					slidesPerView: 1.2,
					spaceBetween: 20,
					autoHeight: true,
				},
				576: {
					slidesPerView: 2.2,
					spaceBetween: 20,
				},
				768: {
					slidesPerView: 3,
					spaceBetween: 10,
				},
				1025: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
			},
		});
	}

	if (document.querySelector('.innovations__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.innovations__slider', { // Указываем скласс нужного слайдера
			observer: true,
			observeParents: true,
			observeSlideChildren: true,
			slidesPerView: 1,
			spaceBetween: 20,
			speed: 800,
			loop: true,

			navigation: {
				prevEl: '.innovations__navigation .prev',
				nextEl: '.innovations__navigation .next',
			},
		});
	}

	if (document.querySelector('.emotions__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.emotions__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			observer: true,
			observeParents: true,
			observeSlideChildren: true,
			slidesPerView: 3,
			spaceBetween: 16,
			autoHeight: true,
			speed: 800,
			loop: true,

			// Пагинация
			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.emotions__navigation .prev',
				nextEl: '.emotions__navigation .next',
			},

			// Брейкпоинты

			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 10,
				},
				576: {
					slidesPerView: 2,
					spaceBetween: 10,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 15,
				},
				992: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
			},
		});
	}

	if (document.querySelector('.news__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.news__slider', { // Указываем скласс нужного слайдера
			observer: true,
			observeParents: true,
			observeSlideChildren: true,
			slidesPerView: 3,
			spaceBetween: 15,
			// autoHeight: true,
			speed: 800,


			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.news__navigation .prev',
				nextEl: '.news__navigation .next',
			},

			// Брейкпоинты
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 10,
				},
				576: {
					slidesPerView: 1,
					spaceBetween: 10,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 15,
				},
				992: {
					slidesPerView: 2,
					spaceBetween: 15,
				},
				1268: {
					slidesPerView: 3,
					spaceBetween: 15,
				},
			},
			
		});
	}

	if (document.querySelector('.single-slider__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.single-slider__slider', { // Указываем скласс нужного слайдера
			observer: true,
			observeParents: true,
			observeSlideChildren: true,
			slidesPerView: 1,
			spaceBetween: 20,
			speed: 800,
			loop: true,
			autoHeight: true,

			navigation: {
				prevEl: '.single-slider__navigation .prev',
				nextEl: '.single-slider__navigation .next',
			},
		});
	}

}

document.addEventListener("DOMContentLoaded", function(e) {
	initSliders();
});