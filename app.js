(function() {
	var app = {};

	function init() {
		app.settings = {
			lockFirstChar: true,
		};
		app.charInput = document.getElementById('chars');
		app.output = document.getElementById('output');
		app.maxLengthInput = document.getElementById('length');
		let generateButton = document.getElementById('generate');
		if( generateButton ) {
			generateButton.addEventListener('click', generate);
		}
		let clearButton = document.getElementById('clear');
		if( clearButton ) {
			clearButton.addEventListener('click', clearOutput);
		}
		viewInit();
		document.addEventListener('submit', function (e) {
			e.preventDefault();
			generate();
		});
	}

	function viewInit() {
		document.addEventListener('click', function(e) {
			if( e.target.tagName == 'LI' ) {
				let viewEl = document.createElement('div');
				viewEl.classList.add('zoom');
				viewEl.textContent = e.target.textContent;
				document.body.appendChild(viewEl);
				viewEl.classList.add('on');

				document.addEventListener('click', function(e) {
					viewEl.classList.remove('on');
					setTimeout( function () {
						viewEl.remove();
					}, 700);
				});
			}
		});
	}

	function setChars() {
		 let chars = app.charInput.value;
		 if( chars ) {
			 app.chars = chars;
		 }
	}

	function clearOutput() {
		app.output.innerHTML='';
	}

	function generate() {
		setChars();
		let names = permutations();
		let list = document.createElement('ol');
		app.maxLength = app.maxLengthInput.value;
		for (let i=0; i<names.length; i++) {
			let o = document.createElement('li');
			o.textContent = names[i];
			list.appendChild(o);
		}
		app.output.appendChild(list);
	}

	function permutations(string) {
		if( ! string ) {
			string = app.chars;
		}
		if( ! string || typeof string !== 'string' ) {
			return 'Not a string.';
		} else if(string.length < 2) {
			return string;
		} else if(string.length > app.maxLength) {
			return string;
		}
		let permutationsArray = [];
		for( let i=0; i<string.length; i++ ) {
			let char = string[i];
			if (string.indexOf(char) != i) {
				continue;
			}
			let remainingChars = string.slice(0, i) + string.slice(i + 1, string.length);

			for( let permutation of permutations(remainingChars) ) {
				// if( permutation.length < app.maxLength ) {
					permutationsArray.push(char + permutation);
				// }
			}
		}
		return permutationsArray;
	}

	init();
})();
