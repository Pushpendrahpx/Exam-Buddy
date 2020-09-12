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