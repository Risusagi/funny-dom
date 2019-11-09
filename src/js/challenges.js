export const challenges = {
    secretMessage: {
        link: './secretMessage.html',
        title: 'Secret Message',
        tasks: `
            <li>
                Select all images located inside <span class="tag-name">blockquote</span> element. (There is only one blockquote and images are not its direct children.)
            </li>
            <li>
                Replace every selected image with the text held in its <span class="attribute-name">alt</span> attribute.
                <img src="../img/hint.png" class="hint" data-index="0" title="Show some hints">
            </li>
            <li>
                Delete all images that weren't replaced with text.
                <img src="../img/hint.png" class="hint" data-index="1" title="Show some hints">
            </li>
        `,
        hints: [
            [
                {
                    text: 'Document.createTextNode()',
                    link: `https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode`
                },
                {
                    text: 'Node.parentElement',
                    link: `https://developer.mozilla.org/en-US/docs/Web/API/Node/parentElement`
                },
                {
                    text: 'Node.replaceChild()',
                    link: `https://developer.mozilla.org/en-US/docs/Web/API/Node/replaceChild`
                },
                {
                    text: 'Document.images',
                    link: `https://developer.mozilla.org/en-US/docs/Web/API/Document/images`
                }
            ],
            [
               {
                   text: 'ChildNode.remove()',
                   link: `https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove`
               },
               {
                   text: 'Node.removeChild()',
                   link: `https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild`
               }
            ]
        ],
        checkFirst(usersCode) {
            const checkPoints = [
                // two searches separated
                [
                    /iframeDoc\.(querySelector|getElementsByTagName)\(('|"|`)blockquote('|"|`)\)/.test(usersCode),
                    /(?<!iframeDoc)\.((querySelectorAll|getElementsByTagName)\(('|"|`)img('|"|`)\)|images)/.test(usersCode)
                ].every(statement => statement),
                // select images with one command
                /iframeDoc\.querySelectorAll\(('|"|`)blockquote img('|"|`)\)/.test(usersCode)
            ];
            return checkPoints.includes(true);
        },
        checkSecond(iframeDoc) {
            const quote = iframeDoc.querySelector('blockquote p');
            return /Java is to JavaScript what car is to carpet/i.test(quote.textContent.toLowerCase())
        },
        checkThird(iframeDoc) {
            return iframeDoc.images.length === 0;
        },
        checkPoints(usersCode) {
            const iframeDoc = document.querySelector('iframe').contentDocument;
            return [
                this.checkFirst(usersCode),
                this.checkSecond(iframeDoc),
                this.checkThird(iframeDoc)
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
                    link: `https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*`
                },
                {
                    text: 'HTMLElement.dataset',
                    link: `https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/dataset`
                },
                {
                    text: 'ParentNode.children',
                    link: `https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/children`
                }
            ]
        ],
        checkFirst(usersCode) {
            return /iframeDoc\.(querySelectorAll\(('|"|`)\.row('|"|`)\)|getElementsByClassName\(('|"|`)row('|"|`)\))/.test(usersCode);
        },
        // check if all cells have apropriate background color
        checkCells(cells, checkParity) {
            const cellsCheck = cells.map((cell, i) => {
                if (checkParity === i % 2) {
                    return getComputedStyle(cell).backgroundColor === 'rgb(0, 0, 0)';
                } else {
                    return getComputedStyle(cell).backgroundColor !== 'rgb(0, 0, 0)';
                }
            });
            return cellsCheck.every(cell => cell);
        },
        checkSecond() {
            const iframeDoc = document.querySelector('iframe').contentDocument;
            const rows = iframeDoc.querySelectorAll('.row');

            return [...rows].map((row, index) => {
                const cells = [...row.querySelectorAll('.cell')];
                const check = index % 2;
                
                return this.checkCells(cells, check);
            }).every(el => el);
        },
        checkPoints(usersCode) {
            return [
                this.checkFirst(usersCode),
                this.checkSecond()
            ];
        }
    },
    newBlinds: {
        link: './newBlinds.html',
        title: 'New Blinds',
        tasks: `
            <li>
            </li>
        `,
        hints: [
            [
                {
                    text: '',
                    link: ``
                }
            ]
        ],
        checkPoints(usersCode) {
            return [
                
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
                    link: `https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove`
                },
                {
                   text: 'Node.removeChild()',
                    link: `https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild`
                },
                {
                    text: 'Node.parentElement',
                    link: `https://developer.mozilla.org/en-US/docs/Web/API/Node/parentElement`
                }
            ],
            [
                {
                    text: 'ChildNode.remove()',
                    link: `https://developer.mozilla.org/en-US/docs/Web/API/Element/classList`
                },
                {
                    text: 'NodeList',
                    link: `https://developer.mozilla.org/en-US/docs/Web/API/NodeList#wikiArticle`
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