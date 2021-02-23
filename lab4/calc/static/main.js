_text = '';
let shouldClear = false;

Object.defineProperty(globalThis, 'text', {
    get: function () {
        if (shouldClear) {
            shouldClear = false;
            _text = '';
        }
        return _text;
    },
    set: function (v) {
        _text = v;
        document.querySelector('.screen').innerText = text;
    }
});

const cnt = c => Array.from(text).reduce((a, b) => b === c ? a + 1 : a, 0);

window.onload = function () {
    document.querySelectorAll('.key.digit').forEach(e => {
        let num = e.innerText;
        e.addEventListener('click', function () {
            if (num == '.' && text.includes('.')) {
                return;
            }
            text = text + num;
        });
    });
    document.querySelectorAll('.key.operation').forEach(e => {
        let num = e.innerText;
        e.addEventListener('click', function () {
            shouldClear = false;
            if (text.length == 0) { return; }
            if (text[text.length - 1] == '(') { return; }
            if (text[text.length - 1] == '.') { return; }
            if (text[text.length - 1] == ' ') {
                text = text.substr(0, text.length - 3);
            }
            text = text + ' ' + num + ' ';
        });
    });
    document.querySelectorAll('.key.bracket.opening').forEach(e => {
        let num = e.innerText;
        e.addEventListener('click', function () {
            if (text.length == 0) { return; }
            if (text[text.length - 1] == '.') { return; }
            if (text[text.length - 1] == ' ') {
                text = text + num;
            }
        });
    });
    document.querySelectorAll('.key.bracket.closing').forEach(e => {
        let num = e.innerText;
        e.addEventListener('click', function () {
            if (text.length == 0) { return; }
            if (text[text.length - 1] == '.') { return; }
            if (text[text.length - 1] == ' ') { return; }
            if (text[text.length - 1] == '(') { return; }
            if (cnt('(') - cnt(')') > 0) {
                text = text + num;
            }
        });
    });
    document.querySelectorAll('.key.result').forEach(e => {
        let num = e.innerText;
        e.addEventListener('click', function () {
            if (text.length == 0) { return; }
            if (text[text.length - 1] == '.') { return; }
            if (text[text.length - 1] == ' ') { return; }
            if (cnt('(') == cnt(')')) {
                try {
                    text = eval(text);
                } catch (error) {
                    //Should never happen, just in case
                    text = 'Error';
                }
                shouldClear = true;
            }
        });
    });
    document.querySelectorAll('.key.clear').forEach(e => {
        let num = e.innerText;
        e.addEventListener('click', function () {
            text = '';
        });
    });
};
