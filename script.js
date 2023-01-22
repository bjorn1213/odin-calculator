// initialisation
let displayValue = "0";

// functions
function add(a, b){
    return a + b;
};

function subtract(a, b){
    return a - b;
};

function multiply(a, b){
    return a * b;
};

function divide(a, b){
    return a / b;
};

function operate(a, b, operator){

    const availableFunctions = {
        '+': add,
        '-': subtract,
        '/': divide,
        '*': multiply,
    }

    const keys = Object.keys(availableFunctions);

    if (!keys.includes(operator)){
        return 'We\'re not doing this here.'
    }

    const result = availableFunctions[operator](a, b);

    return String(result);
}

function buttonHandler(clickEvent){
    const target = clickEvent.target;
    const id = target.id;

    if (id === 'clear'){
        displayValue = '0';
    } else if (/b\d/.test(id)) {
        if (displayValue === '0'){
            displayValue = target.textContent;
        } else {
            displayValue += target.textContent;
        }
    } else if (id === 'del') {
        if (displayValue.length > 1) {
            displayValue = displayValue.slice(0, -1);
        } else {
            displayValue = '0';
        }
    } else if (id === 'decimal') {
        if (!displayValue.includes('.')){
            displayValue += '.';
        } else if (displayValue.search(/[\/\*\+\-]/) >= 0
                    && !displayValue.slice(displayValue.search(/[\/\*\+\-]/)).includes('.')){
            displayValue += '.';
        }
    } else if (id === 'evaluate') {
        displayValue = handleInput(displayValue);
    } else {
        if (!/[\/\*\+\-]/.test(displayValue)){
            const addition = displayValue.slice(-1) === '.' ?
                                '0' + target.textContent :
                                target.textContent;
            displayValue += addition;
        }
    }

    updateDisplay();
}

function handleInput(inputStr){
    const operatorIdx = displayValue.search(/[\/\*\+\-]/);
    if (operatorIdx === -1){
        return inputStr;
    }

    const aStr = inputStr.slice(0, operatorIdx);
    const bStr = inputStr.slice(operatorIdx + 1);
    const operator = inputStr[operatorIdx];
    if (aStr.length === 0 || bStr.length === 0){
        return inputStr;
    }

    return operate(Number(aStr), Number(bStr), operator);

}

function updateDisplay(){
    const display = document.querySelector('.display');
    display.textContent = displayValue;
}

// document linking
const calcButtons = document.querySelectorAll('.calc-button');

calcButtons.forEach( function(button){
    button.addEventListener('click', buttonHandler);
})

