moment.tz.add("America/Phoenix|MST MDT MWT|70 60 60|01010202010|-261r0 1nX0 11B0 1nX0 SgN0 4Al1 Ap0 1db0 SWqX 1cL0|42e5");
$(document).ready(function(){
    $.ajax({
        method: "GET",
           url: "/api/event/all"
    })
    .done(function(response){
        console.log(response);
        // response.events -> array of events
        response.events.forEach((e, i) => { 
            var date = moment(response.events[i].date).tz("America/Phoenix").format("dddd, MMMM Do YYYY, h:mm:ss a");
            var title = response.events[i].name;
            var thumbnail = response.events[i].image;
            var desc = response.events[i].desc;
            console.log(date);
            $(".date").eq(i).html(date);
            $(".header").eq(i+1).html(title);
            $(".cardImage").eq(i).css({"background-image": "url("+thumbnail+")", "background-size": "cover"});
            $(".cardImage").eq(i).attr("src", thumbnail);
            $(".description").eq(i).html(desc.substring(0, 70)+ ((desc.length <=40)? "": "..."));
            // $("#dates").html(date);
            // $("#titles").html(title);
        }); 

    })
});
// $(".grid").onclick(fucntion(){

// });