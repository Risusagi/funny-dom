const crashedCarousel = {
    link: './crashedCarousel.html',
    title: 'Crashed Carousel',
    description: `
            <p>Yesterday carousel with images worked perfect but today something is wrong with it. Can you fix it, please?</p>
        `,
    tasks: `
            <li>
                Change URLs of images that are placed inside <span class="tag-name">figure</span> elements with ascribed <span class="attribute-name">data-link</span> attribute to that attribute's value.
            </li>
            <li>
                Remove <span class="tag-name">figcaption</span> elements connected with images whose URLs were changed.
            </li>
            <li>
                Add signatures inside empty <span class="tag-name">figcaption</span> elements. You'll find proper text for every signature inside <span class="attribute-name">data-description</span> attributes of <span class="tag-name">figcaption's</span> parent element that has a <span class="class-name">slide</span> class.
                <img src="../img/hint.png" class="hint" data-index="0" title="Show some hints">
            </li>
        `,
    hints: [
        [
            {
                text: 'Element.closest()',
                link: `https://developer.mozilla.org/en-US/docs/Web/API/Element/closest`
            }
        ]
    ],

    resultFirst(selectedFigures) {
        const checkPoints = selectedFigures.map(figure => {
            const regEx = new RegExp(`${figure.dataset.link}$`)
            return figure.querySelector('img').src.match(regEx);
        });
        return checkPoints.every(check => check);  
    },
    resultSecond(selectedFigures) {
        const checkPoints = selectedFigures.map(figure => {
            return figure.querySelector('figcaption');
        });
        return checkPoints.every(check => !check);
    },
    resultThird(iframeDoc) {
        const slides = [...iframeDoc.querySelectorAll('.slide')];
        const selectedSlides = slides.filter(slide => slide.dataset.description);
        const checkPoints = selectedSlides.map(slide => {
            return slide.querySelector('figcaption').textContent === slide.dataset.description;
        });
        return checkPoints.every(check => check);
    },
    // repare urls adding path to proper folder
    correctImgURLs(iframeDoc) {
        [...iframeDoc.images].forEach(img => {            
            const linkCorr = /img\/crashedCarousel\/[a-z1-9\-]+\.jpg$/.test(img.src);
            if (linkCorr) return;
            const fileName = img.src.match(/[a-z1-9\-]+\.jpg$/)[0];
            img.src = img.src.replace(fileName, `img/crashedCarousel/${fileName}`);
        });
    },
    checkPoints(usersCode) {
        const iframeDoc = document.querySelector('iframe').contentDocument;

        this.correctImgURLs(iframeDoc);

        const figures = [...iframeDoc.querySelectorAll('figure')];
        const selectedFigures = figures.filter(figure => figure.dataset.link);

        return [
            this.resultFirst(selectedFigures),
            this.resultSecond(selectedFigures),
            this.resultThird(iframeDoc)
        ];
    }
};

export default crashedCarousel;