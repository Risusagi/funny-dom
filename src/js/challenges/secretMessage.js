const secretMessage = {
    link: './secretMessage.html',
    title: 'Secret Message',
    description: `
            <p>Do you like movies about James Bond? If so this task would be a piece of cake for you. You just need to decrypt this quote.</p>
        `,
    tasks: `
            <li>
                Select all images located inside <span class="tag-name">blockquote</span> element and replace them with the text held in their <span class="attribute-name">alt</span> attributes. (There is only one blockquote and images are not its direct children.)
                <img src="img/hint.png" class="hint" data-index="0" title="Show some hints">
            </li>
            <li>
                Delete all images that weren't replaced with a text.
                <img src="img/hint.png" class="hint" data-index="1" title="Show some hints">
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
    
    // check if the text inside the quote is right
    checkFirst(iframeDoc) {
        const quote = iframeDoc.querySelector('blockquote p');
        return /Java is to JavaScript what car is to carpet/i.test(quote.textContent.toLowerCase())
    },
    // check if all images were deleted
    checkSecond(iframeDoc) {
        return iframeDoc.images.length === 0;
    },
    checkPoints(usersCode) {
        const iframeDoc = document.querySelector('iframe').contentDocument;
        return [
            this.checkFirst(iframeDoc),
            this.checkSecond(iframeDoc)
        ];
    }
};

export default secretMessage;