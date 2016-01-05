(function( d ) {
	'use strict';

	var keyboardMap = (function() {
		var map = {};
		var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
		var start = 65;

		for ( var i = 0; i < alphabet.length; i++ )
			map[ alphabet[ i ] ] = start++;
		return map;
	})(),

	dictionaryWords = d.split(/\s/).map(function( val ) { 
		return val.toLowerCase(); 
	}),

	words = [],

	wLength = dictionaryWords.length,

	gameContainer = document.querySelector('.game'),

	check = false,

	currentEnemy;

	function randomIntFromInterval( min, max ) {
	    return Math.floor( Math.random() * (max-min + 1) + min );
	}

	String.prototype.startsWith = function( char ) {
		return this[0] === char;
	};

	Object.getKey = function( obj, value ) {
		var keys = Object.keys( obj );
		for(var k in keys)
			if ( obj[keys[k]] === value )
				return keys[k];
	};

	function create( words ) {
		words.forEach(function(value) {
			var t = randomIntFromInterval(1000, 4000);
			setTimeout(function(word) {
				var tt = randomIntFromInterval(1000, 3000);
				var element = document.createElement('div');
				element.className = 'enemy';
				element.textContent = word;

				gameContainer.appendChild(element);
				setTimeout(function(el) {
					var oldClassName = el.className;
					el.className = oldClassName + ' move';
				}, tt, element);
			}, t, value);
		});
	}

	// select words to send to the player
	(function() {
		for (var i = 0, len = 5; i < len; i++) {
			var idx, selectedWord;

			do {
				idx = randomIntFromInterval(0, wLength);
				selectedWord = dictionaryWords[idx];
			} while (words.some(function(val) { return val.startsWith(selectedWord); }));

			words.push(selectedWord);
		}
		create(words);
	})();

	window.addEventListener('keydown', function( e ) {
		var letter = Object.getKey(keyboardMap, e.keyCode);
		var eWidth;
		//if ( !check ) {
			var enemies = document.querySelectorAll('.selected').length ? 
						  document.querySelectorAll('.selected') : 
						  document.querySelectorAll('.enemy');

			Array.prototype.forEach.call(enemies, function( element ) {
				if (element.textContent.startsWith(letter)) {
					var oldClassName = element.className;
					element.className = oldClassName + ' selected';
					currentEnemy = element;
					if ( !eWidth ) {
						eWidth = currentEnemy.offsetWidth;
					}

					var t = currentEnemy.textContent.slice(1);
					currentEnemy.textContent = t;
					//currentEnemy.offsetWidth = eWidth;

					return false;
				}
			});

		//}

        if ( e.keyCode === keyboardMap[currentEnemy.textContent.charAt(0)] ) {
			var currentText = currentEnemy.textContent.slice(1);
			currentEnemy.textContent = currentText;
			currentEnemy.offsetWidth = eWidth;

			if (currentEnemy.textContent.length === 0) {
				currentEnemy.style.display = 'none';
				check = false;
			}
		}
	});
})( dictionary );
