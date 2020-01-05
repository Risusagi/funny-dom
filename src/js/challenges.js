export const challenges = {
    shopwindow: {
        link: './shopwindow.html',
        title: 'Shopwindow',
        description: `
            <p>A new worker put one of the dolls on the wrong shelf and forgot to write prices on some of the price tags. Help him a little bit, please.</p>
        `,
        tasks: `
            <li>
                Move first child of the element with a <span class="class-name">bottom-shelf</span> class to its previous sibling element so that it become its last child.
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
                    text: 'Node.previousSibling',
                    link: `https://developer.mozilla.org/en-US/docs/Web/API/Node/previousSibling`
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
        resultFirst(iframeDoc) {
            const lostDoll = iframeDoc.querySelector('.lost-doll');
            return iframeDoc.querySelector('.top-shelf').lastElementChild === lostDoll && ![...iframeDoc.querySelector('.bottom-shelf').children].includes(lostDoll);
        },
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
    },
    secretMessage: {
        link: './secretMessage.html',
        title: 'Secret Message',
        description: `
            <p>Do you like movies about James Bond? If so this task would be a piece of cake for you. You just need to decrypt this quote.</p>
        `,
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
        description: `
            <p>I wanted to make some chessboards but I don't have enough time to finish the last one. Could you please do it for me? I have made a frame you just need to color it inside.</p>
        `,
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
    idCard: {
        link: './idCard.html',
        title: 'ID Card',
        description: `
            <p>Here is a page that creates identifiers for company workers. Can you help me to finish it so that it would complete an ID card according to data from the form?</p>
        `,
        tasks: `
            <li>
                Append an event handler to a <span class="tag-name">form</span> element that would prevent it from its default behavior on submit event.
            </li>
            <li>
                Inside that function add logic that would concatinate values of <span class="tag-name">inputs</span> with <span class="attribute-name">firstName</span> and <span class="attribute-name">surname</span> ids to one string and replace text inside element which has a <span class="class-name">worker-name</span> class with that string being capitalized.
            </li>
        `,
        hints: [
            []
        ],
        checkFirst(iframeDoc, confirmBtn) {
            const form = iframeDoc.querySelector('form');
            let myEvent;

            form.addEventListener('submit', (e) => {
                myEvent = e;
            });
            
            confirmBtn.click();
            
            return myEvent.defaultPrevented;
        },
        checkSecond(iframeDoc, confirmBtn) {
            const nameInput = iframeDoc.querySelector('#firstName');
            const surnameInput = iframeDoc.querySelector('#surname');
            // check capitalization
            nameInput.value = 'nAme';
            surnameInput.value = 'SuRname';
            
            confirmBtn.click();

            const requeiredValue = `${nameInput.value} ${surnameInput.value}`.toUpperCase();

            const workerNameEl = iframeDoc.querySelector('.worker-name');

            // clean all values so that user doesn't see them
            nameInput.value = '';
            surnameInput.value = '';

            // get text before cleaning
            const name = workerNameEl.textContent;

            workerNameEl.textContent = '';

            return name === requeiredValue;
        },
        checkPoints(usersCode) {
            const iframeDoc = document.querySelector('iframe').contentDocument;
            const confirmBtn = iframeDoc.querySelector('.confirm-btn');
            
            return [
              this.checkFirst(iframeDoc, confirmBtn),
              this.checkSecond(iframeDoc, confirmBtn)
            ];
        }
    },
    newBlinds: {
        link: './newBlinds.html',
        title: 'New Blinds',
        description: `
           <p>I want to buy new blinds for my kittchen, but I need to know precise sizes of the window. Can you help me with a measurement, please?</p>
        `,
        tasks: `
            <li>
                Inside elements that has one of the next classes: <span class="class-name">outer-width,</span>
                <span class="class-name">outer-height</span> select the child element with a <span class="class-name">size</span> class (one inside each). Give these elements value of the width and height of the element whose classes' list includes a <span class="class-name">window</span> class. <strong>Only integers (rounded up) without units are accepted.</strong>
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
    },
    goodMorning: {
        link:'./goodMorning.html',
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
    },
    crashedCarousel: {
        link: './crashedCarousel.html',
        title: 'Crashed Carousel',
        description: `
            <p>Yesterday carousel with images worked perfect but today something is wrong with it. Can you fix it, please?</p>
            <p>P.S. I have marked images that doesn't match to simplify it for you.</p>
        `,
        tasks: `
            <li>
                Change links of images whose signature (a <span class="tag-name">figcaption</span> element next to them) contains text "Hmm, something is wrong here...". You'll find proper links inside images' <span class="attribute-name">alt</span> attributes.
            </li>
            <li>
                After repairing links add more suitable descriptions at <span class="attribute-name">alt</span> attributes of repaired images and delete <span class="tag-name">figcaption</span> elements connected with them.
            </li>
            <li>
                Change text of <span class="tag-name">figcaption</span> elements that are placed inside the same <span class="tag-name">figure</span> elements with images whose <span class="attribute-name">title</span> attribute isn't empty to that attribute's value. After that delete that attribute.
            </li>
        `,
        hints: [],
        properLinks: ['standing-on-branch.jpg','hiding-behind-leaves.jpg'],
        
        resultFirst(iframeDoc, nonPandaImgs) {
            const linksChanged = nonPandaImgs.map((img, i) =>  new RegExp(`${this.properLinks[i]}$`).test(img.src));
            return linksChanged.every(el => el);
        },
        resultSecond(iframeDoc, nonPandaImgs) {
            const altCheck = nonPandaImgs.map((img, i) => !new RegExp(`${this.properLinks[i]}$`).test(img.alt));
            const figcaptionCheck = nonPandaImgs.map(img => img.nextSiblingElement === undefined);
            return altCheck.every(el => el) && figcaptionCheck.every(el => el);
        },
        resultThird(iframeDoc){
            const selectedFigcaptions = [...iframeDoc.querySelectorAll('figcaption')].filter(sign => sign.dataset.text);
            return selectedFigcaptions.map(sign => sign.textContent === sign.dataset.text).every(el => el);
        },
        correctImgLinks(iframeDoc) {
            [...iframeDoc.images].forEach(img => {
                const fileName = img.src.match(/[a-z1-9\-]+\.jpg$/)[0];
                const linkCorr = /img\/crashedCarousel\/[a-z1-9\-]+\.jpg$/.test(img.src);
                if (linkCorr) return;
                img.src = img.src.replace(fileName, `img/crashedCarousel/${fileName}`);
            });
        },
        checkPoints(usersCode) {
            const iframeDoc = document.querySelector('iframe').contentDocument;
            
            this.correctImgLinks(iframeDoc);
            const nonPandaImgs = [...iframeDoc.images].filter(img => img.dataset.animal !== 'panda');

            return [
                this.resultFirst(iframeDoc, nonPandaImgs),
                this.resultSecond(iframeDoc, nonPandaImgs),
                this.resultThird(iframeDoc)
            ];
        }
    }
};