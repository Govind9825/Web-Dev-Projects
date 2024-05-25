let string = "";
let prev = ""; // Variable to store the last entered operator
let isShift = false; // Variable to track shift state

let buttons = document.querySelectorAll('.button');
let inputField = document.querySelector('input');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        let value = button.getAttribute('value');

        console.log(prev);

        if (value === "E") {
            clearInput();
        } else if (value === "=") {
            evaluateExpression();
        } else if (value === "√") {
            appendToExpression("√(");
        } else if (value === "shift") {
            shiftFn();
        } else if (value === "sin") {
            appendToExpression("sin(");
        } else if (value === "cos") {
            appendToExpression("cos(");
        } else if (value === "tan") {
            appendToExpression("tan(");
        } else if (value === "ln") {
            appendToExpression(isShift ? "exp(" : "ln(");
        } else if (value === "log") {
            appendToExpression(isShift ? "10^(" : "log(");
        } else if (value === "^") {
            appendToExpression("**");
        } else if (value === "π") {
            appendToExpression(isShift ? Math.E : Math.PI);
        } else {
            appendToExpression(value);
            if (isOperator(value)) {
                prev = value;
            }
        }
    });
});

function clearInput() {
    string = "";
    prev = "";
    inputField.value = string;
}

function appendToExpression(value) {
    string += value;
    updateInputField();
}

function updateInputField() {
    inputField.value = string;
}

function isOperator(value) {
    return ["+", "-", "*", "/", "^"].includes(value);
}

function evaluateExpression() {
    try {
        let replacedString = string.replace(/(\d+)!/g, "factorial($1)")
                                   .replace(/√\(/g, "Math.sqrt(")
                                   .replace(/sin\(/g, "Math.sin((Math.PI/180)*")
                                   .replace(/cos\(/g, "Math.cos((Math.PI/180)*")
                                   .replace(/tan\(/g, "Math.tan((Math.PI/180)*")
                                   .replace(/ln\(/g, "Math.log(")
                                   .replace(/log\(/g, "Math.log10(")
                                   .replace(/10\^\(/g, "Math.pow(10,")
                                   .replace(/exp\(/g, "Math.exp(");


                                   
        let result = eval(replacedString);
        inputField.value = result;
        string = result.toString(); // Update string with the result
    } catch (error) {
        inputField.value = "Error";
    }
}

function factorial(num) {
    if (num === 0 || num === 1) return 1;
    for (let i = num - 1; i >= 1; i--) {
        num *= i;
    }
    return num;
}

function shiftFn() {
    isShift = !isShift;
    document.querySelector('[value="shift"]').style.backgroundColor = isShift ? "orange" : "";
    document.querySelector('[value="π"]').textContent = isShift ? "e" : "π";
    document.querySelector('[value="π"]').style.backgroundColor = isShift ? "pink" : "";
    document.querySelector('[value="ln"]').textContent = isShift ? "exp" : "ln";
    document.querySelector('[value="ln"]').style.backgroundColor = isShift ? "pink" : "";
    document.querySelector('[value="log"]').textContent = isShift ? "10^" : "log";
    document.querySelector('[value="log"]').style.backgroundColor = isShift ? "pink" : "";
}

// Add this line at the bottom of your script to include the copyright notice.
console.log("© 2024 Your Company Name. All rights reserved.");
