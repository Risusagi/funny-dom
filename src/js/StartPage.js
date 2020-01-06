export default class StartPage {
    constructor(rootEl) {
        this.rootEl = rootEl;
        this.chatBody = document.querySelector('.chat-body');
        this.dotMsg = this.chatBody.querySelector('.dot-message');
        this.handleSend = (e) => this.handleMsgSend(e);
    }

    // renders messages with dot message between them
    renderIntroduction(index, messages) {
        const msgPeriods = [...messages].map(msg => this.countTime(msg));
        const msgStarts = [];

        for (let i = 0; i < msgPeriods.length; i++) {
            msgStarts.push(msgPeriods.slice(0, i).reduce((cur, total) => total + cur, 0));
        }

        setTimeout(() => {
            if(index === messages.length - 1) {
                this.displayDotMessage();
                this.requireAnswer();
            }

            this.renderMsg();
            this.scrollDown(this.chatBody);
            
        }, msgStarts[index] + 5500);
    }

    displayDotMessage() {
        this.dotMsg.style.display = getComputedStyle(this.dotMsg).display === 'none' ? 'block' : 'none';
    }

    // renders next message
    renderMsg() {
        const msg = this.dotMsg.nextElementSibling;
        msg.style.display = 'block';
        this.chatBody.insertBefore(msg, this.dotMsg);
    }

    // counts time of pause between messages
    countTime(msg) {
        return Math.round(msg.children[0].textContent.length / 8) * 1000;
    }

    // generates messages depending on what time is it now
    generateMessages() {
        const usersTime = new Date().getHours();
        const altMsgs = document.querySelector('.alt-messages').innerHTML;

        switch (true) {
            case usersTime >= 5 && usersTime <= 9:
                altMsgs = `
                    <div class="message">
                        <p>Morning is a great time to learn something new. So I won&apos;t waste your precious time and just come to the point.</p>
                    </div>
                `;
            case usersTime >= 10 && usersTime <= 15:
                altMsgs = `
                    <div class="message">
                        <p>What is the weather like today?</p>
                    </div>
                    <div class="message">
                        <p>Hope it is pretty well.</p>
                    </div>
                    <div class="message">
                        <p>But if it is not, I have a proposal that will make you forget about bad weather.</p>
                    </div>
                `;
            case usersTime >= 16 && usersTime <= 23:
                altMsgs = `
                    <div class="message">
                        <p>You are probably tired after a long day, so I won't bore you with long talks and just come to the point.</p>
                    </div>
                `;
            case usersTime >= 0 && usersTime <= 4:
                altMsgs = `
                    <div class="message">
                        <p>It's pretty late now. Hope you are not too tired to learn new things.</p>
                    </div>
                `;
        };
    }

    // scrolls chat to its lowest point
    scrollDown(element) {
        element.scrollTop = element.scrollHeight;
    }

    // aplies blinking animation on message input and renders answers
    requireAnswer() {
        const msgInput = document.querySelector('.msg-input');
        msgInput.classList.add('require-interaction');

        msgInput.addEventListener('click', () => this.renderAnswers());
    }

    // renders answers and manages height of body and input of the chat
    renderAnswers() {
        const chatInput = document.querySelector('.chat-input');
        const answersDiv = document.querySelector('.answers');
        const prevHeight = parseInt(getComputedStyle(chatInput).height);

        // initial height of chat input is 80px so function will not increase its height if it was incresed before
        if(prevHeight === 80) {
            answersDiv.style.display = "block";

            const add = parseFloat(getComputedStyle(answersDiv).height);
            const newHeight = Math.ceil(prevHeight + add) + 'px';

            chatInput.style.setProperty('height', newHeight);

            this.chatBody.style.height = `calc(100vh - ${newHeight}`;
        }
    }

    // gives efect of typing answer
    typeMessage(e) {
        let i = 0;
        const speed = 50;
        const text = e.currentTarget.children[0].textContent;

        const msgInput = document.querySelector('.msg-input');
        msgInput.classList.remove('require-interaction');

        const msgInputText = msgInput.querySelector('span');
        msgInputText.textContent = '';
        msgInputText.style.color = 'rgba(255, 255, 255, 0.616)';

        this.answer = e.currentTarget;
        this.usersAgreement = [...this.answer.classList].includes('positive');
        

        const typeWriter = () => {
            if (i < text.length) {
                
                // prevents two messages being typed at the same time
                const reg = new RegExp(text.slice(0, i).replace(/[\.+*?(){}|^$]/g, "\\$&"));
                const permission = reg.test(msgInputText.textContent);

                if(permission) {
                    msgInputText.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, speed);
                }
                // scrolldown answer when it is typed
                this.scrollDown(msgInput);
            }
        };

        typeWriter();
    }

    // renders new page if answer is positive and renders regret message if it is not
    handleMsgSend(e) {
        // do nothing if user didn't choose any answer
        if (!this.answer) return;

        if (this.usersAgreement) {
            e.currentTarget.href = 'taskTemplate.html';
            localStorage.setItem('currentChallenge', 'chessboard');
            localStorage.setItem('undoneChallenge', 'chessboard');
        } else {
            document.querySelector('.answers').style.display = 'none';
            document.querySelector('.chat-input').style.height = '80px';
            this.chatBody.style.height = 'calc(100vh - 80px)';

            const regretMsg = document.createElement('div');
            regretMsg.className = 'message';
            regretMsg.innerHTML = `<p>Oh, in this case I'll not waste your time any more. Have a nice day &#x1F600</p>`;
            regretMsg.style.display = 'block';

            const sendBtn = e.currentTarget;
            sendBtn.removeEventListener('click', this.handleSend);

            setTimeout(() => this.displayDotMessage(), 800);
            setTimeout(() => {
                this.displayDotMessage();
                this.chatBody.appendChild(regretMsg);
            }, 800 + this.countTime(regretMsg));
        }
    }

    startChat() {
        const messages = this.chatBody.querySelectorAll('.message:not(.dot-message):not(:first-child)');

        setTimeout(() => this.displayDotMessage(), 2000);

        for (let i = 0; i < messages.length; i++) this.renderIntroduction(i, messages);

        document.querySelector('.chat-input a').addEventListener('click', this.handleSend);
        document.querySelectorAll('.answer').forEach(ans => ans.addEventListener('click', (e) => this.typeMessage(e)));

        document.querySelector('.skip-btn').addEventListener('click', (e) => {
            this.answer = this.usersAgreement = true;
            this.handleMsgSend(e);
        })
    }
}