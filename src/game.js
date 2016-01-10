(function( d ) {
	'use strict';

	String.prototype.startsWith = function( char ) {
		return this[0] === char;
	};

	// we build a keyboard dictionary of all 
	// the ascii characters with they corresponding
	// keyCode values
	var keyboardMap = (function() {
		var map = {};
		var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
		var start = 65;

		for ( var i = 0; i < alphabet.length; i++ )
			map[alphabet[i]] = start++;
		return map;
	})(),

	dictionaryWords = d.split(/\s/).map(function( val ) { 
		return val.toLowerCase(); 
	}),

	words = [],

	point = 0,

	wLength = dictionaryWords.length,

	gameContainer = document.querySelector('.game');

	function randomIntFromInterval( min, max ) {
	    return Math.floor( Math.random() * (max-min + 1) + min );
	}

	/**
	 * Returns the key corresponding to the value
	 * of a dictionary
	 * @method getKey
	 * @param {Object} dictionary to look into
	 * @param {Object} value we want the key of
	 * @return {Object} key corresponding to the value
	 */
	Object.getKey = function( obj, value ) {
		var keys = Object.keys( obj );
		for ( var k in keys )
			if ( obj[keys[k]] === value )
				return keys[k];
	};

	function create( words ) {
		words.forEach(function( value ) {
			var t = randomIntFromInterval(1000, 4000);
			setTimeout(function( word ) {
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
		/**
		 * Check if the string is already in the array
		 * @param {String} to check for duplication
		 * @return {Boolean} return true if the string is in the array
		 */
		function checkForDuplicate( str ) {
			return words.some(function( word ) {
				return word === str;
			});
		}

		for (var i = 0, len = 5; i < len; i++) {
			var idx, selectedWord;

			do {
				idx = randomIntFromInterval(0, wLength);
				selectedWord = dictionaryWords[idx];
			} while ( checkForDuplicate(selectedWord) );

			words.push(selectedWord);
		}
		create(words);
	})();

	window.addEventListener('keydown', function( e ) {
		var letter = Object.getKey(keyboardMap, e.keyCode);
		var currentEnemy;
		// TODO: check 'var eWidth = element.offsetWidth() ??

		function getVisibleEnemies() {
			var enemiesArr = Array.from(document.querySelectorAll('.selected'));
			var visibleEnemies = enemiesArr.filter(function( element ) {
				if ( element.style.visibility !== 'hidden' ) 
					return true;
			});
			return visibleEnemies;
		}

		var enemies = getVisibleEnemies().length ? 
					  getVisibleEnemies() : 
					  document.querySelectorAll('.enemy');

		Array.prototype.some.call(enemies, function( element ) {
			currentEnemy = element;
			if ( element.textContent.startsWith(letter) ) {
				if ( currentEnemy.className.indexOf('selected') === -1 ) {
					currentEnemy.className += ' selected';
				}

				var t = currentEnemy.textContent.slice(1);
				currentEnemy.textContent = t;
				point++;
				return true;
			}
		});

		if ( currentEnemy.textContent.length === 0 ) {
			currentEnemy.style.visibility = 'hidden';
			var nClassName = '';
			currentEnemy.classList.forEach(function( className ) {
				if ( className !== 'selected' ) {
					nClassName += className + ' ';
				}
			});
			currentEnemy.className = nClassName.trim();
		}
	});
})( dictionary );
