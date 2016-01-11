( ( d ) => {
	'use strict';

	String.prototype.startsWith = function( char ) {
		return this[0] === char;
	};

	// we build a keyboard dictionary of all 
	// the ascii characters with they corresponding
	// keyCode values
	let keyboardMap = ( () => {
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
					element.className += ' move';
				}, s);
			}, t);
		});
	}
	
	// select words to send to the player
	( () => {
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
		let currentEnemy;
		// TODO: check 'let eWidth = element.offsetWidth() ??

		function getVisibleEnemies() {
			let enemiesArr = Array.from(document.querySelectorAll('.selected'));
			let visibleEnemies = enemiesArr.filter( ( element ) => {
				if ( element.style.visibility !== 'hidden' ) 
					return true;
			});
			return visibleEnemies;
		}

		let enemies = getVisibleEnemies().length ? 
					  getVisibleEnemies() : 
					  document.querySelectorAll('.enemy');

		Array.prototype.some.call(enemies, ( element ) => {
			currentEnemy = element;
			if ( element.textContent.startsWith(letter) ) {
				if ( currentEnemy.className.indexOf('selected') === -1 ) {
					currentEnemy.className += ' selected';
				}

				let t = currentEnemy.textContent.slice(1);
				currentEnemy.textContent = t;
				point++;
				return true;
			}
		});

		if ( currentEnemy.textContent.length === 0 ) {
			currentEnemy.style.visibility = 'hidden';
			let nClassName = '';
			currentEnemy.classList.forEach( ( className ) => {
				if ( className !== 'selected' ) {
					nClassName += className + ' ';
				}
			});
			currentEnemy.className = nClassName.trim();
		}
	});
})( dictionary );
