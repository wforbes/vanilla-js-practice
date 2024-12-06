const textInput = document.getElementById("text-input");
const checkBtn = document.getElementById("check-btn");
const result = document.getElementById("result");

checkBtn.addEventListener("click", () => {
	result.textContent = checkPalindrome(textInput.value)
		? `${textInput.value} is a Palindrome`
		: `${textInput.value} is not a Palindrome`;
});

const checkPalindrome = (input) => {
	const processedInput = input.toLowerCase().replace(/[^a-z0-9]/g, "");
	const reversedInput = processedInput.split("").reverse().join("");
	return processedInput === reversedInput;
};

// Test cases from FreeCodeCamp
// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/build-a-palindrome-checker-project/build-a-palindrome-checker
const test_checkPalindrome = () => {
	const testCases = [
		"A",
		"_eye",
		"eye",
		"race car",
		"not a palindrome",
		"A man, a plan, a canal. Panama",
		"nope",
		"almostomla",
		"My age is 0, 0 si ega ym.",
		"1 eye for of 1 eye.",
		"0_0 (: /-\\ :) 0-0",
		"five|\\_/|four",
	];

	testCases.forEach((testCase) => {
		console.log(testCase, checkPalindrome(testCase));
	});
};

test_checkPalindrome();
