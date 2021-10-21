
$(document).ready(function(){

    // id key API
    var key = 'AIzaSyBD29rOtaLA8xEGXFcxEZJuheQqeFSzHO0';

    // id playlist youtube 
    var playlistId = 'PLH_v4r_pvudV5ZrNx9HldKLICIjUSCRLb';

    // HTTP request 
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';

    // thông tin trong Data API YouTube
    var options = {
        part: 'snippet',
        key: key,
        maxResults: 20,
        playlistId: playlistId,
    }

    // lấy json của các video
    loadVids();

    function loadVids(){
        $.getJSON(URL, options, function(data){
            //lấy id của video từ json
            var id = data.items[0].snippet.resourceId.videoId;
            mainVid(id);
            resultsLoop(data);
        })
    }

    // chèn video vào html 
    function mainVid(id){
        $('#video').html(
            `
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            `
        );
    }
});