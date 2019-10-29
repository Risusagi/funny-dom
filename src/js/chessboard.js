import '../style/chessboard.scss';

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

(function() {
    const doc = window.frameElement.parentElement;

    const hint = document.createElement('p');
    hint.className = 'text-hint';
    hint.textContent = 'Remember that indexes start from 0 not from 1.';
    
    doc.parentElement.querySelector('.hints-for-user').appendChild(hint);
})();