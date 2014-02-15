// mantazer
// PennApps 2014
// 02/14/2014

simply.title('Rubble');

var count = parseInt(localStorage.getItem('count')) || 0;

$.getJSON( "http://www.reddit.com/.json", function(data) {
	$.each(data.data.children, function(i, item) {
		simply.subtitle(item.data.kind);
	});
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

