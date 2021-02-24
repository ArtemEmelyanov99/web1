_text = '';
let shouldClear = false;

//
Object.defineProperty(globalThis, 'text', {
    // Очиска строки
    get: function () {
        if (shouldClear) {
            shouldClear = false;
            _text = '';
        }
        return _text;
    },
    // Document метод querySelector() возвращает первый элемент (Element) документа, который соответствует указанному селектору 
    // или группе селекторов. Если совпадений не найдено, возвращает значение null.
    set: function (v) {
        _text = v;
        document.querySelector('.screen').innerText = text;
    }
});

// проверка количества открытых и закрытых скобок
const cnt = c => Array.from(text).reduce((a, b) => b === c ? a + 1 : a, 0);

window.onload = function () {
    // Отбратобка нажатой цифры
    document.querySelectorAll('.key.digit').forEach(e => {
        let num = e.innerText;
        e.addEventListener('click', function () {
            if (num == '.' && text.includes('.')) {
                return;
            }
            text = text + num;
        });
    });
    // обработка нажатого оператора
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
    // обработка открытой скобки
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
    // обработка закрытой скобки
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
    // обработка равно
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
                    //вывод ошибки
                    text = 'Error';
                }
                shouldClear = true;
            }
        });
    });
    // обработка очищения
    document.querySelectorAll('.key.clear').forEach(e => {
        let num = e.innerText;
        e.addEventListener('click', function () {
            text = '';
        });
    });
};
