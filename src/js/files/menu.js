document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.button-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', function() {
            menuButton.classList.toggle('menu-open');
            mobileMenu.classList.toggle('active');
            body.classList.toggle('lock');
        });

        // Закрытие при клике вне меню
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                menuButton.classList.remove('menu-open');
                mobileMenu.classList.remove('active');
                body.classList.remove('lock');
            }
        });
    }
}); 