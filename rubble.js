// mantazer
// PennApps 2014
// 02/14/2014

simply.title('Rubble');

ajax({ url: 'http://www.reddit.com/'}, function(data){
	var title = data.data.children[0].data.title;
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

