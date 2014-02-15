// mantazer
// PennApps 2014
// 02/14/2014

simply.title('Rubble');

var reddit_url = 'http://www.reddit.com/.json';

var post_array = new Array(); 

ajax({ url: reddit_url, type: 'json'}, function(data) {
	
	var json = data;
	var num_posts = json.data.children.length;

	//for (var i = 0; i < num_posts; i++) {
		post_array.push(json.data.children[4].data.score);
		simply.body(post_array[0]);
	//}




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

