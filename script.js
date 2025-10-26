// Math operation functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "42! Error/0";
  }
  return Number((a / b).toFixed(4));
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return Number(add(a, b).toFixed(4));
    case "-":
      return Number(subtract(a, b).toFixed(4));
    case "*":
      return Number(multiply(a, b).toFixed(4));
    case "/":
      return divide(a, b);
    default:
      return "Error";
  }
}

// Variables to store calculator state
const displaySymbols = { "*": "x", "/": "÷", "-": "−", "+": "+" };
const logicSymbols = { x: "*", "÷": "/", "−": "-", "+": "+" };
let firstNumber = "";
let operator = "";
let secondNumber = "";
let currentInput = "";
let shouldResetInput = false;

// Get DOM elements
const display = document.getElementById("display");
const digitButtons = document.querySelectorAll("button.digit");
const operatorButtons = document.querySelectorAll("button.operator");
const decimalButton = document.getElementById("decimal");
const backspaceButton = document.getElementById("backspace");
const clearButton = document.getElementById("clear");

// Function to update display with full expression (no spaces)
function updateDisplay() {
  if (firstNumber && operator && secondNumber) {
    // Show: "5+3"
    display.value = `${firstNumber}${
      displaySymbols[operator] || operator
    }${secondNumber}`;
  } else if (firstNumber && operator) {
    // Show: "5+"
    display.value = `${firstNumber}${displaySymbols[operator] || operator}`;
  } else if (currentInput) {
    // Show current input
    display.value = currentInput;
  } else {
    // Show: "0"
    display.value = "0";
  }
}

// Digit button click handlers
digitButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const digit = button.textContent;

    if (shouldResetInput) {
      // Start fresh after a calculation result
      currentInput = digit;
      firstNumber = "";
      operator = "";
      secondNumber = "";
      shouldResetInput = false;
    } else {
      // Build the current number
      if (currentInput === "0") {
        currentInput = digit;
      } else {
        currentInput += digit;
      }
    }

    // Store in appropriate variable
    if (operator === "") {
      firstNumber = currentInput;
    } else {
      secondNumber = currentInput;
    }

    updateDisplay();
  });
});

// Decimal point button handler
decimalButton.addEventListener("click", () => {
  if (shouldResetInput) {
    currentInput = "0.";
    shouldResetInput = false;
  } else if (!currentInput.includes(".")) {
    if (currentInput === "") {
      currentInput = "0.";
    } else {
      currentInput += ".";
    }
  }

  // Store in appropriate variable
  if (operator === "") {
    firstNumber = currentInput;
  } else {
    secondNumber = currentInput;
  }

  updateDisplay();
});

// Operator button click handlers
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    let selectedOperator = button.textContent;
    if (selectedOperator === "x") selectedOperator = "*";

    if (selectedOperator === "=") {
      // Perform calculation if we have both numbers
      if (firstNumber && operator && secondNumber) {
        const num1 = parseFloat(firstNumber);
        const num2 = parseFloat(secondNumber);
        let result = operate(operator, num1, num2);

        // Show result only (not the full expression with =)
        display.value = result;

        // Store result for next calculation
        currentInput = result.toString();
        firstNumber = result.toString();
        operator = "";
        secondNumber = "";
        shouldResetInput = true;
      }
    } else {
      // Setting an operator
      if (firstNumber && operator && secondNumber) {
        // Chain operations: calculate current operation first
        const num1 = parseFloat(firstNumber);
        const num2 = parseFloat(secondNumber);
        let result = operate(operator, num1, num2);

        firstNumber = result.toString();
        currentInput = result.toString();
        secondNumber = "";
      }

      if (firstNumber) {
        operator = logicSymbols[selectedOperator] || selectedOperator;
        currentInput = "";
        updateDisplay();
      }
    }
  });
});

// Backspace button handler
backspaceButton.addEventListener("click", () => {
  if (shouldResetInput) {
    return;
  }

  // Remove last character from current input
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = "0";
  }

  // Update appropriate variable
  if (operator === "") {
    firstNumber = currentInput;
  } else {
    secondNumber = currentInput;
  }

  updateDisplay();
});

// Clear button handler
clearButton.addEventListener("click", () => {
  firstNumber = "";
  operator = "";
  secondNumber = "";
  currentInput = "";
  shouldResetInput = false;
  updateDisplay();
});

// Initialize
currentInput = "0";
firstNumber = "0";
updateDisplay();

// Keyboard input support
window.addEventListener("keydown", (event) => {
  const key = event.key;

  // Allow digits
  if (key >= "0" && key <= "9") {
    const button = Array.from(digitButtons).find(
      (btn) => btn.textContent === key
    );
    if (button) button.click();
  }

  // Allow operators: + - /
  if (["+", "-", "/"].includes(key)) {
    const button = Array.from(operatorButtons).find(
      (btn) => btn.textContent === key
    );
    if (button) button.click();
  }

  // Match keyboard multiplication keys
  if (key === "*" || key.toLowerCase() === "x") {
    const multiplyButton = Array.from(operatorButtons).find(
      (btn) => btn.textContent === "x"
    );
    if (multiplyButton) multiplyButton.click();
  }

  // Equals: Enter or =
  if (key === "=" || key === "Enter") {
    const equalsButton = Array.from(operatorButtons).find(
      (btn) => btn.textContent === "="
    );
    if (equalsButton) equalsButton.click();
  }

  // Decimal key
  if (key === ".") {
    decimalButton.click();
  }

  // Backspace key
  if (key === "Backspace") {
    backspaceButton.click();
  }

  // Clear key (Escape)
  if (key === "Escape" || key.toLowerCase() === "AC") {
    clearButton.click();
  }

  // Prevent page scroll / form submission when pressing space or Enter
  event.preventDefault();
});
