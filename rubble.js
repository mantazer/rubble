// mantazer
// PennApps 2014
// 02/14/2014

simply.title('Rubble');

var reddit_url = 'http://www.reddit.com/.json';

var post_array = new Array(); 

ajax({ url: reddit_url, type: 'json'}, function(json) {
	
	var post_array_length = Object.keys(json.data.children.length);

	simply.body(post_array_length);

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

