var testval = "haha";
var testval2= "ha";

$(document).ready(function(){
    $("button").click(function(){
        $.ajax({url: "./demo_test.txt", success: function(result){
            $("#div1").html(result);
        }});
    });
});