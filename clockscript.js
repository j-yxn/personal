window.addEventListener("DOMContentLoaded",() => {
	const c = new Clock30(".clock");
});

class Clock30 {
	time = [];

	constructor(el) {
		this.el = document.querySelector(el);

		this.init();
	}
	init() {
		this.timeUpdate();
	}
	get timeAsObject() {
		const date = new Date();
		const h = date.getHours();
		const m = date.getMinutes();
		const d = this.spellOutNumber(date.getDate());
		const month = (date.toLocaleString('default', { month: 'long' })).toLowerCase();
		const year = this.getYearAsString(date.getFullYear());

		return { h, m, d, month, year };
	}

	spellOutNumber(number) {
		const numbers = {
			0: "zero",
			1: "one",
			2: "two",
			3: "three",
			4: "four",
			5: "five",
			6: "six",
			7: "seven",
			8: "eight",
			9: "nine",
			10: "ten",
			11: "eleven",
			12: "twelve",
			13: "thirteen",
			14: "fourteen",
			15: "fifteen",
			16: "sixteen",
			17: "seventeen",
			18: "eighteen",
			19: "nineteen",
			20: "twenty",
			30: "thirty",
			40: "forty",
			50: "fifty"
		};

		if (number < 20) {
			return numbers[number];
		} else if (number % 10 === 0) {
			return numbers[number];
		} else {
			const tens = Math.floor(number / 10) * 10;
			const ones = number % 10;
			let ending = "";
			if (number === 1 || number === 21 || number === 31) {
				ending = "st";
			} else if (number === 2 || number === 22) {
				ending = "nd";
			} else if (number === 3 || number === 23) {
				ending = "rd";
			} else {
				ending = "th";
			}
			return `${numbers[tens]}-${numbers[ones]}${ending}`;
		}
	}

	getYearAsString(year) {
		const numbers = {
			0: "zero",
			1: "one",
			2: "two",
			3: "three",
			4: "four",
			5: "five",
			6: "six",
			7: "seven",
			8: "eight",
			9: "nine"
		};

		if (year < 10) {
			return numbers[year];
		} else {
			const yearDigits = `${year}`.split("");
			const firstDigit = +yearDigits[0];
			const secondDigit = +yearDigits[1];
			const firstWord = numbers[firstDigit];
			const secondWord = numbers[secondDigit];
			return `${firstWord} ${secondWord}`;
		}
	}

	get timeInWords() {
		let { h } = this.timeAsObject;
		const { m, d, month, year } = this.timeAsObject;
		// hour
		if (h > 12) h -= 12;
		else if (h === 0) h = 12;

		const hrDigits = `${h}`.split("");
		if (h < 10) hrDigits.unshift("0");
		// minute
		const minDigits = `${m}`.split("");
		if (m < 10) minDigits.unshift("0");

		const numbers = {
			_1: "one",
			_2: "two",
			_3: "three",
			_4: "four",
			_5: "five",
			_6: "six",
			_7: "seven",
			_8: "eight",
			_9: "nine",
			_10: "ten",
			_11: "eleven",
			_12: "twelve",
			_13: "thirteen",
			_14: "fourteen",
			_15: "fifteen",
			_16: "sixteen",
			_17: "seventeen",
			_18: "eighteen",
			_19: "nineteen",
			_20: "twenty"
		};

		let words = "";
		let time = "";
		const hour = numbers[`_${h}`];
		let nextHourProp = h + 1;

		if (nextHourProp > 12) nextHourProp %= 12;

		const nextHour = numbers[`_${nextHourProp}`];

		if (m === 0) {
			words = `${hour} o’clock`;
		} else if (m === 15) {
			words = `quarter past ${hour}`;
		} else if (m < 30) {
			let min = numbers[`_${m}`];
			// values higher than 20 won’t be found
			if (!min) {
				const minFirstDigit = +minDigits[0];
				const minLastDigit = +minDigits[1];
				const firstWord = numbers[`_${minFirstDigit}0`];
				const lastWord = numbers[`_${minLastDigit}`];
				min = `${firstWord}-${lastWord}`;
			}
			words = `${min} minutes past ${hour}`;
		} else if (m === 30) {
			words = `half past ${hour}`;
		} else if (m === 45) {
			words = `quarter to ${nextHour}`;
		} else if (m > 30) {
			const minsLeft = 60 - m;
			let min = numbers[`_${minsLeft}`];
			// values higher than 20 won’t be found
			if (!min) {
				const digitString = `${minsLeft}`;
				const minsLeftFirstDigit = +digitString[0];
				const minsLeftLastDigit = +digitString[1];
				const firstWord = numbers[`_${minsLeftFirstDigit}0`];
				const lastWord = numbers[`_${minsLeftLastDigit}`];
				min = `${firstWord}-${lastWord}`;
			}
			words = `${min} minutes to ${nextHour}`;
		}
		
		return `${words}, ${month} ${d}`;
	}
	timeUpdate() {
		const flyInClass = "clock__word--fade-fly-in";
		const time = this.timeInWords.split(" ");
		// if half past, insert a space between “half” and “past” so “past” is boldfaced
		if (time.indexOf("half") > -1) {
			time.splice(1,0,"");
		}
		// display the time
		const timeWordEls = Array.from(this.el.querySelectorAll(".clock__word"));

		for (let i = 0; i < timeWordEls.length; ++i) {
			const wordEl = timeWordEls[i];
			wordEl.innerText = time[i] || "";

			if (time[i] !== this.time[i]) {
				wordEl.classList.add(flyInClass);
			} else {
				wordEl.classList.remove(flyInClass);
			}
		}

		this.time = time;
		// loop
		clearTimeout(this.timeUpdateLoop);
		this.timeUpdateLoop = setTimeout(this.timeUpdate.bind(this),1e3);
	}
}

