function initHeaderScroll() {
    const header = document.querySelector('.header__bottom');
    if (!header) return;

    let lastScroll = 0;
    const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
    const containHide = () => header.classList.contains('_sticky');

    window.addEventListener('scroll', () => {
        if (scrollPosition() > 100) { // Показываем после скролла на 100px
            header.classList.add('_sticky');
        } else {
            header.classList.remove('_sticky');
        }
        lastScroll = scrollPosition();
    });
}

window.addEventListener('load', initHeaderScroll); 