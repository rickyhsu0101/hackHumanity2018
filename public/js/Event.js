var register = function(){
  $.ajax({
    url: "/api/event/" + $("#dataId").attr("data-id") + "/register",
    data: {
      //populate with email and name
    },
    method: "POST"
  })
  .done(response=>{
    //update page with new count
  })
}
$(document).ready(function(){
  $()
  $.ajax({
    url: "/api/event/" + $("#dataId").attr("data-id"),
    method: "GET",
  })
  .done(response=>{
    //populate data field etc
  })
});
