'use strict';

let getCurr = (function () {
    let c = false;
    return function () {
        c = !c;
        return c ? 'X' : 'O';
    };
})();

window.addEventListener('load', () => {
    const empty_sign = ' ';

    let a = Array.from(document.querySelectorAll('.cell'));
    for (let i in a) {
        a[i].addEventListener('click', () => {
            if (a[i].innerHTML == empty_sign) {
                a[i].innerHTML = getCurr();
                if (won()) {
                    getCurr();
                    alert(getCurr() + ' won!');
                    reset();
                }
                for (let i in a) {
                    if (a[i].innerHTML == empty_sign) return;
                }
                alert('Tie!');
                reset();
            }
        });
    }

    function reset() {
        for (let i in a) {
            a[i].innerHTML = empty_sign;
        }
    }

    function won() {
        for (let i = 0; i < 3; i++) {
            console.log(a[i * 3].innerHTML, a[i * 3 + 1].innerHTML, a[i * 3 + 2].innerHTML);
            if (a[i * 3].innerHTML != empty_sign && a[i * 3].innerHTML == a[i * 3 + 1].innerHTML && a[i * 3].innerHTML == a[i * 3 + 2].innerHTML) return true;
            if (a[i].innerHTML != empty_sign && a[i].innerHTML == a[i + 3].innerHTML && a[i].innerHTML == a[i + 6].innerHTML) return true;
        }

        if (a[0].innerHTML != empty_sign && a[0].innerHTML == a[4].innerHTML && a[0].innerHTML == a[8].innerHTML) return true;
        if (a[2].innerHTML != empty_sign && a[2].innerHTML == a[4].innerHTML && a[2].innerHTML == a[6].innerHTML) return true;

        return false;
    }
});