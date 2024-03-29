function countDecimal(num) {
    const decimalIndex = num.toString().indexOf('.');
    return decimalIndex >= 0 ? num.toString().length - decimalIndex - 1 : 0;
}

function round(num) {
    if (num % 1) {
        if (num.toString().indexOf('.') >= 14 ) {
            return NaN;
        }
        return num.toFixed(2);
    } else {
        if (num.toString().length > 14) return NaN;
        return num;
    }
}

function add(num1, num2) {
    return round(num1 + num2);
}

function subtract(num1, num2) {
    return round(num1 - num2);
}

function multiply(num1, num2) {
    return round(num1 * num2);
}

function divide(num1, num2) {
    if (!num2) return "Division by 0 not allowed."
    return round(num1 / num2);
}

let num1 = 0;
let num2 = 0;
let operator = '';

function operate(num1, operator, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
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
        if (screen.innerText.length >= 14) return;
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
    backspace.classList.add("newEquation");
});

const clear = document.querySelector(".clear-btn");

clear.addEventListener('click', () => {
    screen.innerText = "";
    operation.forEach(button => {
        button.disabled = true;
        button.classList.remove('chaining');
    });
    numbers.forEach(button => {
        button.classList.remove("chaining");
        button.classList.remove("newEquation");
    });
    decimal.classList.remove("newEquation");
    decimal.disabled = false;
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
    if (screen.innerText.length >= 13) return;
    if (screen.textContent) {
        screen.innerText = screen.textContent + '.';
    } else {
        screen.innerText = "0.";
    }
    decimal.disabled = true;
});

const backspace = document.querySelector(".delete");

backspace.addEventListener('click', () => {
    if (screen.textContent == '') return;
    if (backspace.classList.contains("newEquation")) {
        screen.innerText = '';
        decimal.disabled = false;
        backspace.classList.remove("newEquation");
    } else {
        screen.innerText = screen.innerText.slice(0, -1);
        if (screen.innerText == "") {
            operation.forEach(button => {
                button.disabled = true;
            });
        }
        if (!screen.innerText.includes('.')) {
            decimal.disabled = false;
        }
    }
});
