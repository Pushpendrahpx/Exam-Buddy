/* LOCAL STORAGE KEYS 
    paperSet - 
    
*/
class Paper {
    constructor(QuestionPaperName, QuestionPaperDescription, Organisation, URL) {
        this.QuestionPaperName = QuestionPaperName;
        this.QuestionPaperDescription = QuestionPaperDescription;
        this.Organisation = Organisation;
        this.URL = URL;
    }
    QuestionsPaper = new Array();
    addQuestion = function(questionId, questionText, questionOptions) {
        this.QuestionsPaper.push({
            questionId,
            questionText,
            questionOptions
        })
    }

    storeToLocalStorage = function() {
        let Storage = localStorage.getItem("LOCAL_STORE");
        if (!!Storage) {
            Storage = new Array();
        }
        if (!Storage) {
            Storage = JSON.parse(Storage);
            Storage.push(this)
            localStorage.setItem("LOCAL_STORE", Storage);
        }
    }
}


// Below REGEX is to find on which URL to Execute internally, whether its MS Forms or Google Forms
/******************************************************************************************* */
var regexExpression = /(\/)/g;
var QuestionPaper = null;
var MakeQuestionPaper = () => {
    // console.log(window.document.body);


    eval(document.querySelectorAll("script")[3].innerHTML.toString());
    // console.log(document.querySelectorAll("script")[3].innerHTML.toString())
    // console.log();

    QuestionPaper = new Paper(FB_PUBLIC_LOAD_DATA_[1][8], FB_PUBLIC_LOAD_DATA_[1][0], FB_PUBLIC_LOAD_DATA_[12], window.location.href)

    FB_PUBLIC_LOAD_DATA_[1][1].forEach((question) => {
        // console.log(question)
        // let Temporary_Options = new Array()
        QuestionPaper.addQuestion(question[0], question[1], question[4]);
    })
    chrome.runtime.sendMessage({
        msg: "FORMS_DETECTED",
        data: {
            formName: "Google Forms",
            Questions: QuestionPaper
        }
    });

}


var nowExecuteMain = () => {


        MakeQuestionPaper();
        console.log(QuestionPaper)


    }
    /************************************************************************************************* */
if (window.location.href.split(regexExpression)[6] == "forms") {
    // Means it is Google Forms


    setTimeout(nowExecuteMain, 500)
}
document.body.addEventListener('click', () => {
    chrome.runtime.sendMessage({
        msg: "something_completed",
        data: {
            subject: "Loading",
            content: "Just completed!"
        }
    });
})
console.log(chrome)


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "Popu") {
            //  To do something
            console.log(request.data.subject)
            console.log(request.data.content)
        }
    }
);


// ------------------------------------------------------------------------------------------------------------------------------
// code for console is starting from here.
var k = document.createElement("div")
k.id = "container"

// to make div inside div 
var l = k.appendChild(document.createElement("div"));
l.id = "inputArea"

// for putting heading inside div with id= time
var h1 = k.appendChild(document.createElement("h1"));
h1.id = "time"
h1.appendChild(document.createTextNode("0:00"))