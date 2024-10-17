let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");
// speechutterance is a function used to make the va speak what text has been passed;

function speak (text){
 let speakcomp = new SpeechSynthesisUtterance(text);
 speakcomp.rate =1;
 speakcomp.pitch=1;
 speakcomp.volume=1;
 speakcomp.lang = "en-GB";
 window.speechSynthesis.speak(speakcomp);
}

function wishme (){
    let d = new Date();
    let e = d.getDate();
    let f = d.getMonth()+1;
     let hours = d.getHours();
     
   
    if(hours>=0 && hours<12){
     speak("good morning prince");
    }
   else if(hours>=12 && hours<16){
     speak("good afternoon prince");
    }

    else{
     speak("good evening prince");
    }
}


const birthdaywish = ()=>{
    let d = new Date();
    let e = d.getDate();
    let f = d.getMonth()+1;
    if (e === 2 && f === 10 ){
        speak("Happy birthday my love");
    }
}



window.addEventListener("load",wishme());
 window.addEventListener("load",birthdaywish());
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// both  window.speechRecognition || window.webkitSpeechRecognitio are functions.
let recognition = new speechRecognition();
recognition.onresult = (event)=>{
    let currentindex = event.resultIndex;
    let transcript = event.results[currentindex][0].transcript;
    content.innerText = transcript;
    let transcript1 = transcript.toLowerCase();
    takecommand(transcript1);
};

btn.addEventListener("click", (event)=>{
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
})




import { HfInference } from "@huggingface/inference";

const inference = new HfInference("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");


for await (const chunk of inference.chatCompletionStream({
	model: "meta-llama/Llama-3.2-11B-Vision-Instruct",
	messages: [
		{
			"role": "user",
			"content": [
				
				{"type": "text", "text": `${transcript1}`},
			],
		}
	],
	max_tokens: 500,
})) {
	process.stdout.write(chunk.choices[0]?.delta?.content || "");
}


















// function takecommand(message){
 
//     btn.style.display = "block";
//     voice.style.display = "none";
  
//     // if message is not a astring then message.includes does not work.

//     if(message.includes("hello") || message.includes("hi")){
//         speak("hello sir! how can i help you");
//     }
//     else if(message.includes("who are you")){
//         speak("I am a virtual assistant created by Mr. prince ranjan");
//     }

//     else if(message.includes("open youtube")){
//         speak("OK! opening youtube");
//         window.open("https://www.youtube.com");
//     }

//         else if(message.includes("open google")){
//         speak("OK! opening google");
//         window.open("https://www.google.com");
//     }
 
//     else if(message.includes("open facebook")){
//         speak("OK! opening facebook");
//         window.open("https://www.facebook.com");
//     }

//     else if(message.includes("open instagram")){
//         speak("OK! opening instagram");
//         window.open("https://www.instagram.com");
//     }

//     else if(message.includes("open blender")){
//         speak("OK! opening blender");
//         window.open("blender://");
//     }

// else if(message.includes("thanks")){
//     speak("thankyou sir. Please remember me when u need help");
// }

// else if(message.includes("your name")){
//     speak("my name is jessica ");
// }


// else if(message.includes("you look so beautiful.")){
//     speak("thanks baby you are also very handsome, wanna date me");

// }

// else if(message.includes("your birthday" ||" when you were born")){
//     speak("i was born on 1st october,2024")
// }

// else if(message.includes("i love you")){
//     speak("i love you too my love. Love you soooo much baby");
// }

//     else{

       
//         speak(`this is what i found on internet regarding ${message}`);
//         window.open(`https://www.google.com/search?q= ${message}`);
//     }


// }
