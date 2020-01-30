import {challenges} from './challenges';

export default class StartPage {
    constructor() {
        this.rootEl = document.querySelector('#root');
        this.chatBody = document.querySelector('.chat-body');
        this.chatInput = document.querySelector('.chat-input');
        this.dotMsg = this.chatBody.querySelector('.dot-message');
        this.msgInput = document.querySelector('.msg-input');
        this.skipBtn = document.querySelector('.skip-btn');

        this.initialSkipTop = parseInt(getComputedStyle(this.skipBtn).top);
        this.CIinitialHeight = getComputedStyle(this.chatInput).height;

        this.handleSend = (e) => this.handleMsgSend(e);
        this.renderAns = () => this.renderAnswers();
    }

    // generates messages depending on what time is it now
    renderAltMessages() {
        const texts = this.createAltMsgsText();
        const fragment = document.createDocumentFragment();

        for (const text of texts) {
            const message = this.createAltMessage(text);
            fragment.appendChild(message);
        }

        // append messages right after dot message
        this.chatBody.insertBefore(fragment, this.dotMsg.nextElementSibling);
    }

    // create messages depend on user's current time
    createAltMsgsText() {
        const usersTime = new Date().getHours();

        switch (true) {
            case usersTime >= 5 && usersTime <= 9:
                return [
                    `<p>Morning is a great time to learn something new. So I won&apos;t waste your precious time and just come to the point.</p>`
                ];
            case usersTime >= 10 && usersTime <= 15:
                return [
                    `<p>What is the weather like today?</p>`,
                    `<p>Hope it is pretty well.</p>`,
                    `<p>But if it is not, I have a proposal that will make you forget about bad weather.</p>`
                ];
            case usersTime >= 16 && usersTime <= 23:
                return [
                    `<p>You are probably tired after a long day, so I won't bore you with long talks and just come to the point.</p>`
                ];
            case usersTime >= 0 && usersTime <= 4:
                return [
                    `<p>It's pretty late now. Hope you are not too tired to learn new things.</p>`
                ];
        };
    }
    createAltMessage(innerCode) {
        const msgElement = document.createElement('div');
        msgElement.classList.add('fd-msg', 'message');
        msgElement.innerHTML = innerCode;
        return msgElement;
    }    

    // create array of moments when messages should appear on screen
    // start from 0 and add next period creating next start
    createMsgsStarts(messages) {
        const msgPeriods = [...messages].map(msg => this.countTime(msg));
        this.msgStarts = [];
        
        for (let i = 0; i < msgPeriods.length; i++) {
            this.msgStarts.push(msgPeriods.slice(0, i).reduce((cur, total) => total + cur, 0));
        }
    }

    // count time of pause between displaying two messages
    countTime(msg) {
        return Math.round(msg.children[0].textContent.length / 8) * 1000;
    }

    // render messages with dot message between them
    renderIntroduction(index, messages) {
        setTimeout(() => {
            if(index === messages.length - 1) {
                // hide dot message after displaying last message
                this.hideDotMessage();
                this.requireAnswer();
            }
            
            this.renderMsg();
            this.scrollDown(this.chatBody);
            
        }, this.msgStarts[index] + 5500);
    }


    displayDotMessage() {
        this.dotMsg.style.display = 'block';
    }

    hideDotMessage() {
        this.dotMsg.style.display = 'none';
    }

    // render message after dot message and after it switch their places
    renderMsg() {
        const msg = this.dotMsg.nextElementSibling;
        msg.style.display = 'block';

        
        this.chatBody.insertBefore(msg, this.dotMsg);
    }

    // scroll given element to its lowest point
    scrollDown(element) {
        element.scrollTop = element.scrollHeight;
    }

    // aplies blinking animation on message input and applies rendering of answers
    requireAnswer() {
        this.msgInput.classList.add('require-interaction');
        
        this.msgInput.addEventListener('click', this.renderAns);
    }

    // renders answers and manages height of body and input of the chat
    renderAnswers() { 
        const prevHeight = parseInt(getComputedStyle(this.chatInput).height);

        // if current height of chat input is the same as initial change it
        if (prevHeight === parseInt(this.CIinitialHeight)) {
            const answersDiv = document.querySelector('.answers');
            answersDiv.style.display = "block";

            // how much space takes div with answers
            const additionalHeight = parseFloat(getComputedStyle(answersDiv).height);
            const newHeight = Math.ceil(prevHeight + additionalHeight) + 'px';

            this.chatInput.style.height = newHeight;

            this.chatBody.style.height = `calc(100vh - ${newHeight}`;

            // scroll chat body because answers will hide last messages
            this.scrollDown(this.chatBody);

            // change skip button's position to higher to not hide answers area
            this.skipBtn.style.top = `${this.initialSkipTop - additionalHeight}px`;
        }
    }

