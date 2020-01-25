const goodMorning = {
    link: './goodMorning.html',
    title: 'Good Morning',
    description: `
           <p>It looks like a sunrise is late today. Don't you think we should hurry it up a little bit?</p>
        `,
    tasks: `
            <li>
                Select elements that have one of the next classes:
                <ul>
                    <li><span class="class-name">sky</span>,</li>
                    <li><span class="class-name">grass</span>.</li>
                </ul>
                Add to their classes' lists a class <span class="class-name">morning</span>.
                <img src="../img/hint.png" class="hint" data-index="0" title="Show some hints">
            </li>
            <li>
                Select element that has a <span class="class-name">moon</span> class among its classes and delete this element (there are at least two ways you can do it).
            </li>
            <li>
                Change <span class="css-property">display</span> property of the element with a <span class="class-name">sun</span> class to block.
            </li>
            <li>
                Select all elements that have a class <span class="class-name">window</span>. Replace their class <span class="class-name">asleep</span> with a new one: <span class="class-name">awake</span>.
                <img src="../img/hint.png" class="hint" data-index="1" title="Show some hints">
            </li>
        `,
    hints: [
        [
            {
                text: 'Element.classList.add()',
                link: `https://developer.mozilla.org/en-US/docs/Web/API/Element/classList`
            }
        ],
        [
            {
                text: 'Element.classlist.replace()',
                link: `https://developer.mozilla.org/en-US/docs/Web/API/Element/classList`
            },
            {
                text: 'NodeList (looping through node lists)',
                link: `https://developer.mozilla.org/en-US/docs/Web/API/NodeList#wikiArticle`
            }
        ]
    ],
    // check if user added morning class to required elements and change color of the building
    resultFirst(iframeDoc) {
        const elementsToCheck = [...iframeDoc.querySelectorAll('.grass, .sky')];
        const taskDone = elementsToCheck.map(obj => obj.classList.contains('morning')).every(result => result);

        if (taskDone) iframeDoc.querySelector('.building').style.backgroundColor = 'rgb(15, 38, 170)';

        return taskDone;

    },
    // check if moon was deleted
    resultSecond(iframeDoc) {
        return iframeDoc.querySelector('.moon') === null;
    },
    // check if sun is visible
    resultThird(iframeDoc) {
        const sun = iframeDoc.querySelector('.sun');
        return getComputedStyle(sun).display === 'block';
    },
    // check if class was changed from asleep to awake for all windows
    resultFourth(iframeDoc) {
        const windows = [...iframeDoc.querySelectorAll('.window')];
        const resultsArray = windows.map(win => (!win.classList.contains('asleep')) && win.classList.contains('awake'));
        return resultsArray.every(result => result);
    },
    checkPoints(usersCode) {
        const iframeDoc = document.querySelector('iframe').contentDocument;

        return [
            this.resultFirst(iframeDoc),
            this.resultSecond(iframeDoc),
            this.resultThird(iframeDoc),
            this.resultFourth(iframeDoc)
        ];
    }
};

export default goodMorning;