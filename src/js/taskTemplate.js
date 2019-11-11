import CodeMirror from './codemirror/lib/codemirror.js';
import './codemirror/mode/javascript/javascript.js';
import './codemirror/addon/scroll/simplescrollbars.js';

import '../style/taskTemplate.scss';
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
    iframe: document.querySelector('iframe'),

    playAnimation() {
        this.editorArea.style.setProperty('animation-name', 'boomer');
    },
    removeAnimation(e) {
       e.currentTarget.removeAttribute('style');
    },
    applyCode() {
        // copy the content of the editor into the textarea
        myCodeMirror.save();

        const codeFromUser = this.contentHandler.value;

        if (!codeFromUser) {
            this.playAnimation();
        } else {
            this.functionFromUser = new Function(
                `const iframeDoc = this.iframe.contentDocument;
                const iframeWindow = this.iframe.contentWindow;
                ${codeFromUser.replace(/document/g, 'iframeDoc')}`
            );
            this.functionFromUser();
        }
    },
    renderHints(hints) {
        const scrollValue = document.querySelector(':root').scrollTop;
        document.querySelector('.hints-for-user').style.top = `calc(${scrollValue}px + 10vh)`;
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
        const checkPoints = challenges[challengeName].checkPoints(this.functionFromUser);
        const challengeFinished = checkPoints.every(point => point);

        this.markFinishedTasks(checkPoints);
        if (challengeFinished) {
            this.giveAccessToNextTask();
            this.saveUsersProgress(challengeName);
        }
        
    },
    // if task is done reduce its opacity but if part of the solution was deleted uncheck this task
    markFinishedTasks(checkPoints) {
        const tasks = document.querySelectorAll('.list-of-tasks>li');
        tasks.forEach((task, i) => {
            task.style.opacity = checkPoints[i] ? '.4' : '1';
        });
    },
    giveAccessToNextTask() {
        document.querySelector('.next-task-btn').removeAttribute('disabled');
    },
    saveUsersProgress(taskTitle) {
        const challengesNames = Object.keys(challenges);
        const lastFinishedIndex = challengesNames.indexOf(taskTitle);
        const firstNotFinishedTask = challengesNames[lastFinishedIndex + 1];
        localStorage.setItem('undoneChallenge', firstNotFinishedTask);
    },
    renderChallengesList() {
        const challengesList = document.querySelector('.challenges-list');
        challengesList.innerHTML = '';
        
        for (let challenge in challenges) {
            const li = document.createElement('li');
            li.textContent = challenges[challenge].title;
            challengesList.appendChild(li);
            // for the list item cretaed for this challenge
            this.separateChallenges(challenge, li);
        }
    },
    separateChallenges(challenge, li) {
        const challengesAbbr = Object.keys(challenges);
        const firstUndone = localStorage.getItem('undoneChallenge');
        const index = challengesAbbr.indexOf(firstUndone);
        const current = localStorage.getItem('currentChallenge');
        if (challenge === current) {
            li.classList.add('current');
        } else if (challengesAbbr.indexOf(challenge) <= index) {
            // all list items except current challenge li
            li.classList.add('available');
            li.addEventListener('click', () => {
                localStorage.setItem('currentChallenge', challenge);
                this.render();
            });
        }
    },
    render() {
        this.task = localStorage.getItem('currentChallenge');
        
        if (this.task) this.renderChallengesList();

        const {link, title, tasks, hints} = challenges[this.task];
        // disable button after it was made available
        document.querySelector('.next-task-btn').setAttribute('disabled', true);
        // clear code editor
        myCodeMirror.setValue('');

        this.iframe.src = link;
        document.querySelector('.task-title').textContent = title;
        document.querySelector('.list-of-tasks').innerHTML = tasks;

        document.querySelector('.run-code-btn').addEventListener('click', () => this.iframe.contentWindow.location.reload(true));

        this.iframe.addEventListener('load', () => {
            // don't apply code and check solution if iframe was loaded for the first time
            if (this.iframe.contentWindow.performance.getEntriesByType("navigation")[0].type === 'navigate') return;
            this.applyCode();
            this.checkSolution(this.task);
        });
        this.editorArea.addEventListener('animationend', (e) => this.removeAnimation(e));

        document.querySelectorAll('img.hint').forEach(hint => {
            hint.addEventListener('click', (e) => this.handleHintClick(e, hints));
        });
        document.querySelector('button.close').addEventListener('click', () => this.hideHints());
        document.querySelector('.next-task-btn').addEventListener('click', () => this.render(localStorage.getItem('undoneChallenge')));

        // for smooth animation
        document.querySelector('.challenges-navigation').style.transition = 'transform .5s ease-in';

        document.querySelector('h1').addEventListener('click', () => document.querySelector('.challenges-navigation').classList.add('visible'));
        document.querySelector('.close-nav').addEventListener('click', () => document.querySelector('.challenges-navigation').classList.remove('visible'));
    }
};

localStorage.setItem('undoneChallenge', 'newBlinds');
localStorage.setItem('currentChallenge', 'newBlinds');
app.render();