//Отображение видеофона на весь экран
document.addEventListener("DOMContentLoaded", function () {
    let video = document.querySelector('video.js-bg');

    if (!video) return;

    function handleResize() {
        let w0 = 1920, h0 = 1080, r0 = w0 / h0
        let w = window.innerWidth, h = window.innerHeight, r = w / h

        video.style.transform = r0 < r ? 'scaleX(' + r / r0 + ')' : 'scaleY(' + r0 / r + ')'
    }

    handleResize()
    window.addEventListener('resize', handleResize)
});

//Добавление header фона при scroll
document.addEventListener("DOMContentLoaded", function () {
    let header = document.querySelector('.js-header');

    if (!header) return;

    window.addEventListener('scroll', mutedHeader);

    function mutedHeader() {
        let isTop = window.pageYOffset;

        if (isTop > 0) {
            header.classList.add('muted')
        } else header.classList.remove('muted');
    }
});

//Появление header на главной странице при скролле
document.addEventListener("DOMContentLoaded", function () {
    let stickyHeader = document.querySelector('.js-visibility'),
        logoBlock = document.querySelector('.js-logo'),
        innerWidth = window.innerWidth;

    if (!stickyHeader || !logoBlock) return;

    let coord = getLogoBottomCoord();

    document.addEventListener('scroll', showStickyHeader);
    window.addEventListener('resize', showStickyHeaderResize);

    showStickyHeader();


    function getLogoBottomCoord() {
        let box = logoBlock.getBoundingClientRect();

        return box.top + window.pageYOffset + logoBlock.clientHeight;
    }

    function showStickyHeader() {
        if (window.pageYOffset >= coord) {
            stickyHeader.style.display = 'block';
            stickyHeader.classList.add('animate__slideInDown');
        } else {
            stickyHeader.style.display = 'none';
            stickyHeader.classList.remove('animate__slideInDown');
        }
    }

    function showStickyHeaderResize() {
        if (innerWidth !== window.innerWidth) {
            coord = getLogoBottomCoord();
            innerWidth = window.innerWidth;
            showStickyHeader();
        }
    }
});

//Модальные окна
document.addEventListener("DOMContentLoaded", function () {
    let triggers = document.querySelectorAll('.js-modal-trigger'),
        body = document.querySelector('.body'),
        header = document.querySelector('.js-header');

    if (!triggers.length) return;

    function addOpenModalListeners() {
        for (let i = 0; i < triggers.length; i++) {
            let current = triggers[i];
            current.addEventListener('click', openModal);
        }
    }

    function openModal() {
        let attr = this.dataset.trigger,
            modal = document.querySelector(`[data-target=${attr}]`);
        let scrollWidth = window.innerWidth - body.clientWidth;

        if (modal) {

            body.style.overflowY = 'hidden';
            body.style.paddingRight = scrollWidth + 'px';

            if (header) header.style.paddingRight = scrollWidth + 'px';
            modal.style.display = 'flex';
            modal
                .querySelector('.js-modal-window')
                .classList.add('animate__animated', 'animate__fadeInUp');

            modal.addEventListener('click', closeModal);
            window.addEventListener('resize', calcBeforeBgWrapperWidth.bind(null, modal))


            calcBeforeBgWrapperWidth(modal);
        }
    }

    function closeModal(event) {
        let target = event.target,
            button = target.closest('[data-close]'),
            layout = target.closest('.modal'),
            windowM = target.closest('.js-modal-window');

        if (button || layout && !windowM) {
            let body = document.querySelector('.body');

            body.style.overflowY = 'scroll';
            body.style.paddingRight = 0;

            window.removeEventListener('resize', calcBeforeBgWrapperWidth.bind(null, layout))

            if (header) header.style.paddingRight = 0;

            layout.style.display = 'none';
            layout.classList.remove('n-scrollbar');

            layout.querySelector('.js-modal-window')
                .classList.remove('animate__animated', 'animate__fadeInUp', 'n-scrollbar');
        }
    }

    function calcBeforeBgWrapperWidth(modal) {
        let bgOverlay = modal.querySelector('.js-overlay');
        calcInnerWindowHeight(modal);
        bgOverlay.style.width = modal.clientWidth + 'px';
    }

    function calcInnerWindowHeight(modal) {
        let innerHeight = modal.querySelector('.js-modal-window').clientHeight;

        if (innerHeight + 40 < document.documentElement.clientHeight && !modal.classList.contains('n-scrollbar')) {
            modal.classList.add('n-scrollbar');
        }

        if (innerHeight + 40 >= document.documentElement.clientHeight && modal.classList.contains('n-scrollbar')) {
            modal.classList.remove('n-scrollbar');
        }
    }

    addOpenModalListeners();
});

