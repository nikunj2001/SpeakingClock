const timeEl = document.querySelector('time');
const speakBtn =  document.querySelector('button')
const audioEl =  document.querySelector("audio")
let date,min,ampm,hr;
const updateTime = ()=>{
    date = new Date();
    min = date.getMinutes() ;
    min = date.getMinutes() ;
    const hr24 = date.getHours();
    hr = hr24 % 12 || 12;
    ampm = hr24 < 12 || hr24 ==24 ? "AM" :"PM";
    const timeStr = `${hr}:${min < 10 ? 0 :''}${min} ${ampm}` ;
    timeEl.innerHTML = timeStr
    console.log(timeStr)
}
setTimeout(()=>{
    updateTime()
    setInterval(() => {
        
        updateTime()
    }, 60*1000);
},(60 - new Date().getSeconds())*1000)

updateTime()


const speakTime= ()=>{
    let isFinishedSpeaking = false, isOsaid = false,isMin10Said =false ,isHourSaid = false,isMinBelow20Said = false;
let isEventAdded = false;

    const addSrc=(num)=>{
        audioEl.src = `./numbers/${num}.mp3`
        const isPlayed= audioEl.play()
    }
    const audioEnd = ()=>{
        if(isFinishedSpeaking){
            return;
        }
        if(!isHourSaid){
            addSrc(hr)
            isHourSaid =true;
            return
        }
        if(min==0){
            addSrc(ampm)
            isFinishedSpeaking=true
            return;
        }
        if(min<10 & !isOsaid){
            addSrc('o')
            isFinishedSpeaking=true
            return
        }
        if(min < 20 && !isMinBelow20Said ){
            addSrc(min);
            isMinBelow20Said =true;
            return
        };
        if(min <20 && !isMinBelow20Said){
        addSrc(ampm);
        isFinishedSpeaking=true;
    }

    if(!isEventAdded){

        audioEl.addEventListener('ended',audioEnd)
        isEventAdded = true
    }
    if(min>20 && !isMin10Said){
        const min10 = min.toString().split('')[0]
        addSrc(`${min10}0`);
    }
    addSrc('its')
    isFinishedSpeaking = true
}


speakBtn.addEventListener('click',()=>{
    isFinishedSpeaking = false;
    isOsaid = false;
    isMin10Said =false;
    isHourSaid = false;
    isMinBelow20Said = false;
    speakTime()
})