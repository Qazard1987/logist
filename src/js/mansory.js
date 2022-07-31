import Masonry from 'masonry-layout';

document.addEventListener("DOMContentLoaded", function () {
    let grid = document.querySelector('#masonry');

    if (grid) {
        new Masonry('#masonry', {
            itemSelector: '.transportation__item',
            gutter: 20,
            columnWidth: '.item-width',
            horizontalOrder: true,
            resize: true,
        });
    }

    window.addEventListener('resize', function () {
        let grid = document.querySelector('#masonry');

        if (grid) {
            new Masonry('#masonry', {
                itemSelector: '.transportation__item',
                gutter: 20,
                columnWidth: '.item-width',
                horizontalOrder: true,
                resize: true,
            });
        }
    })
})
