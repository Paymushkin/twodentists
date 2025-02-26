function initMenuOverflow() {
    const menuList = document.querySelector('.menu__list');
    const menuButton = document.querySelector('.menu__button');
    
    if (!menuList || !menuButton) {
        console.error('Не найдены необходимые элементы меню');
        return;
    }

    const menuItems = Array.from(menuList.children).filter(item => !item.classList.contains('menu__button'));
    const moreMenu = document.createElement('ul');
    moreMenu.className = 'more-menu';
    menuButton.appendChild(moreMenu);

    function updateMenu() {
        // Сброс состояния
        menuItems.forEach(item => item.style.display = 'flex');
        menuButton.style.display = 'none';
        moreMenu.innerHTML = '';

        // Получаем размеры
        const menuWidth = menuList.getBoundingClientRect().width;
        const buttonWidth = menuButton.getBoundingClientRect().width;
        const gap = 20; // Отступ между элементами из CSS
        let totalWidth = 0;
        const hiddenItems = [];

        // Проверяем каждый пункт меню
        menuItems.forEach((item, index) => {
            const itemWidth = item.getBoundingClientRect().width;
            // Добавляем ширину элемента и отступ
            totalWidth += itemWidth + gap;

            // Если общая ширина превышает доступную
            if (totalWidth + buttonWidth > menuWidth) {
                hiddenItems.push(item);
                item.style.display = 'none';
            }
        });

        // Показываем кнопку "ещё", если есть скрытые пункты
        if (hiddenItems.length > 0) {
            menuButton.style.display = 'flex';
            
            hiddenItems.forEach(item => {
                const clonedItem = item.cloneNode(true);
                clonedItem.style.display = 'flex';
                moreMenu.appendChild(clonedItem);
            });
        }
    }

    // Обработчик ресайза с debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateMenu, 100);
    });

    // Запускаем первичную инициализацию после небольшой задержки
    setTimeout(updateMenu, 100);
}

// Запускаем после загрузки DOM
document.addEventListener('DOMContentLoaded', initMenuOverflow);