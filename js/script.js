
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var $img = $('#background');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location='+ address + '';
    $img.attr('src', streetviewUrl);
    $img.attr('alt', 'address image');

    $.getJSON('http://api.nytimes.com/svc/search/v2/articlesearch.json?'+
                'fq=glocations("' + cityStr + '")&'+
                'api-key=87421a94f5a2872fee7af9e41e8049ef:6:73318691', function(data) {
        var items = [];
        $.each(data.response.docs, function(index, article) {
            var item = "<li id='article-" + index + "' class='article'>" +
            "<a href='"+ article.web_url +"'>"+ article.headline.main +"</a> <p>" +
            article.snippet + "</p></li>";
            items.push(item);
        });

        $nytElem.html(items.join(""));
    });

    return false;
};

$('#form-container').submit(loadData);

// loadData();
