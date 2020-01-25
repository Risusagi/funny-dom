import '../style/chessboard.scss';

// create example chessboard
(function () {
    const rows = document.querySelectorAll('.ex-row');
    rows.forEach((row, i) => {
        const cells = row.querySelectorAll('.ex-cell');
        const check = i % 2;
        cells.forEach((cell, index) => {
            if (index % 2 === check) cell.style.backgroundColor = 'black';
        })
    });
})();

// add hint out of list of useful links to MDN
(function() {
    const doc = window.frameElement.parentElement;

    const hint = document.createElement('p');
    hint.className = 'text-hint';
    hint.textContent = 'Remember that indexes start from 0 not from 1.';
    
    const childElements = doc.parentElement.querySelector('.hints-for-user').children;
    const additionalHint = childElements[childElements.length - 1];

    if(!additionalHint.classList.contains('text-hint')) {
        doc.parentElement.querySelector('.hints-for-user').appendChild(hint);
    }    
})();

// delete message about indexes to not show it inside hints list for other challenges
window.onunload = () => {
    window.frameElement.parentElement.querySelector('.hints-for-user').lastChild.remove();
}