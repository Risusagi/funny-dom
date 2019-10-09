export default class StartPage {
    constructor(rootEl) {
        this.rootEl = rootEl;
    }

    startChat() {
        console.log(new Date().getHours());
        this.rootEl.innerHTML = `
            <div class="chat">
                <div class="chat-header">
                    <p>Funny DOM</p>
                    <span class="status">online</span>
                </div>
                <div class="message">
                    <p>Hello. Nice to meet you &#x1F60A</p>
                </div>
                <br>
            </div>
        `;
        document.querySelector('.chat').innerHTML += `
            <div class="message">
                <p>You are probably tired after a long day, so I won't bore you with long talks and just come to the point.</p>
            </div>
        `;


        document.querySelector('.chat').innerHTML += `
            <div class="message">
                <p>Morning is a great time to learn something new. So I won't waste your precious time and just come to the point.</p>
            </div>
        `;
        document.querySelector('.chat').innerHTML += `
            <div class="message">
                <p>Morning is a great time to learn something new. So I won't waste your precious time and just come to the point.</p>
            </div>
        `;
        document.querySelector('.chat').innerHTML += `
            <div class="message">
                <p>What is the weather like today?</p>
                <p>Hope it is pretty well.</p>
                <p>But if it is not I have a solution that will make you forget about bad weather</p>
            </div>
        `;

        
        document.querySelector('.chat').innerHTML += `
            <div class="message">
                <p>I want to offer you to go to a startling journey that will help you to test and improve your knowledge of how to interact with the Document Object Model.</p>
            </div>
        `;
        
    }
    render() {
        this.rootEl.innerHTML = `
            <div class="modal">
                <div class="modal-content">
                    <p>You have <span class="messages-amount">1</span> new message</p>
                    <button class="open-msg-btn">Open</button>
                </div>
            </div>
        `;

        document.querySelector('.open-msg-btn').addEventListener('click', () => this.startChat());
        this.startChat();
    }
}