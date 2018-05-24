'use strict';

let fs = require('fs');
let read = () => {
	fs.readFile('testFile.txt', 'utf-8', (err, data) => {
		if (err) {
			console.log(err.message);
			fs.writeFile('testFile.txt', '123', (err, data) => {
				if (err) {
					console.log(err.message);
				}
			});
		} else {
			console.log(data);
		}
	});
	// fs.readFile('favicon.ico', 'utf-8', (err, data) => {
	// 	if (err) {
	// 		console.log(err.message);
	// 	} else {
	// 		console.log(data);
	// 	}
	// });
};


module.exports = read;