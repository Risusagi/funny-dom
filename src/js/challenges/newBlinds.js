const newBlinds = {
    link: './newBlinds.html',
    title: 'New Blinds',
    description: `
           <p>I want to buy new blinds for my kittchen, but I need to know precise sizes of the window. Can you help me with a measurement, please?</p>
        `,
    tasks: `
            <li>
                Inside elements that has one of the next classes: <span class="class-name">outer-width,</span>
                <span class="class-name">outer-height</span> select the child element with a <span class="class-name">size</span> class (one inside each). Inside that elements write value of the width and height of the element whose classes' list includes a <span class="class-name">window</span> class. <strong>Only integers (rounded up) without units are accepted.</strong>
                <img src="../img/hint.png" class="hint" data-index="0" title="Show some hints">
            </li>
            <li>
                Do the same for elements with a <span class="class-name">size</span> class inside elements that have an <span class="class-name">inner-width</span> or <span class="class-name">inner-height</span> classes. Give them value of the width and height of the content of the same element but <em>without</em> its border width.
                <img src="../img/hint.png" class="hint" data-index="1" title="Show some hints">
            </li>
        `,
    hints: [
        [
            {
                text: 'Element.offsetWidth',
                link: `https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth`
            },
            {
                text: 'Element.offsetHeight',
                link: `https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight`
            },
            {
                text: 'Window.getComputedStyle()',
                link: `https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle`
            },
            {
                text: 'String.replace()',
                link: `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace`
            },
            {
                text: 'Math.ceil()',
                link: `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil`
            }
        ],
        [
            {
                text: 'Element.clientWidth',
                link: `https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth`
            },
            {
                text: 'Element.clientHeight',
                link: `https://developer.mozilla.org/en-US/docs/Web/API/Element/clientHeight`
            }
        ]
    ],
    compareValues(usersVal, ans1, element, property) {
        // rounde value up
        const ans2 = parseInt(getComputedStyle(element)[property]) + 1;
        return usersVal === `${ans1}` || usersVal === `${ans2}`;
    },
    resultFirst(iframeDoc, win) {
        const outerWidth = iframeDoc.querySelector('.outer-width .size').textContent;
        const outerHeight = iframeDoc.querySelector('.outer-height .size').textContent;

        return this.compareValues(outerHeight, win.offsetHeight, win, 'height') && this.compareValues(outerWidth, win.offsetWidth, win, 'width');
    },
    resultSecond(iframeDoc, win) {
        const innerWidth = iframeDoc.querySelector('.inner-width .size').textContent;
        const innerHeight = iframeDoc.querySelector('.inner-height .size').textContent;

        return innerWidth === `${win.clientWidth}` && innerHeight === `${win.clientHeight}`;
    },
    checkPoints(usersCode) {
        const iframeDoc = document.querySelector('iframe').contentDocument;
        const win = iframeDoc.querySelector('.window');

        return [
            this.resultFirst(iframeDoc, win),
            this.resultSecond(iframeDoc, win)
        ];
    }
};

export default newBlinds;