/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Pagination, Autoplay, Navigation } from "swiper";
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
// import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Добавление классов слайдерам
// swiper главному блоку, swiper-wrapper оболочке, swiper-slide для слайдов
function bildSliders() {
  console.log("свайпер");
  // BildSlider
  let sliders = document.querySelectorAll(
    `[class*="__swiper"]:not(.swiper-wrapper)`
  );
  if (sliders) {
    sliders.forEach((slider) => {
      slider.parentElement.classList.add("swiper");
      slider.classList.add("swiper-wrapper");
      for (const slide of slider.children) {
        slide.classList.add("swiper-slide");
      }
    });
  }
}

// Инициализация слайдеров
function initSliders() {
  // добавление классов слайдерам
  // при необходимости отключить
  bildSliders();
  // Перечень слайдеров
  // Проверяем, есть ли слайдер на стронице
  if (document.querySelector(".swiper:not(.popup__slider)")) {
    // Указываем скласс нужного слайдера
    // Создаем слайдер
    new Swiper(".swiper:not(.popup__slider)", {
      // Указываем скласс нужного слайдера
      // Подключаем модули слайдера
      // для конкретного случая
      modules: [Autoplay, Navigation],
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 0,
      // autoHeight: true,
      speed: 800,

      //touchRatio: 0,
      //simulateTouch: false,
      loop: true,
      //preloadImages: false,
      //lazy: true,
      // parallax: true,

      // Эффекты
      effect: "fade",
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },

      // Пагинация

      // pagination: {
      // 	el: '.swiper-pagination',
      // 	clickable: true,
      // 	type: "fraction",
      // },

      // Скроллбар
      /*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

      // Кнопки "влево/вправо"
      navigation: {
        prevEl: ".navigation .prev",
        nextEl: ".navigation .next",
      },

      // Брейкпоинты
      /*
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
      // События
      // on: {
      // 	init: function(swiper) {
      // 		const allSlides = document.querySelector(".fraction-controll__all");
      // 		const allSlidesItems = document.querySelectorAll(".slide-main-block:not(.swiper-slide-duplicate)");

      // 		allSlides.textContent = allSlidesItems.length < 10 ? `0${allSlidesItems.length}` : allSlidesItems.length;
      // 	},
      // 	slideChange: function(swiper) {
      // 		const currentSlide = document.querySelector(".fraction-controll__current");
      // 		currentSlide.textContent = (swiper.realIndex + 1) < 10 ? `0${swiper.realIndex + 1}` : swiper.realIndex + 1;
      // 	}
      // }
    });
  }

  if (document.querySelector(".popup__slider.swiper")) {
    // Указываем скласс нужного слайдера
    // Создаем слайдер
    new Swiper(".popup__slider.swiper", {
      // Указываем скласс нужного слайдера
      // Подключаем модули слайдера
      // для конкретного случая
      modules: [Navigation],
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 0,
      // autoHeight: true,
      speed: 800,

      //touchRatio: 0,
      //simulateTouch: false,
      loop: true,
      //preloadImages: false,
      //lazy: true,
      // parallax: true,

      // Эффекты
      effect: "fade",
      // autoplay: {
      // 	delay: 3000,
      // 	disableOnInteraction: false,
      // },

      // Пагинация

      // pagination: {
      // 	el: '.swiper-pagination',
      // 	clickable: true,
      // 	type: "fraction",
      // },

      // Скроллбар
      /*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

      // Кнопки "влево/вправо"
      navigation: {
        prevEl: ".popup-slider__navigation .prev",
        nextEl: ".popup-slider__navigation .next",
      },

      // Брейкпоинты
      /*
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
      // События
      // on: {
      // 	init: function(swiper) {
      // 		const allSlides = document.querySelector(".fraction-controll__all");
      // 		const allSlidesItems = document.querySelectorAll(".slide-main-block:not(.swiper-slide-duplicate)");

      // 		allSlides.textContent = allSlidesItems.length < 10 ? `0${allSlidesItems.length}` : allSlidesItems.length;
      // 	},
      // 	slideChange: function(swiper) {
      // 		const currentSlide = document.querySelector(".fraction-controll__current");
      // 		currentSlide.textContent = (swiper.realIndex + 1) < 10 ? `0${swiper.realIndex + 1}` : swiper.realIndex + 1;
      // 	}
      // }
    });
  }
}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)

window.addEventListener("load", function (e) {
  // Запуск инициализации слайдеров
  initSliders();
  // Удаление атрибута data-fancybox у дубликатов слайдов
  document.querySelectorAll(".swiper-slide-duplicate").forEach(slide => {
    slide.removeAttribute("data-fancybox");
  });
  // Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
  //initSlidersScroll();
});