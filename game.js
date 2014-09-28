(function($, d) {
	'use strict';
	var dictionaryWords = d.split(/\s/).map(function(val) { return val.toLowerCase(); }),
		wLength = dictionaryWords.length,
		gameContainer = $('.game');

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
					class: 'enemy'
				}).text(word).appendTo(gameContainer);

				setTimeout(function(el) {
					$('.game').find(el).addClass('move');
				}, tt, element);
			}, t, value);
		});
	}

	var words = [];
	for (var i = 0, len = 5; i < len; i++) {
		var idx, selectedWord;

		do {
			idx = randomIntFromInterval(0, wLength);
			selectedWord = dictionaryWords[idx];
		} while (words.some(function(val) { return val.startsWith(selectedWord[0]); }))

		words.push(selectedWord);
	}

	create(words);

	var check = false;
	var currentEnemy;
	window.addEventListener('keydown', function(e) {
		var letter = Object.getKey(keyboardHash, e.keyCode);
		if (!check) {
			$('.enemy:contains(' + letter + ')').each(function() {
				if($(this).text().startsWith(letter)) {
					currentEnemy =  $(this).addClass('selected');

					var t = currentEnemy.text().slice(1);
					currentEnemy.text(t);
					check = true;

					return false;
				}
			});
		}

		if (e.keyCode === keyboardHash[letter]) {
			var currentText = currentEnemy.text().slice(1);
			currentEnemy.text(currentText);

			if (currentEnemy.text().length === 0) {
				currentEnemy.hide();
				check = false;
			}

		}

		console.log(e.keyCode);
		console.log('event: ', e);
	});

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
	};

})(jQuery, dictionary);
