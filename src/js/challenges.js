export const challenges = {
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
                Select element that has a <span class="class-name">moon</span> class amoung it's classes and delete this element (there are at least 2 ways you can do it).
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
        ]
    }
};