(function( d ) {
	'use strict';

	String.prototype.startsWith = function( char ) {
		return this[0] === char;
	};

	// we build a keyboard dictionary of all 
	// the ascii characters with they corresponding
	// keyCode values
	let keyboardMap = (function() {
		let map = {};
		let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
		let start = 65;

		for ( let i = 0; i < alphabet.length; i++ )
			map[alphabet[i]] = start++;
		return map;
	})(),

	dictionaryWords = d.split(/\s/).map(function( val ) { 
		return val.toLowerCase(); 
	}),

	words = [],

	point = 0,

	wLength = dictionaryWords.length,

	// is a word currently selected
	inProgress = false,

	/* The word that is currently selected */
	currentEnemy,

	/* The computed style of currentEnemy
	 * that we get in order to not decrease its size 
	 * has we shoot it
	 */
	ceOffsetWidth,

	gameContainer = document.querySelector('.game');

	/**
	 * Returns a random number that is in the range
	 * between a minimum and maximum value (all inclusive)
	 * @param {Integer} A minimum value
	 * @param {Integer} A maximum value
	 * @return {Integer} A value that falls in the range provided
	 */
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
		let keys = Object.keys( obj );
		for ( let k in keys )
			if ( obj[keys[k]] === value )
				return keys[k];
	};

	/**
	 * Display words to be typed on the page
	 * @param {Array} array of strings
	 */
	function displayEnemies( words ) {
		words.forEach( ( value ) => {
			let s = 500;
			let t = randomIntFromInterval(s, 4000);
			setTimeout( () => {
				let element = document.createElement('div');
				element.className = 'enemy';
				element.textContent = value;

				gameContainer.appendChild(element);
				setTimeout( () => {
					element.classList.add('move');
				}, s);
			}, t);
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
			return words.some( ( word ) => {
				return word === str;
			});
		}

		for ( let i = 0, len = 5; i < len; i++ ) {
			let idx, selectedWord;

			do {
				idx = randomIntFromInterval(0, wLength);
				selectedWord = dictionaryWords[idx];
			} while ( checkForDuplicate(selectedWord) );

			words.push(selectedWord);
		}
		displayEnemies(words);
	})();

	window.addEventListener('keydown', ( e ) => {
		let letter = Object.getKey(keyboardMap, e.keyCode);
		/**
		 * Returns an array of all visible ememies,
		 * that is which are not hidden since there's no point in looping over
		 * those
		 * @return {Array} of (words) node elements that are not hidden
		 */
		function getVisibleEnemies() {
			let enemiesArr = Array.from(document.querySelectorAll('.selected'));
			let visibleEnemies = enemiesArr.filter( ( element ) => {
				if ( element.style.visibility !== 'hidden' ) 
					return true;
			});
			return visibleEnemies;
		}

		// if the current state of the game 
		// is such that no words is selected
		if ( !inProgress )  {
			inProgress = true;
			let enemies = getVisibleEnemies().length ? 
						  getVisibleEnemies() : 
						  document.querySelectorAll('.enemy');

			Array.prototype.some.call(enemies, ( element ) => {
				currentEnemy = element;
				ceOffsetWidth = getComputedStyle(currentEnemy, null).getPropertyValue('width');
				if ( element.textContent.startsWith(letter) ) {
					if ( !currentEnemy.classList.contains('selected') ) {
						currentEnemy.classList.add('selected');
					}
					return true;
				}
			});
		}

		if ( currentEnemy.textContent.length > 0 ) {
			let t = currentEnemy.textContent.slice(1);
			currentEnemy.textContent = t;
			currentEnemy.style.width = ceOffsetWidth;
			point++;
			if ( currentEnemy.textContent.length === 0 ) {
				currentEnemy.style.visibility = 'hidden';
				currentEnemy.classList.remove('selected');
				currentEnemy.style.width = '0px';
				inProgress = false;
			}
		}
	});
})( dictionary );
