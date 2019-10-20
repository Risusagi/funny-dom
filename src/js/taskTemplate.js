import '../style/taskTemplate.scss';
import CodeMirror from './codemirror/lib/codemirror.js';
import './codemirror/mode/javascript/javascript.js';
import './codemirror/addon/scroll/simplescrollbars.js';


window.addEventListener('error', function (event) {
    // console.log(event);
    app.playAnimation();
    event.preventDefault();
})

const myCodeMirror = CodeMirror.fromTextArea(document.querySelector('.editor'),
    {
        mode: "javascript",
        theme: "cobalt",
        lineNumbers: true,
        lineWrapping: true,
        scrollbarStyle: "overlay"
    }
);

const app = {
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
            const functionFromUser = new Function(codeFromUser);
            functionFromUser();
        }
    },
    render(taskLink, taskTitle, tasksList) {
        document.querySelector('iframe').src = taskLink;
        document.querySelector('.task-title').textContent = taskTitle;
        document.querySelector('.task-list').textContent = tasksList;
        document.querySelector('.run-code-btn').addEventListener('click', () => this.applyCode());
        this.editorArea.addEventListener('animationend', (e) => this.removeAnimation(e));
    }
};

app.render();

// TO DO: 
// hints about why a solution wasn't accepted