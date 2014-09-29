(function(window) {
	var $$ = function(selector, attributes) {
		var tagRegex = /<([a-z]+)\/?/,
			className = attributes.class,
			textContent = attributes.text;

		var matches = selector.match(tagRegex);
		if ( matches && matches.length ) {
			if ( !attributes ) {
				return document.createElement(matches[1]);	
			} else {
				var el = document.createElement(matches[1]);

				if ( className ) {
					el.className = className;
				} else if ( textContent ) {
					el.textContent = textContent;
				}

				return el;
			}
		}

		var elements = document.querySelectorAll(selector);
		return elements.length === 1 ? elements.shift() : elements;
	};

	var el = $$('<div/>', {
		class: 'test'
	});
})(window, undefined);

