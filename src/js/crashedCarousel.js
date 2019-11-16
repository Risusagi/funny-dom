import '../style/crashedCarousel.scss';

(function () {
    let index = 0;
    const currentTranslates = [];

    const slider = document.querySelector('.carousel-slides');
    const amount = slider.querySelectorAll('li').length;
    const oneSlideWidth = parseFloat(getComputedStyle(slider.parentElement).width);
    const sliderWidth = oneSlideWidth * amount;

    slider.style.width = `${sliderWidth}px`;

    [...slider.children].forEach(slide => slide.style.transition = 'transform .5s linear');

    for (let i = 0; i < amount; i++)  currentTranslates.push(-oneSlideWidth);

    // change slides inside carousel
    function slide(direction) {
        let indexToMove = 0;
        if (direction === 1) {
            indexToMove = index % amount;
            index++;
        } else if (direction === -1) {
            index--;
            if (index < 0) index = amount - 1;
            indexToMove = index % amount;
        }

        [...slider.children].forEach((slide, i) => {
            const trans = currentTranslates[i] - direction * oneSlideWidth;
            slide.style.opacity = 1;
            slide.style.transform = `translateX(${trans}px)`;
            currentTranslates[i] = trans;
        });

        const slideToMove = slider.querySelectorAll('li')[indexToMove];
        const trans = currentTranslates[indexToMove] + direction * sliderWidth;
        slideToMove.style.opacity = 0;
        slideToMove.style.transform = `translateX(${trans}px)`;
        currentTranslates[indexToMove] = trans;
    };

    // event listeners
    document.querySelector('.next-btn svg').addEventListener('click', () => slide(1));
    document.querySelector('.prev-btn').addEventListener('click', () => slide(-1));
})();