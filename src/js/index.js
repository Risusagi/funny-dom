import '../style/index.scss';
import StartPage from './StartPage';
import '../taskTemplate.html';

const rootEl = document.querySelector('#root');

const startPoint = localStorage.getItem('undoneChallenge');

if (startPoint) {
    window.open('../taskTemplate.html', '_self');
} else {
    const startPage = new StartPage(rootEl);
    startPage.render();
}