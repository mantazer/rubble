// mantazer
// PennApps 2014
// 02/14/2014

simply.title('Rubble');

var reddit_url = 'http://www.reddit.com/r/worldnews/.json';

var title_array = new Array();
var author_array = new Array();
var url_array = new Array();
var first_paragraph_array = new Array();

// Gets post information
ajax({ url: reddit_url, type: 'json'}, function(data) {

	var json = data;
	var num_posts = json.data.children.length;

	// Populate lists of titles and authors
	for (var i = 0; i < num_posts; i++) {
		title_array.push(json.data.children[i].data.title);
		author_array.push(json.data.children[i].data.author);

		post_url = json.data.children[i].data.url;
		url_array.push(post_url);
			
	}
});

// Gets article content
for (var j = 0; j < url_array.length; j++) {
	ajax({ url: url_array[j] }, function (data) {
			var article = grabArticle(data);
			var par = article.getElementsByTagName("p")[1].innerText;
			first_paragraph_array[i] = par;
	});
}



var count = parseInt(localStorage.getItem('count')) || 0;

simply.on('singleClick', function(e) {
	if (e.button === 'down') {
			count++;
	}
	else if (e.button === 'up') {
			count--;
	}
	simply.body(title_array[count]);
	simply.subtitle(author_array[count]);
	localStorage.setItem('count', count);
});

function grabArticle(article) {
	fakeDoc = document.createElement('html');
	fakeDoc.innerHTML = article;
	test = fakeDoc;

	var allParagraphs = fakeDoc.getElementsByTagName("p");
	var topDivCount = 0;
	var topDiv = null;
	var topDivParas;
	
	var articleContent = document.createElement("DIV");
	var articleTitle = document.createElement("H1");
	var articleFooter = document.createElement("DIV");
	
	// Replace all doubled-up <BR> tags with <P> tags, and remove fonts.
	var pattern =  new RegExp ("<br/?>[ \r\n\s]*<br/?>", "g");
	console.log(fakeDoc.getElementsByTagName("body")[0]);
	fakeDoc.getElementsByTagName("body")[0].innerHTML = fakeDoc.getElementsByTagName("body")[0].innerHTML.replace(pattern, "</p><p>").replace(/<\/?font[^>]*>/g, '');
	
	// Grab the title from the <title> tag and inject it as the title.
	articleTitle.innerHTML = fakeDoc.getElementsByTagName("title")[0];
	articleContent.appendChild(articleTitle);
	
	// Study all the paragraphs and find the chunk that has the best score.
	// A score is determined by things like: Number of <p>'s, commas, special classes, etc.
	for (var j=0; j	< allParagraphs.length; j++) {
		parentNode = allParagraphs[j].parentNode;

		// Initialize readability data
		if(typeof parentNode.readability == 'undefined')
		{
			parentNode.readability = {"contentScore": 0};			

			// Look for a special classname
			if(parentNode.className.match(/(comment|meta|footer|footnote)/))
				parentNode.readability.contentScore -= 50;
			else if(parentNode.className.match(/((^|\\s)(post|hentry|entry[-]?(content|text|body)?|article[-]?(content|text|body)?)(\\s|$))/))
				parentNode.readability.contentScore += 25;

			// Look for a special ID
			if(parentNode.id.match(/(comment|meta|footer|footnote)/))
				parentNode.readability.contentScore -= 50;
			else if(parentNode.id.match(/^(post|hentry|entry[-]?(content|text|body)?|article[-]?(content|text|body)?)$/))
				parentNode.readability.contentScore += 25;
		}

		// Add a point for the paragraph found
		if(getInnerText(allParagraphs[j]).length > 10)
			parentNode.readability.contentScore++;

		// Add points for any commas within this paragraph
		parentNode.readability.contentScore += getCharCount(allParagraphs[j]);
	}

	// Assignment from index for performance. See http://www.peachpit.com/articles/article.aspx?p=31567&seqNum=5 
	for(nodeIndex = 0; (node = fakeDoc.getElementsByTagName('*')[nodeIndex]); nodeIndex++)
		if(typeof node.readability != 'undefined' && (topDiv == null || node.readability.contentScore > topDiv.readability.contentScore))
			topDiv = node;

	if(topDiv == null)
	{
	  topDiv = document.createElement('div');
	  topDiv.innerHTML = 'Sorry, readability was unable to parse this page for content. If you feel like it should have been able to, please <a href="http://code.google.com/p/arc90labs-readability/issues/entry">let us know by submitting an issue.</a>';
	}

	// Remove all style tags in head (not doing this on IE) :
	var styleTags = fakeDoc.getElementsByTagName("style");
	for (var j=0;j < styleTags.length; j++)
		if (navigator.appName != "Microsoft Internet Explorer")
			styleTags[j].textContent = "";

	topDiv = killDivs(topDiv);				// Goes in and removes DIV's that have more non <p> stuff than <p> stuff
	topDiv = killBreaks(topDiv);            // Removes any consecutive <br />'s into just one <br /> 

	// Cleans out junk from the topDiv just in case:
	topDiv = clean(topDiv, "form");
	topDiv = clean(topDiv, "object");
	topDiv = clean(topDiv, "table", 250);
	topDiv = clean(topDiv, "h1");
	topDiv = clean(topDiv, "h2");
	topDiv = clean(topDiv, "iframe");

	articleContent.appendChild(topDiv);
	articleContent.appendChild(articleFooter);
	
	return articleContent;
}

