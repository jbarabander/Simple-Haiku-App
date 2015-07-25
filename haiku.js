var fs = require('fs');

fs.readFile('cmudict.txt', function(err, data){
	if(err){
		return console.log(err);
	}
	var lines = data.toString().split('\n');
	var arr = [];
	lines.forEach(function(line){
		var line_split = line.split('  ');
		var wordObj = {};
		var word = line_split[0];
		wordObj.word = word;
		var phonemeArr = line_split[1].split(' ');
		var syllableCount = 0;
		phonemeArr.forEach(function(syllable){
			if (syllable.search(/\d/) !== -1){
				syllableCount++;
			}
		});
		wordObj.syllableCount = syllableCount;
		arr.push(wordObj);
	})

	var lineGenerator = function(totalSyllables){
		var chosenSylNum = Math.floor(Math.random() * (totalSyllables - 1) + 1);
		var choiceOptions = arr.filter(function(el){return el.syllableCount === chosenSylNum;});
		var chosenWord = choiceOptions[Math.floor(Math.random() * choiceOptions.length)].word;
		if(totalSyllables - chosenSylNum === 0){
			return chosenWord;
		}
		else {
			return chosenWord + ' ' + lineGenerator(totalSyllables - chosenSylNum);
		}
	}

	console.log(lineGenerator(5) + ',\n' + lineGenerator(7) + ',\n' + lineGenerator(5));

	// var syl5Arr = arr.filter(function(el){return el.syllableCount === 5;});
	// var syl7Arr = arr.filter(function(el){return el.syllableCount === 7;});
	// var line1 = syl5Arr[Math.floor(Math.random() * syl5Arr.length)].word;
	// var line2 = syl7Arr[Math.floor(Math.random() * syl7Arr.length)].word;
	// var line3 = syl5Arr[Math.floor(Math.random() * syl5Arr.length)].word;
	// console.log(line1 + ',\n' + line2 + ',\n' + line3);
})