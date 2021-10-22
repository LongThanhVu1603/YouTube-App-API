$(document).ready(function () {
    // key API lấy tại google api 
    var key = 'AIzaSyBD29rOtaLA8xEGXFcxEZJuheQqeFSzHO0';

    // key ID playlist trên youtube
    var playlistId = 'PLj6rDh5PuLmGBecF4T4VhoQR8pUe22Ta8';

    // http requests youtube api v3
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';


    var options = {
        part: 'snippet',
        key: key,
        maxResults: 50,
        playlistId: playlistId
    }

    // lấy ra video từ json
    loadVids();

    function loadVids() {
        $.getJSON(URL, options, function (data) {
            var id = data.items[0].snippet.resourceId.videoId;
            mainVid(id);
            resultsLoop(data);
        });
    }

    // thêm video vào html (id=#video)
    function mainVid(id) {
        $('#video').html(`
					<iframe src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
				`);
    }

	// tạo các video tiếp theo 
    function resultsLoop(data) {

        $.each(data.items, function (i, item) {

            var thumb = item.snippet.thumbnails.medium.url;
            var title = item.snippet.title;
            var desc = item.snippet.description.substring(0, 100);
            var vid = item.snippet.resourceId.videoId;

            // chèn các video vào trong html (main)
            $('main').append(`
							<article class="item" data-key="${vid}">

								<img src="${thumb}" alt="" class="thumb">
								<div class="details">
									<h4>${title}</h4>
									<p>${desc}</p>
								</div>

							</article>
						`);
        });
    }

	// click vào video con thì chuyển lên để phát
    $('main').on('click', 'article', function () {
        var id = $(this).attr('data-key');
        mainVid(id);
    });
});

// click vào logo tải lại trang
function load(){
    location.reload();
}