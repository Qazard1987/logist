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
        logoBlock = document.querySelector('.js-logo');

    if (!stickyHeader || !logoBlock) return;

    document.addEventListener('scroll', showStickyHeader);
    window.addEventListener('resize', showStickyHeader);
    showStickyHeader();

    function getLogoBottomCoord() {
        return logoBlock.getBoundingClientRect().top + logoBlock.clientHeight;
    }

    function showStickyHeader() {
        if (window.pageYOffset > getLogoBottomCoord() + 200) {
            stickyHeader.style.display = 'block';
            addJsAnimation(stickyHeader);
        } else {
            removeAnimation(stickyHeader);
            stickyHeader.style.display = 'none';
        }
    }

    function addJsAnimation(block) {
        block.classList.remove('animate__slideOutUp');
        block.classList.add('animate__slideInDown');
    }

    function removeAnimation(block) {
        block.classList.remove('animate__slideInDown');
        block.classList.add('animate__slideOutUp');
    }
});

//Модальные окна
document.addEventListener("DOMContentLoaded", function () {
    let triggers = document.querySelectorAll('.js-modal-trigger'),
        body = document.querySelector('.body');

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
            body.style.paddingRight = scrollWidth + 'px'
            modal.style.display = 'flex';
            modal
                .querySelector('.js-modal-window')
                .classList.add('animate__animated', 'animate__fadeInUp')
            let btnClose = modal.querySelector(`[data-close=${attr}]`);

            btnClose.addEventListener('click', closeModal);

            let innerHeight = modal.querySelector('.js-modal-window').clientHeight;

            if (innerHeight + 40 < document.documentElement.clientHeight) {
                modal.classList.add('n-scrollbar');
            }
        }
    }

    function closeModal() {
        let attr = this.dataset.close;
        let modal = document.querySelector(`[data-target=${attr}]`);
        if (modal) {
            body.style.overflowY = 'auto';
            body.style.paddingRight = 0;
            modal.style.display = 'none'

            modal
                .querySelector('.js-modal-window')
                .classList.remove('animate__animated', 'animate__fadeInUp', 'n-scrollbar');

            modal.classList.remove('n-scrollbar');
        }
    }

    addOpenModalListeners();
});

//Переключение видимости блоков с ответами (faq) для sm и lg версии
document.addEventListener("DOMContentLoaded", function () {
    let btns = document.querySelectorAll('[data-faq]'),
        separatop = 768;

    if (!btns.length) return;

    window.addEventListener('resize', removeAllActiveFaq)
    window.addEventListener('resize', activateFirstLgItem)

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
        let currentWindowWidth = window.innerWidth;

        if (currentWindowWidth >= separatop) {
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
        ;
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

//Высота iframe видео модалки
document.addEventListener('DOMContentLoaded', function () {
    let modalBtns = document.querySelectorAll('.js-modal-btn');

    if (!modalBtns.length) return;

    for (let i = 0; i < modalBtns.length; i++) {
        modalBtns[i].addEventListener('click', calcModalHeight);
    }

    window.addEventListener('resize', calcModalHeight);

    function calcModalHeight() {
        let wrapper = document.querySelector('.modal-video-inner');
        if (!wrapper) return;
        frame = wrapper.querySelector('iframe'),
            height = wrapper.clientWidth / 2;


        frame.style.height = height + 'px'
    }
})