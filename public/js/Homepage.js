moment.tz.add("America/Phoenix|MST MDT MWT|70 60 60|01010202010|-261r0 1nX0 11B0 1nX0 SgN0 4Al1 Ap0 1db0 SWqX 1cL0|42e5");
$(document).ready(function () {
  $("html, body").scrollTop(0);
  var load = false;
  $("#home").on("click", function(){
    $("html, body").animate({scrollTop: 0}, 1000);
  });
  $(document).on("scroll", function(){
  //console.log($("#featured").offset().top, $(document).scrollTop());
    if(!load && $(document).scrollTop()+$(window).height()>=$("#featured").offset().top){
      load = true;
      $.ajax({
      method: "GET",
      url: "/api/event/all"
    })
    .done(function (response) {
      console.log(response);
      // response.events -> array of events
      response.events.forEach((e, i) => {
        var date = moment(response.events[i].date).tz("America/Phoenix").format("dddd, MMMM Do YYYY, h:mm:ss a");
        var title = response.events[i].name;
        var thumbnail = response.events[i].image;
        var desc = response.events[i].desc;
        var id = e._id;
        console.log(date);
        $(".date").eq(i).html(date);
        $(".header").eq(i + 1).html(title);
        $(".cardImage").eq(i).css({
          "background-image": "url(" + thumbnail + ")",
          "background-size": "cover"
        });
        $(".cardImage").eq(i).attr("data_id", id);
        //$(".cardImage").eq(i).attr("src", thumbnail);
        $(".description").eq(i).html(desc.substring(0, 70) + ((desc.length <= 40) ? "" : "..."));
        // $("#dates").html(date);
        // $("#titles").html(title);
      });

    })
    }
  })
  
});

$(document).on("click", "#new", function(){
  
  $("html, body").animate({ scrollTop: $("#movementsTitle").offset().top }, 1000);

})
$(document).on("click", "#return, .discover", function(){
  $("html, body").animate({ scrollTop: $("#featured").offset().top -100}, 1000);
})

$(document).on("click", ".discover", function(){
  const selectedSize=$(".overlay.selected").length;
  if(selectedSize!=0){
    var dataTags = [];
    $(".overlay.selected").each(function(i){
      dataTags.push($(this).attr("data-tag"));
    });
    console.log(dataTags);
    $.ajax({
      url: "/api/event/filter",
      data: {
        tags: dataTags
      },
      method: "POST"
    })
    .done(response=>{
       response.events.forEach((e, i) => {
         var date = moment(response.events[i].date).tz("America/Phoenix").format("dddd, MMMM Do YYYY, h:mm:ss a");
         var title = response.events[i].name;
         var thumbnail = response.events[i].image;
         var desc = response.events[i].desc;
         var id = e._id;
         console.log(date);
         $(".date").eq(i).html(date);
         $(".header").eq(i + 1).html(title);
         $(".cardImage").eq(i).css({
           "background-image": "url(" + thumbnail + ")",
           "background-size": "cover"
         });
         $(".cardImage").eq(i).attr("data_id", id);
         //$(".cardImage").eq(i).attr("src", thumbnail);
         $(".description").eq(i).html(desc.substring(0, 70) + ((desc.length <= 40) ? "" : "..."));
         // $("#dates").html(date);
         // $("#titles").html(title);
       });

    })
  }

  
  $("html, body").animate({ scrollTop: $("#featured").offset().top -100}, 1000);
})

$(document).on("click", ".cardImage", function(){
  window.location.href = "/event/" + $(this).attr("data_id");
});
// $(".grid").onclick(fucntion(){

// });