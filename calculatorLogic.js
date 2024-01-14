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

let num1;
let num2;
let operator;

function operate(num1, operator, num2) {
    switch(operator) {
        case "+":
            return add(num1, num2);
            break;

        case "-":
            return subtract(num1, num2);
            break;

        case "*":
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

numbers.forEach(button => {
    button.addEventListener('click', () => {
        screen.innerText = screen.textContent + button.textContent;
    });
});
