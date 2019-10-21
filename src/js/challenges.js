export const challenges = {
    goodMorning: {
        link:'./goodMorning.html',
        title: 'Good Morning',
        tasks: `
            <li>
                Select elements that have one of the next classes:
                <ul>
                    <li><span class="class-name">sun</span>,</li>
                    <li><span class="class-name">grass</span>.</li>
                </ul>
                Add to their classes lists a class <span class="class-name">morning</span>.
                <img src="../img/hint.png" class="hint" data-index="0">
            </li>
            <li>
                Select element that has a <span class="class-name">moon</span> class amoung it's classes and delete this element (there are at least 2 ways you can do it).
                <img src="../img/hint.png" class="hint" data-index="1">
            </li>
            <li>
                Change <span class="css-property">display</span> property of the element with a <span class="class-name">sun</span> class to block.
                <img src="../img/hint.png" class="hint" data-index="2">
            </li>
            <li>
                Select all elements that have a class <span class="class-name">window</span>. Replace their class <span class="class-name">asleep</span> with a new one: <span class="class-name">awake</span>.
                <img src="../img/hint.png" class="hint" data-index="3">
            </li>
        `,
        hints: [
            [`https://developer.mozilla.org/en-US/docs/Web/API/Element/classList (an add method)`],

            [`https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove`,
            
            `https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild`,
            `https://developer.mozilla.org/en-US/docs/Web/API/Node/parentElement`],

            [`https://www.w3schools.com/jsref/prop_style_display.asp`],

            [`https://developer.mozilla.org/en-US/docs/Web/API/Element/classList (a remove and add methods)`]
        ]
    }
};