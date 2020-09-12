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
    function(request, sender, sendResponse) {
        if (request.msg === "something_completed") {
            //  To do something
            console.log(request.data.subject)
            console.log(request.data.content)
        }
    }
);