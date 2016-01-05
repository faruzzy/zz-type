(function() {
	function Game() {
		this.KeyboardHash = (function() {
			var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
			var map = {};
			var start = 65;
			for ( var i = 0; i < alphabet.length; i++ ) 
				map[ alphabet[i] ] = start++;
			return map;
		})();

		this.dictionaryWords = d.split(/\s/).map(function(val) { 
			return val.toLowerCase(); 
		});

		this.words = [];

		this.wLength = dictionaryWords.length;

		//this.gameContainer = $('.game');
		this.gameContainer = document.querySelector('.game');

		this.check = false;

		this.currentEnemy = null;
	}

	Game.prototype = {
		constructor: Game,

		init: function() {
			window.addEventListener('keydown', function(e) {
				var letter = Object.getKey(this.keyboardHash, e.keyCode);
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

		        if (e.keyCode === this.keyboardHash[currentEnemy.text()[0]]) {
					var currentText = currentEnemy.text().slice(1);
					currentEnemy.text(currentText);

					if (currentEnemy.text().length === 0) {
						currentEnemy.hide();
						check = false;
					}
				}
			});
		},

		create: function( words ) {
			var self = this;
			for (var i = 0, len = 5; i < len; i++) {
				var idx, selectedWord;

				do {
					idx = randomIntFromInterval(0, self.wLength);
					selectedWord = dictionaryWords[idx];
				} while (words.some(function(val) { return val.startsWith(selectedWord[0]); }));

				words.push(selectedWord);
			}

			words.forEach(function(value) {
				var t = randomIntFromInterval(1000, 4000);
				setTimeout(function(word) {
					var tt = randomIntFromInterval(1000, 3000);
					var element = document.createElement('div');
					element.className = 'enemy';
					element.textContent = word;
					element.appendTo(gameContainer);

					setTimeout(function(el) {
						$('.game').find(el).addClass('move');
					}, tt, element);
				}, t, value);
			});
		}
	};
})();
