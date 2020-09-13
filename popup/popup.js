// var timer = 
var start_time, end_time, difference = 0;

var mystart = document.getElementById("mystart");
var mystop = document.getElementById("mystop");


var Handle;
var display = document.getElementById("display");
display.innerHTML = "Timer will come here";
var repeat = () => {
    var now = new Date();
    now = now.getTime();
    now = now - start_time;
    display.innerHTML = now / 1000 + " seconds ";
}
console.log("SD")

function myStart() {
    console.log("SD")
    start_time = new Date;
    start_time = start_time.getTime();

    Handle = setInterval(repeat, 1000);
}

function myStop() {
    console.log("Stopped")
    clearInterval(Handle);
    end_time = 0;
    difference = 0;
    start_time = 0;
    display.innerHTML = "Timer Stopped";
}

mystart.addEventListener("click", () => {
    myStart();
})
mystop.addEventListener("click", () => {
    myStop();
})

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.msg === "something_completed") {
            //  To do something
            console.log(request.data.subject)
            console.log(request.data.content)
        }
    }
);

document.body.addEventListener("click", () => {
    chrome.runtime.sendMessage({
        msg: "something_completed",
        data: {
            subject: "Loading",
            content: "Just completed!"
        }
    });
})
console.log(chrome)


// --------------------------------------------------------------------------------------------------------------

// js for buttons and input
var startButton = document.createElement("button");
var inputMinutes = document.createElement("input");
startButton.appendChild(document.createTextNode("Click Me!"));
document.body.appendChild(startButton);
document.body.appendChild(inputMinutes);
startButton.style.position = "absolute"
inputMinutes.style.position = "absolute"
inputMinutes.style.top = "0px"
inputMinutes.style.left = "76px"
startButton.style.top = "0px"
startButton.setAttribute("value", "Start Countdown");
inputMinutes.setAttribute("type", "text");
inputMinutes.setAttribute("id","minutes");

// html part 
var a= document.createElement("div")
a.innerHTML = "<div id='container'><div id='inputArea'></div><h1 id='time'>0:00</h1></div>"
document.body.appendChild(a)
a.style.position = "absolute"
a.style.top = "46px"
a.style.left = "46px"


// code for just testing purpose
let button = document.querySelector("button");
button.addEventListener("click", () => {
    console.log("Button clicked.");
    var z = document.createElement('p'); // is a node
    z.style.position = "absolute";
    z.style.top = "56px";
    z.innerHTML = 'coming here now';
    document.body.appendChild(z);
});