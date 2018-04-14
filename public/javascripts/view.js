$("#main").submit(function(e) {
    e.preventDefault();
    var url = `/stream?${$("#main").serialize()}`;
    $(".output").html(`<p class="url"></p>`);
    // from https://stackoverflow.com/questions/3828104/how-to-get-request-url-in-a-jquery-get-ajax-request
    $.ajax({
      type: "GET",
      url: url,
      success: function(result) {
        if(result.flag) {
          $(".output").html(`<p class="url">${result.message}</p>`);
        }else {
          alert(result.message);
        }
      }
    });
});