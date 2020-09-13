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
window.rt = chrome;
console.log(chrome);
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "something_completed") {
            //  To do something
            console.log(request.data.subject)
            console.log(request.data.content)
        }
    }
);

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.msg === "FORMS_DETECTED") {
        
        let Current_Test_Name = document.getElementById('Current_Test_Name');
        Current_Test_Name.style.display = "block";
        let Title = document.getElementById("Form_Name");
        Title.innerText = req.data.Questions.QuestionPaperName;
        console.log("Google Forms Detected")
        console.log(req)
        let Old_Results= document.getElementById('Old_Results');
        Old_Results.innerHTML = ""
        let Storage = JSON.parse(req.data.Storage);
        // Storage.
        console.log(Storage)
        if(Storage){
            Storage.forEach((element,index) => {
                Old_Results.innerHTML = Old_Results.innerHTML + `<tr>
                    <td>`+(index+1)+`</td> <td>`+element.QuestionPaperName+`</td>
                    <td>`+ element.Organisation +`</td><td>
                        <button class='button is-info'>&#10003;</button><button class='button is-danger'>&times;</button>
                    </td>
                </tr>`
            });
        }
    }
})
// console.log(localStorage.getItem("LOCAL_STORE"))
function popup() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "GET_TESTS"});
   });
}

document.addEventListener("DOMContentLoaded", function() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "GET_TESTS"});
       });
  document.getElementById("button1").addEventListener("click", popup);
  document.getElementById("button2").addEventListener("click",()=>{
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "STORE_THIS_STATE"});
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {"message": "GET_TESTS"});
           });
       });
  })
});