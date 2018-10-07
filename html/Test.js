var testval = "haha";
var testval2= "ha";
moment.tz.add("America/Phoenix|MST MDT MWT|70 60 60|01010202010|-261r0 1nX0 11B0 1nX0 SgN0 4Al1 Ap0 1db0 SWqX 1cL0|42e5");
$(document).ready(function(){
   // $("button").click(function(){
        $.ajax({
            method: "GET",
            url: "/api/event/all"
        })
        .done(function(response){
            console.log(response);
            //response.events -> array of events
            
            var date = moment(response.events[0].date).tz("America/Phoenix").format("dddd, MMMM Do YYYY, h:mm:ss a");
            console.log(date);
            $("#testing").html(date);


        })
        
        /*
        $.ajax({url: "./demo_test.txt", success: function(result){
            $("#div1").html(result);
        }});
        */
  //  });
});