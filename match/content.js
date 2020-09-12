var regexExpression = /(\/)/g;

var nowExecuteMain = () => {

    console.log(window.document.body);
    eval(document.querySelectorAll("script")[3].innerHTML.toString());
    // console.log(document.querySelectorAll("script")[3].innerHTML.toString())
    console.log(FB_PUBLIC_LOAD_DATA_);
}

if (window.location.href.split(regexExpression)[6] == "forms") {
    // Means it is Google Forms
    setTimeout(nowExecuteMain, 500)
}