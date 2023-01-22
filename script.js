
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

    return availableFunctions[operator](a, b);
}