//Переключение видимости блоков с ответами (faq) для sm и lg версии
document.addEventListener("DOMContentLoaded", function () {
    let btns = document.querySelectorAll('[data-faq]'),
        innerWidth = window.innerWidth,
        innerWidth2 = window.innerWidth,
        separatop = 768;

    if (!btns.length) return;

    window.addEventListener('resize', removeAllActiveFaqResize)
    window.addEventListener('resize', activateFirstLgItemResize)

    activateFirstLgItem();

    for (let i = 0; i < btns.length; i++) {
        let btn = btns[i];
        btn.addEventListener('click', toggleFaq)
    }

    function toggleFaq() {
        let currentWindowWidth = window.innerWidth;

        removeAllActiveFaqExceptThis(this);

        if (currentWindowWidth < separatop) {
            let answerHeight = this.nextElementSibling.firstElementChild.clientHeight;

            this.classList.toggle('active');

            this.classList.contains('active') ?
                addSmAnswerVisibility(this, answerHeight) :
                removeSmAnswerVisibility(this)
        } else {
            this.classList.contains('active') ?
                null :
                toggleLgVisibility(this)
        }
    }

    function activateFirstLgItem() {

        if (innerWidth2 >= separatop) {
            let first = btns[0],
                attr = first.dataset.faq,
                activeAnswer = document.querySelector('[data-answer-lg=' + attr + ']');

            first.classList.add('active');
            activeAnswer.removeAttribute('hidden');
        }
    }

    function removeAllActiveFaq() {
        for (let i = 0; i < btns.length; i++) {
            if (btns[i].classList.contains('active')) {
                btns[i].classList.remove('active');
                removeSmAnswerVisibility(btns[i]);
                removeLgAnswerVisibility();
            }
        }
    }

    // onresize with safari start
    function activateFirstLgItemResize() {
        if (innerWidth2 !== window.innerWidth) {
            innerWidth2 = window.innerWidth;
            activateFirstLgItem();
        }
    }

    function removeAllActiveFaqResize() {
        if (innerWidth !== window.innerWidth) {
            innerWidth = window.innerWidth;
            removeAllActiveFaq();
        }
    }

    // onresize with safari end

    function removeAllActiveFaqExceptThis(el) {
        for (let i = 0; i < btns.length; i++) {
            if (btns[i].classList.contains('active') && el !== btns[i]) {
                btns[i].classList.remove('active');
                removeSmAnswerVisibility(btns[i])
            }
        }
    }

    function addSmAnswerVisibility(el, answerHeight) {
        el.nextElementSibling.style.maxHeight = answerHeight + 'px';
        el.nextElementSibling.classList.add('show')
    }

    function removeSmAnswerVisibility(el) {
        el.nextElementSibling.style.maxHeight = 0;
        el.nextElementSibling.classList.remove('show')
    }

    function removeLgAnswerVisibility() {
        let items = document.querySelectorAll('[data-answer-lg]');
        for (let i = 0; i < items.length; i++) {
            items[i].setAttribute('hidden', 'hidden');
        }
    }

    function toggleLgVisibility(el) {
        removeLgAnswerVisibility();

        let attr = el.dataset.faq,
            lgAnswer = document.querySelector('[data-answer-lg=' + attr + ']');

        el.classList.add('active');
        lgAnswer.removeAttribute('hidden');
    }
});