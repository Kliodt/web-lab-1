let x = null;
let y = null;
let r = null;
let lastTableRow = 1;

// validation 
function validateY() {
    if (y != null && y >= -3 && y <= 3) {
        document.getElementById("y-error-messages").innerText = "";
        return true;
    } else {
        document.getElementById("y-error-messages").innerText = "допустимые значения: -3...3";
        return false;
    }
}

function validateX() {
    if (x != null) {
        document.getElementById("x-error-messages").innerText = "";
        return true;
    } else {
        document.getElementById("x-error-messages").innerText = "выберите значение";
        return false;
    }
}

function validateR() {
    if (r != null) {
        document.getElementById("r-error-messages").innerText = "";
        return true;
    } else {
        document.getElementById("r-error-messages").innerText = "выберите значение";
        return false;
    }
}

// setting X Y R
function rClicked(value) {
    r = value;
    document.getElementById("rValue").innerHTML = value;
}

function setY() {
    y = document.getElementById("y-input").value;
}

function xClicked(value) {
    x = value;
    document.getElementById("xValue").innerHTML = value;
}

// reset
function resetForm() {
    x = null;
    y = null;
    r = null;
    document.getElementById("rValue").innerHTML = "???";
    document.getElementById("xValue").innerHTML = "???";
    document.getElementById("y-input").value = "";
    document.getElementById("x-error-messages").innerText = "";
    document.getElementById("y-error-messages").innerText = "";
    document.getElementById("r-error-messages").innerText = "";
}


// submit
function mySubmit() {
    //let y = document.getElementById("y-input").innerText;
    //validate all
    if (validateX() && validateY() && validateR()) {
        draw(x, y, r);
        $.ajax({
            method: "POST",
            url: "php/index.php",
            dataType: "json",
            data: {
                function: "check",
                x: x,
                y: y,
                r: r                            
            },
            success: function(json) {
                var answer = json.answer;
                var time = json.time;
                updateTable(answer, time);
            },
            error: function() {
                alert("ошибка выполнения функции")
            }
        });
    } 
}


function updateTable(answer, workingTime) {
    document.getElementById("table").innerHTML += `<tr><td>${lastTableRow++}</td><td>${answer}</td><td>${x}</td><td>${Number(y)}</td><td>${r}</td><td>${(new Date()).toLocaleTimeString()}</td><td>${workingTime}ms</td></tr>`;
}

function draw(x, y, r) {
    document.getElementById("point-on-graph").outerHTML = `<circle id="point-on-graph" cx="${100/r*x + 150}" cy="${150-(100/r*y)}" r="5" fill="black"/>`
}