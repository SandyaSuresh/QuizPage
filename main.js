const KEY = "9GWHAERTA7Y4GHHQHYY5AYT7L";

function retrieveData(location){
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("GET", "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + location + "?key=" + KEY);
    xhr.send();
    xhr.onload = function() {
        var response = xhr.response;
        var dispA = document.getElementById("display_data");
        //dispA.innerHTML = dispA.innerHTML + " 1";
        if (xhr.status != 200) { 
            dispA.innerHTML = "XMLHttpRequest error: "+ xhr.status;
            return;
        }
        //dispA.innerHTML = dispA.innerHTML + " 2";
        if (!response) {
            dispA.innerHTML = "Empty response";
            return;
        }
        //dispA.innerHTML = dispA.innerHTML + " 4";
        if (response.errorCode>0) {
            dispA.innerHTML = "Error detected. errorCode="+response.errorCode+", message="+response.message;
            return;
        }

        //dispA.innerHTML = dispA.innerHTML + " 4";
        var rows = document.getElementById("disp_table").rows;
        dispA.innerHTML = dispA.innerHTML + rows.length;
        for(let i = 1; i < rows.length; i++){
            let loc = rows.item(i).children.item(0).innerHTML;
            if(response.resolvedAddress.localeCompare(loc) == 0){
                return;
            }
        }
        addRow(response);
    };
    // return xhr.response;
};

function displayData(){
    //addRow();
    retrieveData(document.getElementById("req_loc").value);
    //var dispA = document.getElementById("display_data");
    //dispA.innerHTML = JSON.stringify(data);
}

function addRow(response){
    var table = document.getElementById("disp_table");
    let newRow = table.insertRow();

    let locCell = newRow.insertCell();
    let locText = document.createTextNode(response.resolvedAddress);
    locCell.appendChild(locText);
    
    let maxCell = newRow.insertCell();
    let maxText = document.createTextNode(response.days[0].tempmax);
    maxCell.appendChild(maxText);
    
    let minCell = newRow.insertCell();
    let minText = document.createTextNode(response.days[0].tempmin);
    minCell.appendChild(minText);

    let humCell = newRow.insertCell();
    let humText = document.createTextNode(response.days[0].humidity + "%");
    humCell.appendChild(humText);
    
    let condCell = newRow.insertCell();
    let condText = document.createTextNode(response.days[0].conditions);
    condCell.appendChild(condText);
}