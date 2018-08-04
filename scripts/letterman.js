$(document).ready(function() {
  //GET REQUEST FOR SEARCH INFO FROM YOUTUBE
function videoRequest(token) {
  $.get(
    //FIRST ARGUMENT: URL (WHAT WE ARE MAKING THE REQUEST TO)
     'https://www.googleapis.com/youtube/v3/search',{
    //SECOND ARGUMENT: DATA (SENT TO SERVER AS OBJECT OR A STRING)
     part: 'snippet, id',
     q: '+"Late Night" with +"David Letterman" -"late show" -podcast -appearances -compilation -banned -password -conan',
     videoDuration: 'long',
     maxResults: 48,
     pageToken: token,
     type: 'video',
     key: 'AIzaSyDNT41_uLgpgzt5mxB0SzG_M07EDfXy7BM'},
    //THIRD ARGUMENT: SUCCESS (FUNCTION THAT RUNS WHEN REQUEST IS SUCCESSFUL)
    function(data) {//data REFERS TO THE SECOND ARGUMENT (NAME OF PARAMETER)
      var nextPageToken = data.nextPageToken;
      var prevPageToken = data.prevPageToken;
      $('.results').html('');//CLEAR RESULTS DIV BEFORE CREATING VIDEOS

      //$.each ITERATES OVER ARRAY OR OBJECT, PERFORMS FUNCTION EACH ITERATION
      //FIRST ARGUMENT: ARRAY OR OBJECT TO ITERATE OVER
      //SECOND ARGUMENT: CALLBACK FUNCTION TO PERFORM WITH EACH ITERATION

      //i AND index ARE PARAMETERS FOR ARGUMENTS PASSED TO CALLBACK BY .each
      //i = INDEX IN ARRAY (ITEMS)
      //item = WHAT IS AT THAT INDEX (EACH ITEM IN TEMS ARRAY)
      $.each(data.items, function(i, item) {
        var output = getOutput(item);

        //DISPLAY RESULTS
        $('.results').append(output);
       });
       var buttons = getButtons(prevPageToken, nextPageToken);
       $('.buttons').append(buttons);
     }
  );
}

//WHEN NEXTPAGE BUTTON IS CLICKED:
//CLEAR RESULTS LISTING
//LOAD NEXT PAGE USING VIDEOREQUEST FUNCTION
function nextPage() {
  $('.results').html('');
  videoRequest($('#next-button').data('token'));
}

function prevPage() {
  $('.results').html('');
  videoRequest($('#prev-button').data('token'));
}


//BUILD HTML TO DISPLAY YOUTUBE VIDEOS AND INFO
//APPEND TO .BUTTONS DIV
function getOutput(item) {
  var videoId = item.id.videoId;
  var title = item.snippet.title;
  var thumb = item.snippet.thumbnails.medium.url;
  var link = "https://www.youtube.com/embed/" + item.id.videoId;

  var output = '<div class="videos"><a data-fancybox data-type="iframe"';
  output += 'data-src="' + link + '" href="javascript:;"><img src="' + thumb;
  output += '"></a><p>' + title + '</p></div>';
  return output;

}


//CREATE BUTTON HTML
function getButtons(prevPageToken, nextPageToken) {
  $('.buttons').html('');
  if(!prevPageToken) { //IF THERE ARE NOT PREV RESULTS TO DISPLAY
    var btnOutput = '<div class="button-container">';
        btnOutput += '<button id="next-button" class="paging-button"';
        btnOutput += 'data-token="' + nextPageToken + '" data-query="Late Night with David Letterman"';
        btnOutput += 'onClick="nextPage();">\></button></div>';
  } else {
    var btnOutput = '<div class="button-container">';
        btnOutput += '<button id="prev-button" class="paging-button"';
        btnOutput += 'data-token="' + prevPageToken + '" data-query="Late Night with David Letterman"';
        btnOutput += 'onClick="prevPage();"><\</button>';
        btnOutput += '<button id="next-button" class="paging-button"';
        btnOutput += 'data-token="' + nextPageToken + '" data-query="Late Night with David Letterman"';
        btnOutput += 'onClick="nextPage();">\></button></div>';
  }
  return btnOutput;
}

  videoRequest("");

})