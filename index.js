const startApp = () => {
    let currentResult = 0;
    let isDecimal = false;
    let screen = document.getElementById('screen');

    let updateFinalResult = (newResult) => {
        currentResult = newResult;
        screen.value = 0;
        isDecimal = false;
        document.getElementById('current-result').innerText = `Текущий результат: ${currentResult}`;
    }

    let updateScreenValue = (newValue) => {
        screen.value = newValue;
    }

    let buttons = document.getElementsByTagName("button");
    Array.from(buttons).forEach(button => {
        button.onclick = (event) => {
            event.preventDefault();
            button.style.boxShadow = '0 0 20px ' + document.defaultView.getComputedStyle(button)['background-color'];
        };
        button.onmouseup = () => {
            button.style.boxShadow = 'none';
        };
    });


    let numbers = document.getElementsByClassName("number");
    Array.from(numbers).forEach(number => {
        number.onmousedown = () => {
            updateScreenValue(isDecimal ? screen.value + number.innerHTML : parseFloat(screen.value + number.innerHTML));
        };
    });


    let sign = document.getElementById('sign');
    sign.onclick = (event) => {
        event.preventDefault();
        updateScreenValue(-parseFloat(screen.value));
    }

    let clear = document.getElementById('clear');
    clear.onclick = (event) => {
        event.preventDefault();
        updateFinalResult(0);
    }

    let del = document.getElementById('del');
    del.onclick = (event) => {
        event.preventDefault();
        let currentValue = screen.value;
        console.log(currentValue.substr(-1));
        if (currentValue.substr(-1) === '.') isDecimal = false;
        updateScreenValue(parseFloat(currentValue.substr(0, currentValue.length - 1) || '0'));
    }

    let divide = document.getElementById('divide');
    divide.onclick = (event) => {
        event.preventDefault();
        updateFinalResult(parseFloat(currentResult) / parseFloat(screen.value));
    }

    let multiple = document.getElementById('multiple');
    multiple.onclick = (event) => {
        event.preventDefault();
        updateFinalResult(parseFloat(currentResult) * parseFloat(screen.value));
    }

    let minus = document.getElementById('minus');
    minus.onclick = (event) => {
        event.preventDefault();
        updateFinalResult(parseFloat(currentResult) - parseFloat(screen.value));
    }

    let add = document.getElementById('add');
    add.onclick = (event) => {
        event.preventDefault();
        updateFinalResult(parseFloat(currentResult) + parseFloat(screen.value));
    }

    let toDecimal = document.getElementById('to-decimal');
    toDecimal.onclick = (event) => {
        event.preventDefault();
        if (!isDecimal) updateScreenValue(screen.value + '.');
        else alert('Already a decimal');
        isDecimal = true;
    }

    let equal = document.getElementById('equal');
    equal.onclick = (event) => {
        event.preventDefault();
        updateFinalResult(parseFloat(screen.value));
    }
}

window.onload = () => startApp();