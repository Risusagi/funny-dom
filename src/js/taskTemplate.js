import '../style/taskTemplate.scss';
import CodeMirror from './codemirror/lib/codemirror.js';
import './codemirror/mode/javascript/javascript.js';
import './codemirror/addon/scroll/simplescrollbars.js';


const editorWindow = CodeMirror(document.querySelector('.editor'), {
    mode: "javascript",
    theme: "cobalt",
    lineNumbers: true,
    lineWrapping: true,
    scrollbarStyle: "overlay"
});