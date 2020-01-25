import CodeMirror from './codemirror/lib/codemirror.js';
import './codemirror/mode/javascript/javascript.js';
import './codemirror/addon/scroll/simplescrollbars.js';

import '../style/taskTemplate.scss';
import {challenges} from './challenges.js';

const alertError = (message) => {
    const errorPopUp = document.querySelector('.error-alert');
    errorPopUp.querySelector('p').textContent = message.replace(/iframeDoc/g, 'document');
    errorPopUp.style.display = 'block';
}

window.addEventListener('error', (event) => {
    app.playAnimation();
    event.preventDefault();
    alertError(event.message);
});

// current challenge is a task on whose page user is at that moment
// undone challenge is the first challenge from challenges that weren't done

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
    iframe: document.querySelector('iframe'),
    challengesNav: document.querySelector('.challenges-navigation'),
    
    // create list of challenges inside the side panel
    renderChallengesList() {
        const challengesList = document.querySelector('.challenges-list');
        // render list from scratch without doubling items
        challengesList.innerHTML = '';

        for (let challenge in challenges) {
            const li = document.createElement('li');
            li.textContent = challenges[challenge].title;
            challengesList.appendChild(li);
            // for the list item created for this challenge
            this.separateChallenges(challenge, li);
        }
    },

    // mark current challenge and the ones that were done previously
    separateChallenges(challenge, li) {
        const challengesAbbrs = Object.keys(challenges);
        const firstUndone = localStorage.getItem('undoneChallenge');
        const index = challengesAbbrs.indexOf(firstUndone);
        const current = localStorage.getItem('currentChallenge');


        if (challenge === current) {
            li.classList.add('current');
        } else if (challengesAbbrs.indexOf(challenge) <= index) {
            // tasks that are done plus one that is not done yet, except currently displayed task
            li.classList.add('available');
            // mark clicked available challenge as current and rerender page
            li.addEventListener('click', () => {
                localStorage.setItem('currentChallenge', challenge);
                this.render(localStorage.getItem('currentChallenge'));
            });
        }
    },
    
    applyCode() {
        // copy the content of the editor into the textarea
        myCodeMirror.save();

        const codeFromUser = this.contentHandler.value;

        if (!codeFromUser) {
            this.playAnimation();
        } else {
            // apply user's code to challenge's page not to the whole page
            this.functionFromUser = new Function(
                `const iframeDoc = this.iframe.contentDocument;
                ${codeFromUser.replace(/document/g, 'iframeDoc')}`
            );
            this.functionFromUser();
        }
    },

    playAnimation() {
        this.editorArea.style.setProperty('animation-name', 'boomer');
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

    // save user's progress in localStorage
    saveUsersProgress(taskTitle) {
        const challengesNames = Object.keys(challenges);
        const lastFinishedIndex = challengesNames.indexOf(taskTitle);
        const currentUndoneIndex = challengesNames.indexOf(localStorage.getItem('undoneChallenge'));

        // don't change undone challange if next button would be clicked in earlier task then current undone
        if (lastFinishedIndex >= currentUndoneIndex) {
            const firstNotFinishedTask = challengesNames[lastFinishedIndex + 1];
            if (firstNotFinishedTask) localStorage.setItem('undoneChallenge', firstNotFinishedTask);
        }

    },

    // remove animation from code editor when it is ended
    removeAnimation(e) {
        e.currentTarget.removeAttribute('style');
    },

    
    handleHintClick(e, hints) {
        const index = e.target.dataset.index;
        this.renderHints(hints[index]);
    },
    
    // render set of hints binded to clicked hint image
    renderHints(hints) {
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
    
    // hide div with hints
    hidePopUp(popUp) {
        popUp.style.display = 'none';
    },

    // go to tne next task
    handleNextClick() {
        const undone = localStorage.getItem('undoneChallenge');

        localStorage.setItem('currentChallenge', undone);

        this.render(undone);
    },
        
    displayChallengesNav() {
        this.challengesNav.classList.add('visible')
    },
    hideChallengesNav() {
        this.challengesNav.classList.remove('visible');
    },    

    // hide hints and challenges list on Esc click
    handleEscEvent(e) {
        if(e.keyCode !== 27) return;
        this.hidePopUp(document.querySelector('.error-alert'));
        this.hidePopUp(document.querySelector('.hints-for-user'));
        this.hideChallengesNav();
    },
    
    hideNavOnClick(e) {
        const navChildren = [...document.querySelectorAll('.challenges-navigation *')];
        const logo = document.querySelector('h1');
        if (e.target !== this.challengesNav && !navChildren.includes(e.target) && e.target !== logo) {
            // hide navigation if space outside of it was clicked
            this.hideChallengesNav();
        }
    },
    
    // add event listeners only when page rendered first time
    firstRender() {
        this.render(localStorage.getItem('currentChallenge'));
        
        // reload page inside iframe every time user aplies his/her code
        // because of this it will work like making changes inside apllicetion documents (don't cumulate effects from previous versions of code)
        document.querySelector('.run-code-btn').addEventListener('click', () => this.iframe.contentWindow.location.reload(true));

        this.iframe.addEventListener('load', () => {
            // don't apply code and check solution if iframe was loaded for the first time
            if (this.iframe.contentWindow.performance.getEntriesByType("navigation")[0].type === 'navigate') return;
            this.applyCode();
            this.checkSolution(this.task);
        });
        this.editorArea.addEventListener('animationend', (e) => this.removeAnimation(e));
       
        document.querySelectorAll('button.close').forEach(btn => btn.addEventListener('click', (e) => this.hidePopUp(e.currentTarget.closest('div'))));
        document.querySelector('.next-task-btn').addEventListener('click', () => this.handleNextClick());

        // for smooth animation
        this.challengesNav.style.transition = 'transform .5s ease-in';

        document.querySelector('h1').addEventListener('click', () => this.displayChallengesNav());
        document.querySelector('.close-nav').addEventListener('click', () => this.hideChallengesNav());

        window.addEventListener('keydown', (e) => this.handleEscEvent(e));
        window.addEventListener('click', (e) => this.hideNavOnClick(e));
    },

    render(taskToRender) {
        this.task = taskToRender;

        if (this.task) this.renderChallengesList();

        const {link, title, tasks, hints, description} = challenges[this.task];
        this.hints = hints;

        // disable button after it was made available after compliting of previous task
        const nextTaskBtn = document.querySelector('.next-task-btn');
        nextTaskBtn.setAttribute('disabled', true);
        
        // clear code editor
        myCodeMirror.setValue('');

        // apply parameters taken from current challenge's object (data)
        this.iframe.src = link;
        document.querySelector('.task-title').textContent = title;
        document.querySelector('.list-of-tasks').innerHTML = tasks;
        document.querySelector('.description').innerHTML = description;

        document.querySelectorAll('img.hint').forEach(hint => hint.addEventListener('click', (e) => this.handleHintClick(e, this.hints)));

        nextTaskBtn.style.display = Object.keys(challenges).indexOf(this.task) === Object.keys(challenges).length - 1 ? 'none' : 'block';
    }
};

app.firstRender();