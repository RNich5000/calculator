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
		// add case for empty string + dot
		if (operator === "") {
			num1 += btn.innerText;
			outputText.textContent = num1;
		} else {
			num2 += btn.innerText;
			outputText.textContent = num2;
		}

		resetOnNextClick = false;
		generateHistoryText();
	});
});

operatorButtons.forEach((btn) => {
	btn.addEventListener("click", () => {
		if (operator === "" && num1 !== "") {
			operator = btn.textContent;
			// add case for num1 null
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
			// case for divide by 0 error
			return firstNum / secondNum;
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
