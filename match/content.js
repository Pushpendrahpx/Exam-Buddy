/* LOCAL STORAGE KEYS 
    paperSet - 
    
*/
class Paper {
    constructor(QuestionPaperName, QuestionPaperDescription, Organisation, URL) {
        this.QuestionPaperName = QuestionPaperName;
        this.QuestionPaperDescription = QuestionPaperDescription;
        this.Organisation = Organisation;
        this.URL = URL;
        this.time = new Date().getTime();   
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
        console.log(Storage,!Storage)
        if (!Storage) {
            Storage = "[]";
            console.log("ER")
        }
        if (Storage) {
            console.log("ER")
            Storage = JSON.parse(Storage);
            Storage.push(this)
            localStorage.setItem("LOCAL_STORE", JSON.stringify(Storage));
        }
    }

    getFromLocalStorage = ()=>{
        let Storage = localStorage.getItem("LOCAL_STORE");
        return Storage;
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
    console.log("ENGLISH")
    let Storage = localStorage.getItem("LOCAL_STORE");
    chrome.runtime.sendMessage({
        msg: "FORMS_DETECTED",
        data: {
            formName: "Google Forms",
            Questions: QuestionPaper,
            Storage
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


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "Popu") {
            //  To do something
            console.log(request.data.subject)
            console.log(request.data.content)
        }
    }
);


//// CONTENT REQUESTS
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "STORE_REQUEST" ) {
          QuestionPaper.storeToLocalStorage();
       start();
           }
    }
  );

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "GET_TESTS" ) {
          console.log("RECIEVED GET REQUEST")
        //   QuestionPaper.storeToLocalStorage();
      
            let Storage = localStorage.getItem("LOCAL_STORE");
            chrome.runtime.sendMessage({
            msg: "FORMS_DETECTED",
            data: {
               formName: "Google Forms",
               Questions: QuestionPaper,
               Storage
           }
       });
       ;
           }
    }
  );
  chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        if( request.message === "STORE_THIS_STATE" ) {
            QuestionPaper.storeToLocalStorage();
            chrome.runtime.sendMessage({
                msg: "something_completed",
                data: {
                    subject: "Loading",
                    content: "Just completed!"
                }
            });
             }
      }
    );

  function start(){
      alert("started");
  }

// ------------------------------------------------------------------------------------------------------------------------------
// code for console is starting from here.