var target = document.getElementById("json_content");
var xhr = new XMLHttpRequest();
xhr.open('GET', 'data_subset.json', true);
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var json = JSON.parse(xhr.responseText);
    for (var key in json) {
      if (json.hasOwnProperty(key)) {
        target.innerHTML += "<div class='row'>";
        target.innerHTML += "<div class='col-lg-12'><h3>Table name:<strong>" + key + "</strong></h3>";
        for (var i = 0; i < json[key].Fields.length; i++) {
          var fieldName = json[key].Fields[i].FieldName;
          var caption = json[key].Fields[i].Caption;

          var btnLooksGoodParams = key + "|" + fieldName + "|" + caption + "|LooksGood";
          var btnNotNeededParams = key + "|" + fieldName + "|" + caption + "|NotNeeded";
          var btnCommentParams = key + "|" + fieldName + "|" + caption + "|Comment";
          var inputCommentId = key + "_" + fieldName;
          target.innerHTML += "<div class='row'>";
          target.innerHTML += "<div class='col-lg-3'>Field Name: <strong>" + fieldName + "</strong></div>"; 
          target.innerHTML += "<div class='col-lg-3'>Caption: <strong>" + caption + "</strong></div>";
          target.innerHTML += "<div class='col-lg-1'><button type='button' class='btn btn-primary btn-sm' onclick='submitFeedback(\"" + btnLooksGoodParams + "\");'>Looks good</button></div>";
          target.innerHTML += "<div class='col-lg-1'><button type='button' class='btn btn-danger btn-sm' onclick='submitFeedback(\"" + btnNotNeededParams + "\");'>Not needed</button></div>";
          target.innerHTML += "<div class='col-lg-3'><input id='" + inputCommentId + "' placeholder='comment' type='text' class='form-control'></div>";
          target.innerHTML += "<div class='col-lg-1'><button type='button' class='btn btn-warning btn-sm' onclick='submitFeedback(\"" + btnCommentParams + "\");'>Submit comment</button></div>";          
          target.innerHTML += "</div>";
        }
        target.innerHTML += "</div></div>";
      }
    }

  }
}
xhr.send();


function submitFeedback(params) {
  var paramArray = params.split('|');
  var tableName = paramArray[0];
  var fieldName = paramArray[1];
  var caption = paramArray[2];
  var btnClicked = paramArray[3];

  var comment = document.getElementById(tableName + "_" + fieldName);
  console.log("Comment:" + comment.value);
  console.log("Parameters: " + tableName + ", " + fieldName + ", " + caption + ", " + btnClicked);

}