import '../style/crashedCarousel.scss';

(function () {
    let index = 0;
    const currentTranslates = [];
    let transitionEnded = true;

    const slider = document.querySelector('.carousel-slides');
    const amount = slider.querySelectorAll('li').length;
    const oneSlideWidth = 80;
    const sliderWidth = oneSlideWidth * amount;

    slider.style.width = `${sliderWidth}vw`;

    for (let i = 0; i < amount; i++)  currentTranslates.push(-oneSlideWidth);

    window.addEventListener('resize', () => [...slider.children].forEach(slide => slide.style.transition = ''));

    // change slides inside carousel
    function slide(direction) {
        // add transition after first click
        const transitionSets = 'transform .5s linear';
        if (getComputedStyle(document.querySelector('li')).transition !== transitionSets) {
            [...slider.children].forEach(slide => slide.style.transition = transitionSets);
        }

        if (transitionEnded) {
            transitionEnded = false;

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
                slide.style.transform = `translateX(${trans}vw)`;
                currentTranslates[i] = trans;
                // prevent mess caused by multiple clicks
                slide.addEventListener('transitionend', () => transitionEnded = true);
            });

            const slideToMove = slider.querySelectorAll('li')[indexToMove];
            const trans = currentTranslates[indexToMove] + direction * sliderWidth;
            slideToMove.style.opacity = 0;
            slideToMove.style.transform = `translateX(${trans}vw)`;
            currentTranslates[indexToMove] = trans;
        }
    };

    // event listeners
    document.querySelector('.next-btn svg').addEventListener('click', () => slide(1));
    document.querySelector('.prev-btn').addEventListener('click', () => slide(-1));
})();