import '../style/taskTemplate.scss';
import CodeMirror from './codemirror/lib/codemirror.js';
import './codemirror/mode/javascript/javascript.js';
import './codemirror/addon/scroll/simplescrollbars.js';
import '../goodMorning.html';
import {challenges} from './challenges.js';


window.addEventListener('error', function (event) {
    // console.log(event);
    app.playAnimation();
    event.preventDefault();
})

export const myCodeMirror = CodeMirror.fromTextArea(document.querySelector('.editor'),
    {
        mode: "javascript",
        theme: "cobalt",
        lineNumbers: true,
        lineWrapping: true,
        scrollbarStyle: "overlay"
    }
);

export const app = {
    editorArea: document.querySelector('.CodeMirror'),
    contentHandler: document.querySelector('.editor'),

    playAnimation() {
        this.editorArea.style.setProperty('animation-name', 'boomer');
    },
    removeAnimation(e) {
       e.currentTarget.removeAttribute('style')
    },
    applyCode() {
        // copy the content of the editor into the textarea
        myCodeMirror.save();

        const codeFromUser = this.contentHandler.value;

        if (!codeFromUser) {
            this.playAnimation();
        } else {
            const functionFromUser = new Function(
                `const iframe = document.querySelector('iframe');
                ${codeFromUser.replace('document', 'iframe.contentDocument')}`
            );
            functionFromUser();
        }
    },
    renderHints(hints) {
        const scrollValue = document.querySelector(':root').scrollTop;
        document.querySelector('.hints-for-user').style.top = `calc(${scrollValue}px + 10vh)`
        const list = document.querySelector('.links-list');
        list.innerHTML = '';
        hints.map(hint => {
            const li = document.createElement('li');
            li.innerHTML = `
                <a href="${hint.link}" target="_blank" rel="noopener norefferer">${hint.text}</a>
            `;
            list.appendChild(li);
        });
        document.querySelector('.hints-for-user').style.display = 'block';
    },
    handleHintClick(e) {
        const index = e.target.dataset.index;
        this.renderHints(hints[index]);
    },
    hideHints() {
        document.querySelector('.hints-for-user').style.display = 'none'
    },
    render(taskLink, taskTitle, tasksList) {
        document.querySelector('iframe').src = taskLink;
        document.querySelector('.task-title').textContent = taskTitle;
        document.querySelector('.task-list').innerHTML = tasksList;
        document.querySelector('.run-code-btn').addEventListener('click', () => this.applyCode());
        this.editorArea.addEventListener('animationend', (e) => this.removeAnimation(e));
        document.querySelectorAll('img.hint').forEach(hint => {
            hint.addEventListener('click', (e) => {
                this.handleHintClick(e);
            })
        });
        document.querySelector('button.close').addEventListener('click', () => this.hideHints());
    }
};

const {link, title, tasks, hints} = challenges.goodMorning;
app.render(link, title, tasks);

// TO DO: 
// hints about why a solution wasn't accepted