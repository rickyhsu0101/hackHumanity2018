$(document).ready(function(){
  $.ajax({
    url: "/api/event/" + $("#dataId").attr("data-id"),
    method: GET,
  })
  .done(response=>{
    
  })
});