// mantazer
// PennApps 2014
// 02/14/2014

simply.title('Rubble');

// var count = parseInt(localStorage.getItem('count')) || 0;

ajax({ url: 'http://www.reddit.com/.json '}, function(data) {
	
	$.getJSON(url), function(json) {
		var data = JSON.parse(json);
	}


	//var data = JSON.parse(url);
	// simply.body(data.children[0].data.title);
});

// simply.on('singleClick', function(e) {
// 	if (e.button === 'down') {
// 		simply.subtitle(++count);
// 	}
// 	else if (e.button === 'up') {
// 		simply.subtitle(--count);
// 	}
// 	localStorage.setItem('count', count);
// });

