let isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};

// Обработка аккордеона для мобильной версии services
function initServicesAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  console.log(isMobile)
  if (!accordionItems.length && isMobile) return;

  // Функция для установки высоты контента
  function setContentHeight(content, isOpen) {
    // Сначала устанавливаем высоту текущего состояния
    content.style.height = isOpen ? '0px' : `${content.scrollHeight}px`;
    
    // Форсируем reflow
    content.offsetHeight;
    
    // Устанавливаем новую высоту с transition
    content.style.transition = 'height 0.3s ease-out';
    content.style.height = isOpen ? `${content.scrollHeight}px` : '0px';
    
    // Очищаем стили после завершения анимации
    content.addEventListener('transitionend', function handler() {
      if (isOpen) {
        content.style.height = 'auto';
      }
      content.style.transition = '';
      content.removeEventListener('transitionend', handler);
    }, { once: true });
  }

  // Инициализация первого элемента
  const firstContent = accordionItems[0].querySelector('.accordion-item-content');
  accordionItems[0].classList.add('active-item');
  setContentHeight(firstContent, true);

  // Инициализация остальных элементов
  accordionItems.forEach(item => {
    const content = item.querySelector('.accordion-item-content');
    if (!item.classList.contains('active-item')) {
      setContentHeight(content, false);
    }

    item.addEventListener('click', function(e) {
      if (!e.target.closest('.accordion-item-header')) return;

      const isActive = this.classList.contains('active-item');
      const currentContent = this.querySelector('.accordion-item-content');
      
      // Закрываем все активные элементы
      accordionItems.forEach(otherItem => {
        const otherContent = otherItem.querySelector('.accordion-item-content');
        otherItem.classList.remove('active-item');
        setContentHeight(otherContent, false);
      });

      // Если элемент не был активен, открываем его
      if (!isActive) {
        this.classList.add('active-item');
        setContentHeight(currentContent, true);
      }
    });
  });
}

// Вызываем функцию после загрузки DOM
document.addEventListener('DOMContentLoaded', initServicesAccordion);

function hideReviewsSection() {
    const reviewsSection = document.querySelector('#reviews'); // или другой селектор вашей секции
    if (reviewsSection) {
        reviewsSection.style.display = 'none';
    }
}

function showReviewsSection() {
    const reviewsSection = document.querySelector('#reviews');
    if (reviewsSection) {
        reviewsSection.style.display = 'block';
    }
}

// Определяем, нужно ли использовать куки
const useCookie = false;

// Функция проверки согласия
function checkCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    const cookieBanner = document.querySelector('.cookie-banner');
    
    if (!useCookie) {
        // Если куки не используются, сразу показываем все виджеты
        if (cookieBanner) cookieBanner.style.display = 'none';
        showReviewsSection();
        manageThirdPartyScripts(true);
        return;
    }

    if (consent === null) {
        cookieBanner.style.display = 'flex';
        hideReviewsSection();
    } else if (consent === 'true') {
        cookieBanner.style.display = 'none';
        showReviewsSection();
        manageThirdPartyScripts(true);
    } else {
        cookieBanner.style.display = 'none';
        hideReviewsSection();
    }
}

// Функция принятия куки
window.acceptCookies = function() {
    localStorage.setItem('cookieConsent', 'true');
    const cookieBanner = document.querySelector('.cookie-banner');
    cookieBanner.style.display = 'none';
    showReviewsSection();
    
    // Загружаем все сторонние скрипты
    manageThirdPartyScripts(true)
        .then(() => {
            console.log('Все сторонние скрипты успешно загружены');
        })
        .catch((error) => {
            console.error('Ошибка при загрузке скриптов:', error);
        });
}

window.rejectCookies = function() {
    localStorage.setItem('cookieConsent', 'false');
    const cookieBanner = document.querySelector('.cookie-banner');
    cookieBanner.style.display = 'none';
    hideReviewsSection();
}

// Конфигурация сторонних скриптов
const thirdPartyScripts = [
    {
        src: 'https://myreviews.dev/widget/dist/index.js',
        callback: () => {
            // Проверяем наличие секции отзывов на странице
            const reviewsSection = document.querySelector('#reviews');
            if (!reviewsSection) {
                console.log('Секция отзывов отсутствует на странице');
                return;
            }

            setTimeout(() => {
                if (window.myReviews) {
                    try {
                        const widget = new window.myReviews.BlockWidget({
                            uuid: "aedc1a00-efbc-447f-933e-95e846d00f71",
                            name: "g69812717",
                            additionalFrame: "none",
                            lang: "ru",
                            widgetId: "2",
                            iframeTitle: "Виджет отзывов",
                            cookieSettings: {
                                sameSite: 'Strict',
                                secure: true
                            }
                        }).init();

                        setTimeout(function() {
                            const iframe = document.getElementById('myReviews__block-widgetg69812717');
                            if (iframe) {
                                iframe.title = "Виджет отзывов";
                            }
                        }, 100);
                    } catch (error) {
                        console.log('Ошибка при инициализации виджета:', error);
                    }
                } else {
                    console.log('Библиотека myReviews не загружена');
                }
            }, 0);
        }
    },
    {
        src: 'https://cdn.carrotquest.io/api.min.js',
        callback: () => {
            if (window.carrotquest) {
                window.carrotquest_settings = {
                    cookie_settings: {
                        sameSite: 'Strict',
                        secure: true,
                        domain: window.location.hostname
                    }
                };
            }
        }
    },
    {
        src: 'https://mc.yandex.ru/metrika/tag.js',
        callback: () => {
            if (window.ym) {
                // Настройка Яндекс.Метрики с отключенными куки
                window.ym(YOUR_COUNTER_ID, "init", {
                    defer: true,
                    clickmap: false,
                    trackLinks: false,
                    accurateTrackBounce: false,
                    webvisor: false,
                    triggerEvent: false,
                    trustedDomains: [window.location.hostname],
                    childIframe: false,
                    type: 1,
                    useCookie: false, // Отключаем использование куки
                    useBeacon: true,
                    disableCookie: true, // Принудительно отключаем куки
                    ecommerce: false,
                    params: {
                        __ym: {
                            "disable_all_goals": true // Отключаем цели
                        }
                    }
                });

                // Отключаем отслеживание пользователей
                window.ym(YOUR_COUNTER_ID, 'notBounce');
                window.ym(YOUR_COUNTER_ID, 'enableAll', false);
            }
        }
    }
];

