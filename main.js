const KEY = "9GWHAERTA7Y4GHHQHYY5AYT7L";

function retrieveData(location){
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("GET", "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + location + "?key=" + KEY);
    xhr.send();
    xhr.onload = function() {
        if (xhr.status != 200) { 
            dispA.innerHTML = "XMLHttpRequest error: "+ xhr.status;
            return;
        }
        if (!response) {
            dispA.innerHTML = "Empty response";
            return;
        }
        
        if (response.errorCode>0) {
            dispA.innerHTML = "Error detected. errorCode="+response.errorCode+", message="+response.message;
            return;
        }
        var dispA = document.getElementById("display_data");
        dispA.innerHTML = JSON.stringify(xhr.response);
        return JSON.stringify(xhr.response);
    };
    // var dispA = document.getElementById("display_data");
    // dispA.innerHTML = JSON.stringify(xhr.response);
    // return xhr.response;
};

function displayData(){
    var data = retrieveData(document.getElementById("req_loc").value);
    //var dispA = document.getElementById("display_data");
    //dispA.innerHTML = JSON.stringify(data);
}
