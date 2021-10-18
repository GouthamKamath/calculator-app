const numKeys = document.querySelectorAll('.number-key');
const keys = document.querySelectorAll('.key');
const operatorKeys = document.querySelectorAll('.operator');
const resetKey = document.getElementById('reset-btn');
const equalsKey = document.querySelector('.equal');
const decimalKey = document.querySelector('.decimal');
const result = document.getElementById('result');

let inputArr = [];
let num1 = 0;
let operator = '';
let resultValue = 0;
let firstNumberEntered = false;

// functions
function calculate(arr, operator) {
    console.log(Number(arr[num1]), arr[num1 + 1]);
    switch (operator) {
        case '+': {
            resultValue = Number(arr[num1]) + Number(arr[num1 + 1]);
            num1++;
            break;
        }
        case '-': {
            resultValue -= Number(ele);
            break;
        }
        case '*': {
            resultValue *= Number(ele);
            break;
        }
        case '/': {
            resultValue /= Number(ele);
            break;
        }
        default: {
            return false;
        }
    }
    console.log(resultValue);
}


function displayNumbers() {
    if (!firstNumberEntered) {
        if ((this.classList.contains('number-key')) || (this.classList.contains('decimal') && !result.textContent.includes('.'))) {
            result.textContent += this.textContent;
        }
        else if (this.classList.contains('operator') && result.textContent) {
            firstNumberEntered = true;
            inputArr.push(result.textContent);
            operator = this.textContent;
        }
    } else {
        if (result.textContent && this.classList.contains('number-key')) {
            result.textContent = '';
            firstNumberEntered = false;
            result.textContent += this.textContent;
        }
    }

}

// Event listeners
keys.forEach(key => {
    key.addEventListener('click', displayNumbers);
})


equalsKey.addEventListener('click', () => { calculate(inputArr, operator) });




