import '../style/index.scss';
import StartPage from './StartPage';

const rootEl = document.querySelector('#root');

const startPage = new StartPage(rootEl);
startPage.render();