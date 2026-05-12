// Glass Calculator Advanced Logic

let currentInput = "0";
let previousInput = "";
let isEvaluated = false;
let memory = 0;

const currentDisplay = document.getElementById('current-display');
const previousDisplay = document.getElementById('previous-display');

function updateDisplay() {
    // Format large numbers
    let displayValue = currentInput;
    if (displayValue.length > 12) {
        displayValue = parseFloat(displayValue).toPrecision(8);
    }
    currentDisplay.innerText = displayValue;
    previousDisplay.innerText = previousInput;
}

function append(char) {
    if (isEvaluated) {
        currentInput = char;
        isEvaluated = false;
    } else {
        if (currentInput === "0" && char !== ".") {
            currentInput = char;
        } else {
            currentInput += char;
        }
    }
    updateDisplay();
}

function op(operator) {
    if (isEvaluated) isEvaluated = false;
    // Prevent multiple operators
    const lastChar = currentInput.trim().slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
        currentInput = currentInput.trim().slice(0, -1) + " " + operator + " ";
    } else {
        currentInput += " " + operator + " ";
    }
    updateDisplay();
}

function clearAll() {
    currentInput = "0";
    previousInput = "";
    isEvaluated = false;
    updateDisplay();
}

function calculate() {
    try {
        let expression = currentInput
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/−/g, '-');
        
        // Remove trailing operators
        expression = expression.trim();
        if (['+', '-', '*', '/'].includes(expression.slice(-1))) {
            expression = expression.slice(0, -1);
        }

        previousInput = currentInput + " =";
        
        // Use a safer evaluation method
        const result = Function('"use strict";return (' + expression + ')')();
        currentInput = result.toString();
        isEvaluated = true;
    } catch (e) {
        currentInput = "Error";
    }
    updateDisplay();
}

function func(f) {
    let val = parseFloat(currentInput);
    if (isNaN(val)) return;

    if (f === 'sqrt') val = Math.sqrt(val);
    else if (f === 'sin') val = Math.sin(val * Math.PI / 180);
    else if (f === 'cos') val = Math.cos(val * Math.PI / 180);
    else if (f === 'tan') val = Math.tan(val * Math.PI / 180);
    else if (f === 'log') val = Math.log10(val);
    else if (f === 'ln') val = Math.log(val);
    else if (f === 'pow2') val = Math.pow(val, 2);
    else if (f === 'plusminus') val = val * -1;
    else if (f === 'exp') val = Math.exp(val);

    currentInput = val.toString();
    isEvaluated = true;
    updateDisplay();
}

function consts(c) {
    if (c === 'pi') currentInput = Math.PI.toString();
    isEvaluated = true;
    updateDisplay();
}

function mem(m) {
    const val = parseFloat(currentInput);
    if (m === 'MC') memory = 0;
    else if (m === 'MR') { currentInput = memory.toString(); isEvaluated = true; }
    else if (m === 'M+') memory += val;
    else if (m === 'M-') memory -= val;
    else if (m === 'MS') memory = val;
    updateDisplay();
}

// Initial state
updateDisplay();
