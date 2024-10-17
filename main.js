const KEY = "9GWHAERTA7Y4GHHQHYY5AYT7L";

function retrieveData(location){
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("GET", "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + location + "?key=" + KEY);
    xhr.send();
    xhr.onload = function() {
        var response = xhr.response;
        if (xhr.status != 200) { 
            dispA.innerHTML = "XMLHttpRequest error: "+ xhr.status;
            return;
        }
        if (!response) {
            dispA.innerHTML = "Empty response";
            return;
        }
        if (response.errorCode>0) {
            console.log("Error detected. errorCode="+response.errorCode+", message="+response.message);
            return;
        }

        var rows = document.getElementById("disp_table").rows;
        for(let i = 1; i < rows.length; i++){
            let loc = rows.item(i).children.item(0).innerHTML;
            if(response.resolvedAddress.localeCompare(loc) == 0){
                return;
            }
        }
        addRow(response);
    };
};

function displayData(){
    retrieveData(document.getElementById("req_loc").value);
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