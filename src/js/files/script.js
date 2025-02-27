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
