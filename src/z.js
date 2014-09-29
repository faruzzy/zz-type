/*
 *
 * Todo:
 * 1 - Add the ability to select DOM elements
 * 2 - Figure out to chains functions (addClass, width, etc..)
 */
(function(window, undefined) {
	var 

	array_proto = [],

	core_slice = array_proto.slice,

	Zamunda = function(selector, attributes) {
		return new Zamunda.fn.init(selector, attributes);
	};

	Zamunda.fn = Zamunda.prototype =  {
		constructor: Zamunda,
		init: function(selector, attributes) {
			var tagRegex = /<(\w+)\/?/,
				className,
				textContent;

			if (attributes) {
				className = attributes.class;
				textContent = attributes.text;
			}

			var matches = selector.match(tagRegex);

			// DOM string
			if (matches && matches.length) {
				if (!attributes) {
					return document.createElement(matches[1]);
				} else {
					var el = document.createElement(matches[1]);

					if (className) {
						el.className = className;
					}

					if (textContent) {
						el.textContent = textContent;
					}

					return el;
				}
			} 

			return core_slice.call(document.querySelectorAll(selector));
		},

		test: function() {
			console.log('yay!');
		}
	};

	Zamunda.fn.init.prototype = Zamunda.fn;

	window.Zamunda = window.$ = Zamunda
})(window);
