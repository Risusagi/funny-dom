import '../style/index.scss';
import StartPage from './StartPage';
import '../taskTemplate.html';

const rootEl = document.querySelector('#root');

const startPage = new StartPage(rootEl);
startPage.render();