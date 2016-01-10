/*
 *
 * Todo:
 * 1 - Add the ability to select DOM elements
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

			if (attributes && attributes.class) {
				className = attributes.class;
			}

			if (attributes && attributes.text) {
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

			var elements = core_slice.call(document.querySelectorAll(selector));
			this[0] = elements;

			return this;
		},

		addClass: function(value) {
			var classes, i = 0, len = this.length;
			if (typeof value === 'string' && value) {
				var cur = this[0];

				for(var i = 0; i < cur.length; i++) {
					classes = value.split(/\s/);
					var newClasses = value.split(/\s/);

					for (var i in newClasses)
						classes.push(newClasses[i]);

						cur[i].className = classes.join(' ');
				}
			}
		},

		removeClass: function(value) {

		}, 
		each: function() {
			
		}
	};

	Zamunda.fn.init.prototype = Zamunda.fn;

	window.Zamunda = window.$ = Zamunda;
})(window);
