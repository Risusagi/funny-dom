const idCard = {
    link: './idCard.html',
    title: 'ID Card',
    description: `
            <p>Can you help me to finish this creator of workers' identifiers, please? According to the idea it should complete an ID card according to data from the form above.</p>
        `,
    tasks: `
            <li>
                Append an event handler to a <span class="tag-name">form</span> element that would prevent it from its default behavior on submit event.
            </li>
            <li>
                Inside that function add logic that would concatinate values of <span class="tag-name">inputs</span> with <span class="attribute-name">firstName</span> and <span class="attribute-name">surname</span> ids to one string and replace text inside element which has a <span class="class-name">worker-name</span> class with that string being capitalized.
            </li>
            <li>
                Don't forget about adding space between two parts of the string.
            </li>
        `,
    hints: [
        []
    ],
    // check if user added event default behavior prevention
    checkFirst(iframeDoc, confirmBtn) {
        const form = iframeDoc.querySelector('form');
        let myEvent;

        form.addEventListener('submit', (e) => {
            myEvent = e;
        });

        confirmBtn.click();

        return myEvent.defaultPrevented;
    },
    // simulate form submition
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

        const secondDone = this.checkSecond(iframeDoc, confirmBtn);

        // as the 3rd tasks isn't actually a task mark it as done if second tasks is done
        return [
            this.checkFirst(iframeDoc, confirmBtn),
            secondDone,
            secondDone
        ];
    }
};

export default idCard;