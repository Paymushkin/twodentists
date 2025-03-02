// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

// Обработка аккордеона для мобильной версии services
function initServicesAccordion() {
  const serviceItems = document.querySelectorAll('.services__item');
  
  if (!serviceItems.length) return; // Проверяем наличие элементов

  // Добавляем класс первому элементу по умолчанию
  serviceItems[0].classList.add('active-item');

  serviceItems.forEach(item => {
    item.addEventListener('click', function(e) {
      // Проверяем, что клик был по заголовку
      if (!e.target.closest('.services__item-header')) return;

      const isActive = this.classList.contains('active-item');
      
      // Закрываем все активные элементы
      serviceItems.forEach(item => {
        item.classList.remove('active-item');
      });

      // Если элемент не был активен, открываем его
      if (!isActive) {
        this.classList.add('active-item');
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

// Обновляем функцию проверки согласия
function checkCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    const cookieBanner = document.querySelector('.cookie-banner');
    
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

// Обновляем функцию принятия куки
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
            if (window.myReviews) {
                new window.myReviews.BlockWidget({
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
                    var iframe = document.getElementById('myReviews__block-widgetg69812717');
                    if (iframe) {
                        iframe.title = "Виджет отзывов";
                    }
                }, 100);
            }
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
    if (enable) {
        return thirdPartyScripts.reduce((promise, scriptConfig) => {
            return promise.then(() => loadScript(scriptConfig));
        }, Promise.resolve());
    }
    return Promise.resolve();
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', checkCookieConsent);
