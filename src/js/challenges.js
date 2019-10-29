export const challenges = {
    secretMessage: {
        link: './secretMessage.html',
        title: 'Secret Message',
        tasks: `
            <li>
                Select all images locates inside <span class="tag-name">blockquote</span> element.
            </li>
            <li>
                Replace every selected image with the text held in its <span class="attribute-name">alt</span> attribute.
                <img src="../img/hint.png" class="hint" data-index="0" title="Show some hints">
            </li>
        `,
        hints: [
            [{
                text: '',
                link: ``
            }]
        ],
        checkPoints(usersCode) {
            const iframeDoc = document.querySelector('iframe').contentDocument;

            const quote = iframeDoc.querySelector('blockquote p');

            return [
                quote.textContent.toLowerCase() === 'Java is to JavaScript what car is to carpet'.toLowerCase()
            ];
        }
    },
    chessboard: {
        link: './chessboard.html',
        title: 'Chessboard',
        tasks: `
            <li>
                Select all elements that has a class <span class="class-name">row</span>.
            </li>
            <li>
                Each row has <span class="attribute-name">data-num</span> attriubute equal to odd or even number. Inside each odd row (according to its data-num attribute value) set background color of its children to black if their index is even. Do the same for odd cells inside even rows.
                <img src="../img/hint.png" class="hint" data-index="0" title="Show some hints">
            </li>
        `,
        hints: [
            [
                {
                    text: 'data-* attribute',
                    link: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*'
                },
                {
                    text: 'HTMLElement.dataset',
                    link: 'https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/dataset'
                },
                {
                    text: 'ParentNode.children',
                    link: 'https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/children'
                }
            ]
        ],
        checkFirst(usersCode) {
            return /iframeDoc\.(querySelectorAll\('\.row'\)|getElementsByClassName\('row'\))/.test(usersCode);
        },
        // check if all cells have apropriate background color
        checkCells(cells, checkParity) {
            const cellsCheck =  cells.map((cell, index) => {
                if (index % 2 === checkParity) {
                    return getComputedStyle(cell).backgroundColor === 'rgb(0, 0, 0)';
                } else {
                    return true;
                }
            });
            return cellsCheck.every(cell => cell);
        },
        checkSecond() {
            const iframeDoc = document.querySelector('iframe').contentDocument;
            const rows = iframeDoc.querySelectorAll('.row');

            return [...rows].map((row, i) => {
                const cells = row.querySelectorAll('.cell');
                const check = i % 2;
                
                return this.checkCells([...cells], check);
            });
        },
        checkPoints(usersCode) {
            return [
                this.checkFirst(usersCode),
                this.checkSecond()
            ];
        }
    },
    goodMorning: {
        link:'./goodMorning.html',
        title: 'Good Morning',
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
                Select element that has a <span class="class-name">moon</span> class amoung it's classes and delete this element (there are at least two ways you can do it).
                <img src="../img/hint.png" class="hint" data-index="1" title="Show some hints">
            </li>
            <li>
                Change <span class="css-property">display</span> property of the element with a <span class="class-name">sun</span> class to block.
            </li>
            <li>
                Select all elements that have a class <span class="class-name">window</span>. Replace their class <span class="class-name">asleep</span> with a new one: <span class="class-name">awake</span>.
                <img src="../img/hint.png" class="hint" data-index="2" title="Show some hints">
            </li>
        `,
        hints: [
            [
                {
                    text: 'Element.classList.add()',
                    link: `https://developer.mozilla.org/en-US/docs/Web/API/Element/classList#Methods`
                }
            ],
            [
                {
                    text: 'ChildNode.remove()',
                    link: 'https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove'
                },
                {
                   text: 'Node.removeChild()',
                    link: 'https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild'
                },
                {
                    text: 'Node.parentElement',
                    link: 'https://developer.mozilla.org/en-US/docs/Web/API/Node/parentElement'
                }
            ],
            [
                {
                    text: 'ChildNode.remove()',
                    link: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/classList'
                },
                {
                    text: 'NodeList',
                    link: 'https://developer.mozilla.org/en-US/docs/Web/API/NodeList#wikiArticle'
                }
            ]
        ],
        resultFirst(iframeDoc) {
            const elementsToCheck = [iframeDoc.querySelector('.grass'), iframeDoc.querySelector('.sky')];
            const taskDone = elementsToCheck.map(obj => obj.classList.contains('morning')).every(result => result);
            
            if (taskDone) iframeDoc.querySelector('.building').style.backgroundColor = 'rgb(15, 38, 170)';

            return taskDone;
            
        },
        resultSecond(iframeDoc) {
            return iframeDoc.querySelector('.moon') === null;
        },
        resultThird(iframeDoc) {
            const sun = iframeDoc.querySelector('.sun');
            return getComputedStyle(sun).display === 'block';
        },
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
    }
};