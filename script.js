const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("#equals");
const clearButton = document.querySelector("#clear");
const historyText = document.querySelector("#history-text");
const outputText = document.querySelector("#output-text");

let num1 = "";
let num2 = "";
let operator = "";
let resetOnNextClick = false;

numberButtons.forEach((btn) => {
	btn.addEventListener("click", () => {
		if (resetOnNextClick) {
			clearInput();
		}

		let numberToAdd = "";
		if (operator === "") {
			numberToAdd = validateInput(num1, btn.innerText);
			num1 += numberToAdd;
			outputText.textContent = num1;
		} else {
			numberToAdd = validateInput(num2, btn.innerText);
			num2 += numberToAdd;
			outputText.textContent = num2;
		}

		resetOnNextClick = false;
		generateHistoryText();
	});
});

const validateInput = function (current, input) {
	if (input === ".") {
		if (current === "") {
			return "0.";
		} else if (current.includes(".")) {
			return "";
		}
	}

	return input;
};

operatorButtons.forEach((btn) => {
	btn.addEventListener("click", () => {
		if (operator === "" && num1 !== "") {
			operator = btn.textContent;
			generateHistoryText();
		}
	});
});

equalsButton.addEventListener("click", () => {
	if (num1 !== "" && num2 !== "" && operator !== "") {
		outputText.textContent = operate(num1, num2, operator);
		historyText.textContent += " =";
	}
});

clearButton.addEventListener("click", () => {
	clearInput();
});

const operate = function (num1Str, num2Str, operator) {
	const firstNum = parseFloat(num1Str);
	const secondNum = parseFloat(num2Str);
	resetOnNextClick = true;
	switch (operator) {
		case "+":
			return firstNum + secondNum;
		case "-":
			return firstNum - secondNum;
		case "x":
			return firstNum * secondNum;
		case "÷":
			if (secondNum === 0) {
				return "Impossible!";
			} else {
				return firstNum / secondNum;
			}
		default:
			break;
	}
};

const generateHistoryText = function () {
	historyText.textContent = `${num1} ${operator} ${num2}`;
};

const clearInput = function () {
	num1 = "";
	num2 = "";
	operator = "";

	outputText.textContent = "0";
	historyText.textContent = "";
};
