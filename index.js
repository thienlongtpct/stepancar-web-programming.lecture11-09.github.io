//Главная фукция
const startApp = () => {
    let currentResult = 0;
    let isDecimal = false;
    const screen = document.getElementById('screen');

    const updateFinalResult = (newResult) => {
        currentResult = newResult;
        screen.value = 0;
        isDecimal = false;
        document.getElementById('current-result').innerText = `Текущий результат: ${currentResult}`;
    }

    const updateScreenValue = (newValue) => {
        screen.value = newValue;
    }

    const buttons = document.getElementsByTagName("button");
    Array.from(buttons).forEach(button => {
        button.onclick = (event) => {
            event.preventDefault();
            button.style.boxShadow = '0 0 20px ' + document.defaultView.getComputedStyle(button)['background-color'];
        };
        button.onmouseup = () => {
            button.style.boxShadow = 'none';
        };
    });


    const numbers = document.getElementsByClassName("number");
    Array.from(numbers).forEach(number => {
        number.onmousedown = () => {
            updateScreenValue(isDecimal ? screen.value + number.innerHTML : parseFloat(screen.value + number.innerHTML));
        };
    });


    const sign = document.getElementById('sign');
    sign.onclick = (event) => {
        event.preventDefault();
        updateScreenValue(-parseFloat(screen.value));
    }

    const clear = document.getElementById('clear');
    clear.onclick = (event) => {
        event.preventDefault();
        updateFinalResult(0);
    }

    const del = document.getElementById('del');
    del.onclick = (event) => {
        event.preventDefault();
        const currentValue = screen.value;
        if (currentValue.substr(-1) === '.') isDecimal = false;
        updateScreenValue(parseFloat(currentValue.substr(0, currentValue.length - 1) || '0'));
    }

    const divide = document.getElementById('divide');
    divide.onclick = (event) => {
        event.preventDefault();
        updateFinalResult(parseFloat(currentResult) / parseFloat(screen.value));
    }

    const multiple = document.getElementById('multiple');
    multiple.onclick = (event) => {
        event.preventDefault();
        updateFinalResult(parseFloat(currentResult) * parseFloat(screen.value));
    }

    const minus = document.getElementById('minus');
    minus.onclick = (event) => {
        event.preventDefault();
        updateFinalResult(parseFloat(currentResult) - parseFloat(screen.value));
    }

    const add = document.getElementById('add');
    add.onclick = (event) => {
        event.preventDefault();
        updateFinalResult(parseFloat(currentResult) + parseFloat(screen.value));
    }

    const toDecimal = document.getElementById('to-decimal');
    toDecimal.onclick = (event) => {
        event.preventDefault();
        if (!isDecimal) updateScreenValue(screen.value + '.');
        else alert('Already a decimal');
        isDecimal = true;
    }

    const equal = document.getElementById('equal');
    equal.onclick = (event) => {
        event.preventDefault();
        updateFinalResult(parseFloat(screen.value));
    }
}

window.onload = () => startApp();