import Swiper, { Navigation} from 'swiper';

const swiper = new Swiper('.swiper', {
    direction: 'horizontal',

    slidesPerView: 1,
    spaceBetween: 25,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 50,
        }
    }
});