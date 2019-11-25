export default class StartPage {
    constructor(rootEl) {
        this.rootEl = rootEl;
    }

    startChat() {
        this.rootEl.innerHTML = `
            <div class="chat">
                <div class="chat-header">
                    <p>Funny DOM</p>
                    <span class="status">online</span> 
                </div>

                <div class="chat-body">
                
                    <div class="message">
                        <p>Hello. Nice to meet you &#x1F60A</p>
                    </div>
                    

                    <div class="message dot-message">
                        <span class="dot"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                    </div>

                    ${this.generateMessages()}

                    <div class="message">
                        <p>I&#39;ve heard you have been learning the Document Object Model for some time and now want to use this knowledge in practice.</p>
                    </div>

                    <div class="message">
                        <p>I&#39;m going to an interesting but not an easy trip. So I just thought we can help each other.</p>
                    </div>

                    <div class="message">
                        <p>You will get some experience and I will have an assistant.</p>
                    </div>

                    <div class="message">
                        <p>What do you think about it?</p>
                    </div>

                </div>

                <div class="chat-input">

                    <div class="answers">

                        <div class="answer positive">
                            <p>Gladly &#x1F60A When we go?</p>
                        </div>

                        <div class="answer negative">
                            <p>Sorry&#130; not this time</p>
                        </div>

                        <div class="answer positive">
                            <p>Sounds interesting. I&#39;ll give you a chance &#x1F603</p>
                        </div>

                    </div>

                    <div class="input-panel">

                        <div class="msg-input">
                            <span>Type a message...</span>
                        </div>

                        <a>
                            <svg class="send-icon" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="sendIconTitle">
                                <title id="sendIconTitle">Send</title>
                                <polygon points="21.368 12.001 3 21.609 3 14 11 12 3 9.794 3 2.394"></polygon>
                            </svg>
                        </a>

                    </div>

                </div>

            </div>
        `;
        
        this.chatBody = document.querySelector('.chat-body');
        this.dotMsg = this.chatBody.querySelector('.dot-message');

        const messages = this.chatBody.querySelectorAll('.message:not(.dot-message):not(:first-child)');

        setTimeout(() => this.displayDotMessage(), 2000);

        for(let i = 0; i < messages.length; i++)  this.renderIntroduction(i, messages);  
        
        this.handleSend = (e) => this.handleMsgSend(e);
        
        document.querySelector('.chat-input a').addEventListener('click', this.handleSend);
        document.querySelectorAll('.answer').forEach(ans => ans.addEventListener('click', (e) => this.typeMessage(e)));
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

        switch (true) {
            case usersTime >= 5 && usersTime <= 9:
                return `
                    <div class="message alt-message">
                        <p>Morning is a great time to learn something new. So I won't waste your precious time and just come to the point.</p>
                    </div>
                `;
            case usersTime >= 10 && usersTime <= 15:
                return `
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
                return `
                    <div class="message">
                        <p>You are probably tired after a long day&#130; so I won't bore you with long talks and just come to the point.</p>
                    </div>
                `;
            case usersTime >= 0 && usersTime <= 4:
                return `
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
        } else {
            document.querySelector('.answers').style.display = 'none';
            document.querySelector('.chat-input').style.height = '80px';
            this.chatBody.style.height = 'calc(100vh - 80px)';


            const regretMsg = document.createElement('div');
            regretMsg.className = 'message';
            regretMsg.innerHTML = `<p>Oh&#130; in this case I&#39;ll not waste your time any more. Have a nice day &#x1F600</p>`;
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

    render() {
        this.rootEl.innerHTML = `
            <div class="desktop">
                <img class="folder" src="../img/folder.png">
                <img class="folder" src="../img/folder.png">
                <img class="folder" src="../img/folder.png">
                <img class="folder" src="../img/folder.png">

                <div class="modal">
                    <div class="modal-content">
                        <p>You have <span class="messages-amount">1</span> new message</p>
                        <button class="open-msg-btn">Open</button>
                    </div>
                </div>
            </div>
        `;

        document.querySelector('.open-msg-btn').addEventListener('click', () => this.startChat());
    }
}