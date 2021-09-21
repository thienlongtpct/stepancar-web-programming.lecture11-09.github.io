//Главная фукция
const startApp = () => {
    const expression = document.getElementById('expression');
    const result = document.getElementById('result');
    let isResultUpdated = false;

    const updateResult = (newResult) => {
        result.value = newResult;
        isResultUpdated = true;
    }

    const updateExpression = (newValue) => {
        expression.value = newValue;
    }

    const reset = () => {
        isResultUpdated = false;
        expression.value = '';
        result.value = '';
    }

    const buttons = document.getElementsByTagName("button");
    Array.from(buttons).forEach(button => {
        button.onclick = (event) => {
            event.preventDefault();
            button.style.boxShadow = '0 0 20px ' + document.defaultView.getComputedStyle(button)['background-color'];

            // when the result is already updated, and a new button is clicked -> reset
            if (isResultUpdated) reset();

            // buttons which only change the expression, not the result
            if (!button.classList.contains("special")) {
                updateExpression(expression.value + button.innerText);
            }
        };
        button.onmouseup = () => {
            button.style.boxShadow = 'none';
        };
    });

    const clear = document.getElementById('clear');
    clear.onclick = (event) => {
        event.preventDefault();
        reset();
    }

    const del = document.getElementById('del');
    del.onclick = (event) => {
        event.preventDefault();
        const currentValue = expression.value;
        if (!currentValue) return;
        updateExpression(currentValue.substr(0, currentValue.length - 1));
    }

    const equal = document.getElementById('equal');
    equal.onclick = (event) => {
        event.preventDefault();
        try {
            const formattedExpression = expression.value.replace('÷', '/').replace('×', '*');
            const value = Function(`'use strict'; return (${formattedExpression})`)();
            updateResult(value);
        }
        catch (exception) {
            alert('Пожалуйста, проверьте еще раз, в вашем выражении есть несколько опечаток.');
        }
    }
}

window.onload = () => startApp();