$(document).ready(function () {
    $(function () {
        $('#submit').click(function (event) {
            event.preventDefault();
            //var searchTerm = $('#query').val();
            onClientLoad();
        });
    });
});

// panggil otomatis saat JavaScript client library loaded.
function onClientLoad() {
    gapi.client.setApiKey('AIzaSyAONWmI1ccR67UvZTHxjyDILfrKuRgHiQc');
    gapi.client.load('youtube', 'v3', function () {
        search();
    });
}

function search() {
    // Pakai JavaScript client library untuk membuat search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q: $('#query').val(),
        maxResults: 25
    });
    // mengirim request ke server,
    request.execute(function (response) {
        $('#search-results').empty()
        var srchItems = response.result.items;
        $.each(srchItems, function (index, item) {
            vidTitle = item.snippet.title;
            vidId = item.id.videoId;
            vidThumburl = item.snippet.thumbnails.high.url;
            vidDesc = item.snippet.description;
            vidThumbimg = '<div class="gallery"><a href=https://www.youtube.com/watch?v=' + vidId + ' target="_blank"><img id="thumb" src="' + vidThumburl + '" alt="' + vidDesc + '" style="width:204px;height:128px"></a></div>';
            $('#search-results').append('<li><p>' + vidTitle + vidThumbimg + '</p></li>');
        });
    });
}
