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

numbers.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains("newEquation")) {
            screen.innerText = '';
            numbers.forEach(btn => {
                btn.classList.remove("newEquation");
            });
        }
        if (button.classList.contains("chaining")) {
            screen.innerText = button.textContent;
            numbers.forEach(btn => {
                btn.classList.remove("chaining");
            });
        } else {
            screen.innerText = screen.textContent + button.textContent;
        }
        operation.forEach(button => button.disabled = false)
    });
});

operation.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains("chaining")) {
            num2 = screen.textContent;
            screen.innerText = operate(num1, operator, num2);
            num1 = screen.innerText;
            operator = button.textContent;
            numbers.forEach(button => {
                button.classList.add("chaining");
            });
        } else {
            num1 = screen.textContent;
            screen.innerText = "";
            operator = button.textContent;
            operation.forEach(button => {
                button.classList.add("chaining");
            });
            numbers.forEach(button => {
                button.classList.remove("chaining");
            });
        }
        operation.forEach(button => {
            button.disabled = true;
        });  
        if (!screen.textContent.includes('.')) {
            decimal.disabled = false;
        }
    });
});

equal.addEventListener('click', () => {
    num2 = screen.textContent;
    screen.innerText = operate(num1, operator, num2);
    operation.forEach(button => {
        button.classList.remove("chaining");
    });
    numbers.forEach(button => {
        button.classList.add("newEquation");
    });
    decimal.classList.add("newEquation");
});

const clear = document.querySelector(".clear-btn");

clear.addEventListener('click', () => {
    screen.innerText = "";
    operation.forEach(button => button.disabled = true);
    num1 = '';
    num2 = '';
    operator = '';
});

const decimal = document.querySelector(".decimal");

decimal.addEventListener('click', () => {
    if (decimal.classList.contains("newEquation")) {
        screen.innerText = '';
        decimal.classList.remove("newEquation");
        numbers.forEach(btn => {
            btn.classList.remove("newEquation");
        });
    }
    if (screen.textContent) {
        screen.innerText = screen.textContent + '.';
    } else {
        screen.innerText = "0.";
    }
    decimal.disabled = true;
});