'use strict';

var s = 'Hello';

function greet(name) {
	console.log(s + ', ' + name + '!');
	console.log(typeof(window));
}

module.exports = greet;