// Get the inner text of a node - cross browser compatibly.
function getInnerText(e) {
	if (navigator.appName == "Microsoft Internet Explorer")
		return e.innerText;
	else
		return e.textContent;
}

// Get character count
function getCharCount ( e,s ) {
    s = s || ",";
	return getInnerText(e).split(s).length;
}

function cleanStyles( e ) {
    e = e || document;
    var cur = e.firstChild;

	// If we had a bad node, there's not much we can do.
	if(!e)
		return;

	// Remove any root styles, if we're able.
	if(typeof e.removeAttribute == 'function')
		e.removeAttribute('style');

    // Go until there are no more child nodes
    while ( cur != null ) {
		if ( cur.nodeType == 1 ) {
			// Remove style attribute(s) :
			cur.removeAttribute("style");
			cleanStyles( cur );
		}
		cur = cur.nextSibling;
	}
}

function killDivs ( e ) {
	var divsList = e.getElementsByTagName( "div" );
	var curDivLength = divsList.length;
	
	// Gather counts for other typical elements embedded within.
	// Traverse backwards so we can remove nodes at the same time without effecting the traversal.
	for (var i=curDivLength-1; i >= 0; i--) {
		var p = divsList[i].getElementsByTagName("p").length;
		var img = divsList[i].getElementsByTagName("img").length;
		var li = divsList[i].getElementsByTagName("li").length;
		var a = divsList[i].getElementsByTagName("a").length;
		var embed = divsList[i].getElementsByTagName("embed").length;

	// If the number of commas is less than 10 (bad sign) ...
	if ( getCharCount(divsList[i]) < 10) {
			// And the number of non-paragraph elements is more than paragraphs 
			// or other ominous signs :
			if ( img > p || li > p || a > p || p == 0 || embed > 0) {
				divsList[i].parentNode.removeChild(divsList[i]);
			}
		}
	}
	return e;
}

function killBreaks ( e ) {
	e.innerHTML = e.innerHTML.replace(/(<br\s*\/?>(\s|&nbsp;?)*){1,}/g,'<br />');
	return e;
}

function clean(e, tags, minWords) {
	var targetList = e.getElementsByTagName( tags );
	minWords = minWords || 1000000;

	for (var y=0; y < targetList.length; y++) {
		// If the text content isn't laden with words, remove the child:
		if (getCharCount(targetList[y], " ") < minWords) {
			targetList[y].parentNode.removeChild(targetList[y]);
		}
	}
	return e;
}

function emailBox() {
    var emailContainer = document.getElementById('email-container');
    if(null != emailContainer)
    {
        return;
    }

    var emailContainer = document.createElement('div');
    emailContainer.setAttribute('id', 'email-container');
    emailContainer.innerHTML = '<iframe src="'+emailSrc + '?pageUrl='+escape(window.location)+'&pageTitle='+escape(document.title)+'" scrolling="no" onload="removeFrame()" style="width:500px; height: 490px; border: 0;"></iframe>';

    document.body.appendChild(emailContainer);
}

function removeFrame()
{
    ++iframeLoads;
    if(iframeLoads >= 6)
    {
        var emailContainer = document.getElementById('email-container');
        if(null != emailContainer) {
            emailContainer.parentNode.removeChild(emailContainer);
        }
        // reset the count
        iframeLoads = 0;
    }
}

