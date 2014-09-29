(function($, d) {
	'use strict';

	var keyboardHash = {
		'a': 65,
		'b': 66,
		'c': 67,
		'd': 68,
		'e': 69,
		'f': 70,
		'g': 71,
		'h': 72,
		'i': 73,
		'j': 74,
		'k': 75,
		'l': 76,
		'm': 77,
		'n': 78,
		'o': 79,
		'p': 80,
		'q': 81,
		'r': 82,
		's': 83,
		't': 84,
		'u': 85,
		'v': 86,
		'w': 87,
		'x': 88,
		'y': 89,
		'z': 90
	},
	dictionaryWords = d.split(/\s/).map(function(val) { return val.toLowerCase(); }),
	words = [],
	wLength = dictionaryWords.length,
	//gameContainer = $('.game'),
	gameContainer = $('.game'),
	check = false,
	currentEnemy;

	function randomIntFromInterval(min, max) {
	    return Math.floor(Math.random() * (max-min + 1) + min);
	}

	String.prototype.startsWith = function(char) {
		return this[0] === char;
	};

	Object.getKey = function(obj, value) {
		var keys = Object.keys(obj);

		for(var k in keys)
			if (obj[keys[k]] === value)
				return keys[k];
	};

	function create(words) {
		words.forEach(function(value) {
			var t = randomIntFromInterval(1000, 4000);
			setTimeout(function(word) {
				var tt = randomIntFromInterval(1000, 3000);
				var element = $('<div/>', {
					class: 'enemy',
					text: word
				});

				gameContainer[0].appendChild(element);

				setTimeout(function(el) {
					var oldClassName = el.className;
					el.className = oldClassName + ' move';
				}, tt, element);
			}, t, value);
		});
	}

	for (var i = 0, len = 5; i < len; i++) {
		var idx, selectedWord;

		do {
			idx = randomIntFromInterval(0, wLength);
			selectedWord = dictionaryWords[idx];
		} while (words.some(function(val) { return val.startsWith(selectedWord[0]); }))

		words.push(selectedWord);
	}

	create(words);
	window.addEventListener('keydown', function(e) {
		var letter = Object.getKey(keyboardHash, e.keyCode);
		var eWidth;
		if (!check) {
			var enemies = $('.enemy');
			enemies.forEach(function(element) {
				if (element.textContent.startsWith(letter)) {
					var oldClassName = element.className;
					element.className = oldClassName + ' selected';
					currentEnemy = element;
					if (!eWidth) {
						eWidth = currentEnemy.offsetWidth;
					}

					var t = currentEnemy.textContent.slice(1);
					currentEnemy.textContent = t;
					currentEnemy.offsetWidth = eWidth;

					check = true;
					return false;
				}
			});
		}

        if (e.keyCode === keyboardHash[currentEnemy.textContent.charAt(0)]) {
			var currentText = currentEnemy.textContent.slice(1);
			currentEnemy.textContent = currentText;
			currentEnemy.offsetWidth = eWidth;

			if (currentEnemy.textContent.length === 0) {
				currentEnemy.style.display = 'none';
				check = false;
			}
		}
	});
})((Zamunda, dictionary);