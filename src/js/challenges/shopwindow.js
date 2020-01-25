const shopwindow =  {
    link: './shopwindow.html',
    title: 'Shopwindow',
    description: `
            <p>A new worker put one of the dolls on the wrong shelf and forgot to write prices on some of the price tags. Help him a little bit, please.</p>
        `,
    tasks: `
            <li>
                Move first child of the element with a <span class="class-name">bottom-shelf</span> class (doll on the left side of the bottom shelf) to its previous sibling element (top shelf) so that it become its last child.
                <img src="../img/hint.png" class="hint" data-index="0" title="Show some hints">
            </li>
            <li>
                Write prices for toys that have an empty price tag (element whose list of classes contains class <span class="class-name">price</span>). Dolls cost 15 and bears &#x2012 50. Dolls have a <span class="class-name">doll</span> class on their lists of classes and bears &#x2012 a <span class="class-name">bear</span> class.
                <img src="../img/hint.png" class="hint" data-index="1" title="Show some hints">
            </li>
        `,
    hints: [
        [
            {
                text: 'ParentNode.firstElementChild',
                link: `https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/firstElementChild`
            },
            {
                text: 'Node.previousElementSibling',
                link: `https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/previousElementSibling`
            },
            {
                text: 'Node.appendChild()',
                link: `https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild`
            }
        ],
        [
            {
                text: 'Element.classList',
                link: `https://developer.mozilla.org/en-US/docs/Web/API/Element/classList`
            }
        ]
    ],
    // check if doll is on the right place
    resultFirst(iframeDoc) {
        const lostDoll = iframeDoc.querySelector('.lost-doll');
        return iframeDoc.querySelector('.top-shelf').lastElementChild === lostDoll && ![...iframeDoc.querySelector('.bottom-shelf').children].includes(lostDoll);
    },
    // check price tags
    resultSecond(iframeDoc) {
        const priceTags = [...iframeDoc.querySelectorAll('.price')];
        const prices = ['20', '35', '15', '15', '15', '50', '50'];
        return priceTags.map((price, i) => price.textContent === prices[i]).every(el => el);
    },
    checkPoints(usersCode) {
        const iframeDoc = document.querySelector('iframe').contentDocument;

        return [
            this.resultFirst(iframeDoc),
            this.resultSecond(iframeDoc)
        ];
    }
};

export default shopwindow;