// Функция для загрузки скрипта
function loadScript(scriptConfig) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = scriptConfig.src;
        script.async = true;
        script.onload = () => {
            if (scriptConfig.callback) {
                scriptConfig.callback();
            }
            resolve();
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Функция для управления скриптами
function manageThirdPartyScripts(enable) {
    if (!useCookie || enable) {
        return thirdPartyScripts.reduce((promise, scriptConfig) => {
            return promise.then(() => loadScript(scriptConfig));
        }, Promise.resolve());
    }
    return Promise.resolve();
}

// Управление поисковой строкой
function initHeaderSearch() {
    const searchOpenBtn = document.getElementById('header-search-open');
    const searchCloseBtn = document.getElementById('header-search-close');
    const searchForm = document.getElementById('header-search-form');
    const headerNav = document.getElementById('header-nav');
    
    if (!searchOpenBtn || !searchCloseBtn || !searchForm) {
        console.warn('Не найдены элементы поиска');
        return;
    }

    // Показать поиск
    function showSearch() {
        searchOpenBtn.style.display = 'none';
        searchCloseBtn.style.display = 'flex';
        searchForm.style.display = 'flex';
        headerNav.style.display = 'none';
    }

    // Скрыть поиск
    function hideSearch() {
        searchOpenBtn.style.display = 'flex';
        searchCloseBtn.style.display = 'none';
        searchForm.style.display = 'none';
        headerNav.style.display = 'flex';
    }

    // Обработчики событий
    searchOpenBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showSearch();
    });

    searchCloseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        hideSearch();
    });

    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchForm.style.display === 'flex') {
            hideSearch();
        }
    });
    
    // Предотвращаем отправку формы
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Здесь можно добавить логику обработки поиска
    });
    
}
initHeaderSearch();

const popupShowElements = document.querySelectorAll("[data-popup]") || null
const popupHideElements = document.querySelectorAll(".popup__close") || null

function popupClose(element) {
    const popup = element.closest('.popup');
    if (!popup) return;

    // Находим iframe и очищаем его src
    const iframe = popup.querySelector('iframe');
    if (iframe && iframe.src) {
        iframe.src = '';
    }

    if (popup.dataset.single === "true" || element.classList.contains("popup__close")) {
        popup.classList.remove('popup_show');
        document.documentElement.classList.remove('lock');
        document.documentElement.classList.remove('popup-show');
    } else {
        element.closest('.popup').classList.remove('popup_show');
    }
}

function popupShow(element) {
    let popupId = element.getAttribute("data-popup");
    const currentPopup = document.querySelector(`#${popupId}`);
    
    // Проверяем наличие iframe и загружаем его
    const iframe = currentPopup.querySelector('iframe');
    if (iframe && iframe.dataset.src) {
        iframe.src = iframe.dataset.src;
    }
    
    currentPopup.classList.add('popup_show')
    document.documentElement.classList.add('lock');
    document.documentElement.classList.add('popup-show');

    // Обработчик клика на wrapper
    const wrapper = currentPopup.querySelector('.popup__wrapper');
    if (wrapper) {
        wrapper.addEventListener('click', function(e) {
            if (e.target === wrapper) {
                popupClose(currentPopup.querySelector(".popup__close"));
            }
        });
    }
}

if (popupShowElements.length) {
    popupShowElements.forEach(element => {
        element.addEventListener("click", () => {
            popupShow(element)
        })
    });
}

if (popupHideElements.length) {
    popupHideElements.forEach(element => {
        element.addEventListener("click", () => {
            console.log(element)
            popupClose(element)
        })
    })
}

// Находим все слайдеры на странице
const compareSliders = document.querySelectorAll('.slider-compare');

// Если слайдеры найдены, добавляем функционал для каждого
if (compareSliders.length) {
    compareSliders.forEach(slider => {
        // Находим range input внутри конкретного слайдера
        const range = slider.querySelector('.slider-compare__range-js');
        
        if (range) {
            // Добавляем обработчик для каждого range
            range.addEventListener('input', () => {
                slider.style.setProperty('--value', range.value + '%');
            });
        } else {
            console.log('Range input не найден в слайдере');
        }
    });
} else {
    console.log('Слайдеры сравнения не найдены на странице');
}

document.querySelectorAll('.mobile-menu__button').forEach(button => {
    button.addEventListener('click', () => {
        const expanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', !expanded);
        
        // Находим связанное подменю
        const submenu = button.nextElementSibling;
        if (submenu && submenu.classList.contains('mobile-menu__sub-list')) {
            // Устанавливаем высоту для анимации
            if (!expanded) {
                submenu.classList.add('open');
                submenu.style.height = submenu.scrollHeight + 'px';
            } else {
                submenu.classList.remove('open');
                submenu.style.height = '0px';
            }
        }
    });
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    if (!useCookie) {
        // Если куки не используются, сразу загружаем все виджеты
        showReviewsSection();
        manageThirdPartyScripts(true);
    } else {
        checkCookieConsent();
    }
});