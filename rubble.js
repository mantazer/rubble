// mantazer
// PennApps 2014
// 02/14/2014

simply.title('Rubble');

var redditUrl = 'http://www.reddit.com/.json';

ajax({ url: redditUrl, type: 'json'}, function(json) {
	simply.subtitle(json.json.kind);
});

// var count = parseInt(localStorage.getItem('count')) || 0;

// simply.on('singleClick', function(e) {
// 	if (e.button === 'down') {
// 		simply.subtitle(++count);
// 	}
// 	else if (e.button === 'up') {
// 		simply.subtitle(--count);
// 	}
// 	localStorage.setItem('count', count);
// });

