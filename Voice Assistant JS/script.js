const texts = document.querySelector(".texts");
const btn = document.querySelector(".microphone_btn");
const now_speaking = document.querySelector(".now_speak")

let text;
const apps = ["facebook","youtube","instagram","twitter", "gmail"]

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.interimResults = true;
recognition.continuous = true;
let recognizing = false;




recognition.onstart = () =>{
    recognizing = true;
}

btn.addEventListener("click",()=>{
    if(recognizing){
        recognition.stop()
        recognizing = false;
    }else{
        recognition.start()
    }
})


recognition.addEventListener("result",e => {
    text = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

    now_speaking.innerHTML = text;
    

})


recognition.onend = () =>{
    now_speaking.innerHTML = "";
    if(text.length > 0){
        const p = document.createElement("p")
        p.innerHTML = text;
        texts.append(p);
        text = "";
    }


    
    if(text.toLowerCase().includes("open")){
        const strSearch = text.replace("open","");
        window.open(`https://www.${strSearch.toLowerCase().trim()}.com/`)
        for(var i = 0;i < apps.length;i++){
            if(text.toLowerCase().includes(apps[i])){
                window.open(`https://www.${apps[i]}.com/`)
            }
        }
    }

    if(text.toLowerCase().includes("search")){
        const strSearch = text.replace("search","");
        
        if(strSearch.length > 0){
            window.open(`https://www.google.com/search?q=${strSearch}`)
        }
    }

    if(text.toLowerCase().includes("copy")){
        const strSearch = text.replace("copy","").trim();
        
        if(strSearch.length > 0){
            navigator.clipboard.writeText(strSearch)
        }
    }

    if(text.toLowerCase().includes("paste")){
        const pastTxt = navigator.clipboard.readText();
        console.log(pastTxt)
    }

}
const scrollHeight = texts.scrollHeight;
texts.scrollTop = scrollHeight;