    // gives an effect of typing an answer
    typeMessage(e) {
        let i = 0;
        const speed = 50;
        const text = e.currentTarget.children[0].textContent;
        
        this.msgInput.classList.remove('require-interaction');

        const msgInputText = this.msgInput.querySelector('span');
        msgInputText.textContent = '';
        msgInputText.style.color = 'rgba(255, 255, 255, 0.616)';

        this.answer = e.currentTarget;
        this.usersAgreement = this.answer.classList.contains('positive');
        

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
                this.scrollDown(this.msgInput);
            }
        };

        typeWriter();
    }

    // renders new page if answer is positive and renders regret message if it is not
    async handleMsgSend(e) {
        // do nothing if user didn't choose any answer
        if (!this.answer) return;
        
        this.handleAppearanceChanges();
        this.preventNextSends(e);

        const answerVer = this.answer.dataset.answer;
        this.renderUsersAnswer(answerVer);

        await this.renderLastMessage();

        if (this.usersAgreement) this.switchPage();
    }

    handleAppearanceChanges() {
        // return msg input to initial state
        this.msgInput.removeEventListener('click', this.renderAns);
        const textEl = this.msgInput.querySelector('span');
        textEl.textContent = 'Type a message...';
        textEl.style.color = 'rgba(255, 255, 255, 0.3)';

        // hide answers div
        document.querySelector('.answers').style.display = 'none';
        this.chatInput.style.height = this.CIinitialHeight;
        this.chatBody.style.height = `calc(100vh - ${this.CIinitialHeight})`;

        // return skip button to lower position
        this.skipBtn.style.top = `${this.initialSkipTop}px`;
    }

    // prevent user from sending answer one more time
    preventNextSends(e) {
        const sendBtn = e.currentTarget;
        sendBtn.removeEventListener('click', this.handleSend);
    }

    renderUsersAnswer(answerVer) {
        // select containers that contain possible user's answers
        const usersMsgs = [...document.querySelectorAll('.container')];
        const properMsg = usersMsgs.find(msg => msg.dataset.answer === answerVer);
        properMsg.children[0].style.display = 'block';
        // to display dot message under users message
        this.chatBody.insertBefore(properMsg, this.dotMsg);
    }

    async renderLastMessage() {
        const msg = this.usersAgreement ? document.querySelector('.happy-msg') : document.querySelector('.regret-msg');
        const renderDot = new Promise((resolve, reject) => {
            setTimeout(() => resolve(true), 800);
        });

        const renderMsg = new Promise((resolve, reject) => {
            setTimeout(() => resolve(true), this.countTime(msg) + 150);
        });

        const giveTimeToRead = new Promise((resolve, reject) => {
            setTimeout(() => resolve(true), 4500);
        });

        await renderDot;
        this.displayDotMessage();
        this.scrollDown(this.chatBody);

        await renderMsg;
        this.hideDotMessage();
        msg.style.display = 'block';
        this.scrollDown(this.chatBody);

        await giveTimeToRead;
    }

    switchPage() {
        this.setLocalStorage();
        window.location.href = 'taskTemplate.html';
    }

    // set all needed values in local storage before switching to the next page (taskTemplate)
    setLocalStorage() {
        localStorage.setItem('currentChallenge', Object.keys(challenges)[0]);
        localStorage.setItem('undoneChallenge', Object.keys(challenges)[0]);
        localStorage.setItem('renderTutorial', 'yes');
    }

    startChat() {
        // render messages depend on current users's time and only !after it select all .message elements
        this.renderAltMessages();

        const messages = this.chatBody.querySelectorAll('.message:not(.first-msg)');

        // 2s after all messages were rendered start counting down
        setTimeout(() => this.displayDotMessage(), 2000);

        this.createMsgsStarts(messages);

        for (let i = 0; i < messages.length; i++) this.renderIntroduction(i, messages);

        // send icon
        this.chatInput.querySelector('.send-icon').addEventListener('click', this.handleSend);

        document.querySelectorAll('.answer').forEach(ans => ans.addEventListener('click', (e) => this.typeMessage(e)));

        document.querySelector('.skip-btn').addEventListener('click', () => this.setLocalStorage());
    }
}