const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("#equals");
const clearButton = document.querySelector("#clear");
const historyText = document.querySelector("#history-text");
const outputText = document.querySelector("#output-text");

let num1 = "";
let num2 = "";
let operator = "";

numberButtons.forEach((btn) => {
	btn.addEventListener("click", () => {
		// add case for empty string + dot
		if (operator === "") {
			num1 += btn.innerText;
		} else {
			num2 += btn.innerText;
		}

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
	}
});

clearButton.addEventListener("click", () => {
	clearInput();
});

const operate = function (num1Str, num2Str, operator) {
	const firstNum = parseFloat(num1Str);
	const secondNum = parseFloat(num2Str);
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
