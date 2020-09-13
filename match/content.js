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
            questionOptions,
            selectedOption:null
        })
    }

    storeToLocalStorage = function(updatedAnswer = null,position=null) {
        
        let Storage = localStorage.getItem("LOCAL_STORE");
        console.log(JSON.parse(Storage))
        // console.log(Storage,!Storage)
        if (!Storage) {
            Storage = "[]";
            console.log("ER")
        }
        if (Storage) {
            console.log("ER")
            Storage = JSON.parse(Storage);
            let isAlready = false;
            Storage.forEach((eachPaper,index)=>{
                if(eachPaper.QuestionPaperName == this.QuestionPaperName){
                    isAlready = true;
                    let lastSize = index+1;
                    Storage[lastSize-1].QuestionsPaper[position].selectedOption = updatedAnswer;
                    localStorage.setItem("LOCAL_STORE", JSON.stringify(Storage));
                    console.log("AFTER ALL RESULT ",Storage);
                }
            })
            if(!isAlready){
            let lastSize = Storage.push(this)
            Storage[lastSize-1].QuestionsPaper[position].selectedOption = updatedAnswer;
            localStorage.setItem("LOCAL_STORE", JSON.stringify(Storage));
            console.log("AFTER ALL RESULT ",Storage);
            }
        }
    }

    getFromLocalStorage = ()=>{
        let Storage = localStorage.getItem("LOCAL_STORE");
        return Storage;
    }

    selectOption = (questionWholeText,answerWholeText,imageWholeText = undefined)=>{
        let GotQuestion = false;
        console.log("ANSWER_WHOLE = "+answerWholeText)
        console.log(this.QuestionsPaper);
        this.QuestionsPaper.forEach((eachQuestion,index)=>{
            if(eachQuestion.questionText == questionWholeText){
                GotQuestion = true;
               console.log("Got the Question"+index) 
               // index - question No.
                this.QuestionsPaper[index].selectedOption = answerWholeText;
                // console.log()

                console.log(this,"%c Answer Saved"+answerWholeText,"{background:'teal',color:'white',fontSize:'32px'}")
                this.storeToLocalStorage(answerWholeText,index)
            }
        })

        
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

var setQuestionsFromStorage = ()=>{
    let Storage = localStorage.getItem("LOCAL_STORE");
    if(!!Storage){
        Storage = JSON.parse(Storage);
        console.log(Storage)
        let QuestionsPaper = Storage[0].QuestionsPaper;
        QuestionsPaper.forEach((eachQuestion,index)=>{
            let isGot = false;
          if(eachQuestion.selectedOption){
            //   console.log(eachQuestion.selectedOption)
            // This is the filled answers

                document.querySelectorAll(".freebirdFormviewerViewNumberedItemContainer").forEach((eachEle,index)=>{
                    if(!isGot){
                        eachEle.querySelectorAll(".docssharedWizToggleLabeledLabelText").forEach((eachOption,optionIndex)=>{
                            // console.log(eachOption.innerText)
                            if(eachQuestion.selectedOption == eachOption.innerText){
                                isGot = true;
                                console.log("GOT THIS ONE")
                                eachOption.click();
                            }
                        })
                    }

                })

          }
        })
        
    }   
}

var nowExecuteMain = () => {


        MakeQuestionPaper();
        console.log(QuestionPaper)
        setQuestionsFromStorage();


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
               Storage:Storage
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

document.querySelectorAll(".freebirdFormviewerViewNumberedItemContainer").forEach(eachContainer=>{
    eachContainer.addEventListener("click",(event)=>{
            // console.log()
                // console.log(event.path)
            if(event.path[0].innerText != "")
            {
                let QuestionEle = eachContainer.querySelector(".freebirdFormviewerComponentsQuestionBaseTitle");
            
                let QuestionText = (QuestionEle.childNodes[0].wholeText);
                console.log("Option Value = ",event.path[0].innerText);
                let OptionText = event.path[0].innerText;


                QuestionPaper.selectOption(QuestionText,OptionText);

            }
       
    })
})