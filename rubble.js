// mantazer
// PennApps 2014
// 02/14/2014


simply.title('Rubble');

var reddit_url = 'http://www.reddit.com/r/worldnews/.json';

var title_array = new Array();
var author_array = new Array();
var url_array = new Array();

ajax({ url: reddit_url, type: 'json'}, function(data) {

	var json = data;
	var num_posts = json.data.children.length;

	// Populate lists of titles and authors
	for (var i = 0; i < num_posts; i++) {
		title_array.push(json.data.children[i].data.title);
		author_array.push(json.data.children[i].data.author);
		url_array.push(json.data.children[i].data.author);
	}

});

var count = parseInt(localStorage.getItem('count')) || 0;

simply.on('singleClick', function(e) {

	if (e.button === 'select') {

			// get content
			simply.body("User entered")
		}
		else if (e.button === 'back') {
			simply.body("User returned")
		}
		else if (e.button === 'down') {
			if (count < num_posts) {
				count++;
				simply.body(title_array[count]);
				simply.subtitle(author_array[count]);
			}
		}
		else if (e.button === 'up') {
			if (count > 0) {
				count--;
				simply.body(title_array[count]);
				simply.subtitle(author_array[count]);
			}
		}

		localStorage.setItem('count', count);

});

// function grabArticle() {
// 	var allParagraphs = document.getElementsByTagName("p");
// 	var topDivCount = 0;
// 	var topDiv = null;
// 	var topDivParas;
	
// 	var articleContent = document.createElement("DIV");
// 	var articleTitle = document.createElement("H1");
// 	var articleFooter = document.createElement("DIV");
	
// 	// Replace all doubled-up <BR> tags with <P> tags, and remove fonts.
// 	var pattern =  new RegExp ("<br/?>[ \r\n\s]*<br/?>", "g");
// 	document.body.innerHTML = document.body.innerHTML.replace(pattern, "</p><p>").replace(/<\/?font[^>]*>/g, '');
	
// 	// Grab the title from the <title> tag and inject it as the title.
// 	articleTitle.innerHTML = document.title;
// 	articleContent.appendChild(articleTitle);
	
// 	// Study all the paragraphs and find the chunk that has the best score.
// 	// A score is determined by things like: Number of <p>'s, commas, special classes, etc.
// 	for (var j=0; j	< allParagraphs.length; j++) {
// 		parentNode = allParagraphs[j].parentNode;

// 		// Initialize readability data
// 		if(typeof parentNode.readability == 'undefined')
// 		{
// 			parentNode.readability = {"contentScore": 0};			

// 			// Look for a special classname
// 			if(parentNode.className.match(/(comment|meta|footer|footnote)/))
// 				parentNode.readability.contentScore -= 50;
// 			else if(parentNode.className.match(/((^|\\s)(post|hentry|entry[-]?(content|text|body)?|article[-]?(content|text|body)?)(\\s|$))/))
// 				parentNode.readability.contentScore += 25;

// 			// Look for a special ID
// 			if(parentNode.id.match(/(comment|meta|footer|footnote)/))
// 				parentNode.readability.contentScore -= 50;
// 			else if(parentNode.id.match(/^(post|hentry|entry[-]?(content|text|body)?|article[-]?(content|text|body)?)$/))
// 				parentNode.readability.contentScore += 25;
// 		}

// 		// Add a point for the paragraph found
// 		if(getInnerText(allParagraphs[j]).length > 10)
// 			parentNode.readability.contentScore++;

// 		// Add points for any commas within this paragraph
// 		parentNode.readability.contentScore += getCharCount(allParagraphs[j]);
// 	}

// 	// Assignment from index for performance. See http://www.peachpit.com/articles/article.aspx?p=31567&seqNum=5 
// 	for(nodeIndex = 0; (node = document.getElementsByTagName('*')[nodeIndex]); nodeIndex++)
// 		if(typeof node.readability != 'undefined' && (topDiv == null || node.readability.contentScore > topDiv.readability.contentScore))
// 			topDiv = node;

// 	if(topDiv == null)
// 	{
// 	  topDiv = document.createElement('div');
// 	  topDiv.innerHTML = 'Sorry, readability was unable to parse this page for content. If you feel like it should have been able to, please <a href="http://code.google.com/p/arc90labs-readability/issues/entry">let us know by submitting an issue.</a>';
// 	}
	
// 	// REMOVES ALL STYLESHEETS ...
// 	for (var k=0;k < document.styleSheets.length; k++) {
// 		if (document.styleSheets[k].href != null && document.styleSheets[k].href.lastIndexOf("readability") == -1) {
// 			document.styleSheets[k].disabled = true;
// 		}
// 	}

// 	// Remove all style tags in head (not doing this on IE) :
// 	var styleTags = document.getElementsByTagName("style");
// 	for (var j=0;j < styleTags.length; j++)
// 		if (navigator.appName != "Microsoft Internet Explorer")
// 			styleTags[j].textContent = "";

// 	cleanStyles(topDiv);					// Removes all style attributes
// 	topDiv = killDivs(topDiv);				// Goes in and removes DIV's that have more non <p> stuff than <p> stuff
// 	topDiv = killBreaks(topDiv);            // Removes any consecutive <br />'s into just one <br /> 

// 	// Cleans out junk from the topDiv just in case:
// 	topDiv = clean(topDiv, "form");
// 	topDiv = clean(topDiv, "object");
// 	topDiv = clean(topDiv, "table", 250);
// 	topDiv = clean(topDiv, "h1");
// 	topDiv = clean(topDiv, "h2");
// 	topDiv = clean(topDiv, "iframe");
	

// 	// Add the footer and contents:
// 	articleFooter.id = "readFooter";
// 	articleFooter.innerHTML = "\
// 		<a href='http://www.arc90.com'><img src='http://lab.arc90.com/experiments/readability/images/footer.png'></a>\
//                 <div class='footer-right' >\
//                         <span class='version'>Readability version " + readabilityVersion + "</span>\
// 		</div>\
// 	";

// 	articleContent.appendChild(topDiv);
// 	articleContent.appendChild(articleFooter);
	
// 	return articleContent;
// }
