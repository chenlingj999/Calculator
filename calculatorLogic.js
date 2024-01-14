function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

let num1 = 0;
let num2 = 0;
let operator = '';

function operate(num1, operator, num2) {
    num1 = parseInt(num1);
    num2 = parseInt(num2);
    switch(operator) {
        case "+":
            return add(num1, num2);
            break;

        case "-":
            return subtract(num1, num2);
            break;

        case "x":
            return multiply(num1, num2);
            break;

        case "/":
            return divide(num1, num2);
            break;
        
        default:
            alert("Unsupported Operator!")
    }
}

const numbers = document.querySelectorAll(".number");
const operation = document.querySelectorAll(".operator");
const screen = document.getElementById("screen");
const equal = document.querySelector(".equal");
let startOfNum2;

numbers.forEach(button => {
    button.addEventListener('click', () => {
        screen.innerText = screen.textContent + button.textContent;
        operation.forEach(button => button.disabled = false)
    });
});

operation.forEach(button => {
    button.addEventListener('click', () => {
        num1 = screen.textContent;
        screen.innerText = "";
        operator = button.textContent;
        operation.forEach(button => button.disabled = true);
    });
});

equal.addEventListener('click', () => {
    let length = screen.textContent.length;
    num2 = screen.textContent.slice(startOfNum2);
    screen.innerText = operate(num1, operator, num2);
});

const clear = document.querySelector(".clear-btn");

clear.addEventListener('click', () => {
    screen.innerText = "";
    operation.forEach(button => button.disabled = true);
});