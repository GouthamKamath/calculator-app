const numKeys = document.querySelectorAll('.number-key');
const keys = document.querySelectorAll('.key');
const operatorKeys = document.querySelectorAll('.operator');
const resetKey = document.getElementById('reset-btn');
const equalsKey = document.querySelector('.equal');
const decimalKey = document.querySelector('.decimal');
const result = document.getElementById('result');
const toggleEl = document.getElementById('toggleBar');


let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

const calculate = {
    '/': (num1, num2) => num1 / num2,
    '*': (num1, num2) => num1 * num2,
    '+': (num1, num2) => num1 + num2,
    '-': (num1, num2) => num1 - num2,
    '=': (num1, num2) => num2,
}

// functions
function toggleThemes(event) {
    if (event.target.value == 1) {
        document.documentElement.setAttribute("data-theme", "root");
    } else if (event.target.value == 2) {
        document.documentElement.setAttribute("data-theme", "theme-light");
    }
    else {
        document.documentElement.setAttribute("data-theme", "theme-dark");

    }
}


function deleteNumber() {
    const remainingNum = result.textContent.substr(0, (result.textContent.length - 1));
    result.textContent = remainingNum ? remainingNum : '0';
}

function addDecimal() {
    // if operator is pressed, don't add decimal
    if (awaitingNextValue) return;
    // if no decimal, add one
    if (!result.textContent.includes('.')) {
        result.textContent = `${result.textContent}.`;
    }
}

function useOperator(operator) {
    const currentValue = Number(result.textContent);
    // prevent multiple operators
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    // assign first value if no value
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        result.textContent = calculation;
        firstValue = calculation;
    }
    // ready for next value, store operator
    awaitingNextValue = true;
    operatorValue = operator;
}


function sendNumberValue(number) {
    // Replace current display value if first value is entered
    if (awaitingNextValue) {
        result.textContent = number;
        awaitingNextValue = false;
    } else {
        // If current display value is 0, replace it, if not add number to display value
        const displayValue = result.textContent;
        result.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

// Event listeners
keys.forEach(inputKey => {
    if (inputKey.classList.contains('number-key')) {
        inputKey.addEventListener('click', () => sendNumberValue(inputKey.value));
    }
    else if (inputKey.classList.contains('operator')) {
        inputKey.addEventListener('click', () => useOperator(inputKey.value));
    }
    else if (inputKey.classList.contains('decimal')) {
        inputKey.addEventListener('click', () => addDecimal());
    }
    else if (inputKey.classList.contains('del-reset')) {
        inputKey.addEventListener('click', () => deleteNumber());
    }
})

// reset all
function resetAll() {
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    result.textContent = '0';
}

// reset key
resetKey.addEventListener('click', () => resetAll())

// toggle bar select
toggleEl.addEventListener('change', toggleThemes);



