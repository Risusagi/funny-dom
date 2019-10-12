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

                <div class="chat-panel">
                    <div class="message">
                        <p>Hello. Nice to meet you &#x1F60A</p>
                    </div>
                    

                    <div class="message dot-message">
                        <span class="dot"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                    </div>

                    ${this.generateMessage()}

                    <div class="message last">
                        <p>I want to offer you to go to a startling journey that will help you to test and improve your knowledge of how to interact with the Document Object Model.</p>
                    </div>
                </div>
            </div>
        `;
        
        this.chatPanel = document.querySelector('.chat-panel');
        this.dotMsg = this.chatPanel.querySelector('.dot-message');

        const messages = this.chatPanel.querySelectorAll('.message:not(.dot-message):not(:first-child)');

        setTimeout(() => this.displayDotMessage(), 2000);

        for(let i = 0; i < messages.length; i++)  this.renderIntroduction(i, messages);    
    }

    renderIntroduction(index, messages) {
        const msgPeriods = [...messages].map(msg => this.countTime(msg));
        const msgStarts = [];

        for (let i = 0; i < msgPeriods.length; i++) {
            msgStarts.push(msgPeriods.slice(0, i).reduce((cur, total) => total + cur, 0));
        }

        setTimeout(() => {
            if(index === messages.length - 1) {
                this.displayDotMessage();
            }

            this.renderMsg();
        }, msgStarts[index] + 5500);
    }

    displayDotMessage() {
        this.dotMsg.style.display = getComputedStyle(this.dotMsg).display === 'none' ? 'block' : 'none';
    }
    renderMsg() {
        const msg = this.dotMsg.nextElementSibling;
        msg.style.display = 'block';
        this.chatPanel.insertBefore(msg, this.dotMsg);
    }
    countTime(msg) {
        return Math.round(msg.children[0].textContent.length / 8) * 1000;
    }

    generateMessage() {
        // const usersTime = new Date().getHours();
        const usersTime = 12;

        switch (true) {
            case usersTime >= 5 && usersTime <= 9:
                return `
                    <div class="message alt-message">
                        <p>Morning is a great time to learn something new. So I won't waste your precious time and just come to the point.</p>
                    </div>
                `;
            case usersTime >= 10 && usersTime <= 15:
                return `
                    <div class="message alt-message">
                        <p>What is the weather like today?</p>
                    </div>
                    <div class="message alt-message">
                        <p>Hope it is pretty well.</p>
                    </div>
                    <div class="message alt-message">
                        <p>But if it is not I have a solution that will make you forget about bad weather</p>
                    </div>
                `;
            case usersTime >= 16 && usersTime <= 23:
                return `
                    <div class="message alt-message">
                        <p>You are probably tired after a long day, so I won't bore you with long talks and just come to the point.</p>
                    </div>
                `;
            case usersTime >= 0 && usersTime <= 4:
                return `It's pretty late now. Hope you are not too tired to learn new things.`;
            };
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
        this.startChat();
    }
}