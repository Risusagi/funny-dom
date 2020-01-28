const chessboard = {
    link: './chessboard.html',
    title: 'Chessboard',
    description: `
            <p>Could you help me to revamp this chessboard, please? It's pretty easy, just color it inside like it is shown in the example.</p>
        `,
    tasks: `
            <li>
                Select all elements that has a class <span class="class-name">row</span>.
            </li>
            <li>
                Each row has <span class="attribute-name">data-num</span> attribute equal to odd or even number. Inside each odd row (according to its <span class="attribute-name">data-num</span> attribute value) set background color of its children to black if their index is even. Do the same for odd cells inside even rows.
                <img src="img/hint.png" class="hint" data-index="0" title="Show some hints">
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
};
 export default chessboard;