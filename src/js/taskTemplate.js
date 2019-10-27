import '../style/taskTemplate.scss';
import CodeMirror from './codemirror/lib/codemirror.js';
import './codemirror/mode/javascript/javascript.js';
import './codemirror/addon/scroll/simplescrollbars.js';
import '../goodMorning.html';
import {challenges} from './challenges.js';


// window.addEventListener('error', function (event) {
//     console.log(event.message);
//     app.playAnimation();
//     event.preventDefault();
// })

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
                `const iframeDoc = document.querySelector('iframe').contentDocument;
                ${codeFromUser.replace(/document/g, 'iframeDoc')}`
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
    handleHintClick(e, hints) {
        const index = e.target.dataset.index;
        this.renderHints(hints[index]);
    },
    hideHints() {
        document.querySelector('.hints-for-user').style.display = 'none';
    },
    checkSolution(challengeName) {
        const checkPoints = challenges[challengeName].checkPoints();
        const challengeFinished = checkPoints.every(point => point);

        this.markFinishedTasks(checkPoints);
        if (challengeFinished) {
            this.giveAccessToNextTask();
            this.saveUsersProgress(challengeName);
            this.render(localStorage.getItem('startPoint'));
        }
        
    },
    markFinishedTasks(checkPoints) {
        const tasks = document.querySelectorAll('.list-of-tasks>li');
        tasks.forEach((task, i) => {
            if (checkPoints[i])  task.style.opacity = '.4';
        });
    },
    giveAccessToNextTask() {
        document.querySelector('.next-task-btn').removeAttribute('disabled');
    },
    saveUsersProgress(taskTitle) {
        const challengesNames = Object.keys(challenges);
        const lastFinishedIndex = challengesNames.indexOf(taskTitle);
        const firstNotFinishedTask = challengesNames[lastFinishedIndex + 1];
        localStorage.setItem('startPoint', firstNotFinishedTask);
    },
    render() {
        this.task = localStorage.getItem('startPoint');
        const {link, title, tasks, hints} = challenges[this.task];

        document.querySelector('iframe').src = link;
        document.querySelector('.task-title').textContent = title;
        document.querySelector('.list-of-tasks').innerHTML = tasks;
        document.querySelector('.run-code-btn').addEventListener('click', () => {
            this.applyCode();
            this.checkSolution(this.task);
        });
        this.editorArea.addEventListener('animationend', (e) => this.removeAnimation(e));
        document.querySelectorAll('img.hint').forEach(hint => {
            hint.addEventListener('click', (e) => this.handleHintClick(e, hints));
        });
        document.querySelector('button.close').addEventListener('click', () => this.hideHints());
    }
};

localStorage.setItem('startPoint', 'goodMorning');
app.render();

// TO DO: 
// hints about why a solution wasn't accepted
// problem with double removing of elements