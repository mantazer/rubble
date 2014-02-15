// mantazer
// PennApps 2014
// 02/14/2014

simply.title('Rubble');

var count = parseInt(localStorage.getItem('count')) || 0;

simply.on('singleClick', function(e) {
	if (e.button === 'down') {
		++count;
	}
	else if (e.button === 'up') {
		--count;
	}
	localStorage.setItem('count', count);
});

simply.subtitle(count);