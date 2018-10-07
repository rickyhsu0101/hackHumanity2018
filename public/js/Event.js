
$(document).ready(function(){
     var title = "PRIDE Night";
    document.getElementById("h1").innerHTML = title;

    var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("btn1");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
    //var image = "images/alex-radelich-462768-unsplash.jpg";
    //document.getElementById("i1").innerhtml = image;
  $.ajax({
    url: "/api/event/" + $("#dataId").attr("data-id"),
    method: "GET",
  })
  .done(response=>{
    $("#h1").html(response.event.name);
    $("#i1").attr("src", response.event.image);
    var date = moment(response.event.date).tz("America/Phoenix").format("dddd, MMMM Do YYYY, h:mm:ss a");
    $("#t1").html(date);
    $("#p1").html(response.event.desc);
    $("#tags").html("<button class = 'circular ui icon button'>"+ response.event.tag+"</button>");
            $("#c1").html(response.event.participants.length);
  })
});
$(document).on("click", "#s1", function(){
    $("#myModal").css({display: "none"});
    $.ajax({
        url: "/api/event/" + $("#dataId").attr("data-id") + "/register",
        data: {
          name: $("#firstName").val() +" "+ $("#lastName").val(),
          email: $("#email").val()
        },
        method: "POST"
      })
      .done(response => {
        $("#c1").html(response.event.participants.length);
      });
 
});