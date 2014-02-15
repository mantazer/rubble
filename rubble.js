// mantazer
// PennApps 2014
// 02/14/2014

// TO DO:

// Enter post via permalink
	// scrollable

// Return to list
	// where left off

simply.title('Rubble');

var reddit_url = 'http://www.reddit.com/r/worldnews/.json';

var title_array = new Array();
var author_array = new Array();

ajax({ url: reddit_url, type: 'json'}, function(data) {
	
	var json = data;
	var num_posts = json.data.children.length;

	// Populate lists of titles and authors
	for (var i = 0; i < num_posts; i++) {
		title_array.push(json.data.children[i].data.title);
		author_array.push(json.data.children[i].data.author);
	}

});

var count = parseInt(localStorage.getItem('count')) || 0;

simply.on('singleClick', function(e) {
	if (e.button === 'down') {
		count++;
		localStorage.setItem('count', count);
		simply.body(title_array[count]);
		simply.subtitle(author_array[count]);
	}
	else if (e.button === 'up') {
		count--;
		localStorage.setItem('count', count);
		simply.body(title_array[count]);
		simply.subtitle(author_array[count]);
	}
	else if (e.button === 'select') {

	}
	else if (e.button == 'back') {
		
	}
	
});
