'use strict';

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
    var nytUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?'+
                'fq=glocations("' + cityStr + '")&'+
                'api-key=87421a94f5a2872fee7af9e41e8049ef:6:73318691';
    $nytHeaderElem.text('New York Times Articles about ' + cityStr);
    $.getJSON(nytUrl, function(data) {
        var items = [];
        $.each(data.response.docs, function(index, article) {
            var item = "<li id='article-" + index + "' class='article'>" +
                "<a href='"+ article.web_url +"'>"+ article.headline.main +"</a> <p>" +
                article.snippet + "</p></li>";
            items.push(item);
        })

        $nytElem.html(items.join(""));
    }).fail(function(e) {
        $nytHeaderElem.text('New York Time Articles could not be loaded');
    });

    var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' +
                cityStr + '&prop=revisions&rvprop=content&srlimit=5&format=json';
    $wikiElem.text('Relevant wikipedia Links');
    var wikiRequestTimeout = setTimeout(function() {
        $wikiElem.text('failed to get wikipedia resources');
    },8000);

    $.ajax(wikiUrl, {
        dataType: 'jsonp',
        headers: { 'Api-User-Agent': 'Joels Udacity Test Page/1.0' },
        success: function(data, textStatus, jqXHR) {
            var items = [];
            $.each(data.query.search, function(title, article) {
                var item = "<li id='article-" + article.title + "' class='article'>" +
                "<a href='https://en.wikipedia.org/wiki/"+ article.title +"'>"+ article.title +"</a></li>";
            items.push(item);
            });

            $wikiElem.html(items.join(""));
            clearTimeOut(wikiRequestTimeout);
        }
    });

    return false;
};

$('#form-container').submit(loadData);

// loadData();
