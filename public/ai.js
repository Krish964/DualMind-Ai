const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition(); //This will tell browser to start listening the voice


//Setting the language of the speech
recognition.lang = "en-US";
console.log(recognition)

// Selecting the button and converting text to speech

const btn = document.querySelector(".container button");

btn.addEventListener("click", () => {

  function speak(text) {
    const convert = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(convert); 

  }

  // Handling the commands given by user...
  function handleCommands(command) {
    if (command.includes("open youtube")) {
      speak("opening youtube");
      window.open("https://www.youtube.com", "_blank");  //Opening youtube and _blank
      // will open youtube in new tab 
    }

    else if (command.includes("open facebook")) {
      speak("opening facebook");
      window.open("https://www.facebook.com", "_blank");
    }
    
    else if (command.includes("open google")) {
      speak("opening google");
      window.open("https://www.google.com/", "_blank");
    }
    
    else if (command.includes("open whatsapp")) {
      speak("opening whatsapp");
      window.open("https://web.whatsapp.com/", "_blank");
    }
    
    else if (command.includes("open instagram")) {
      speak("opening instagram");
      window.open("https://www.instagram.com/", "_blank");
    }
    
    else if (command.includes("open brave")) {
      speak("opening brave");
      window.open("https://www.opera.com/", "_blank");
    }

    else {
      speak("searching on google");
      window.open( `https://www.google.com/search?q=${command}`)
    }

  }

  speak("hello , how can i help you");

  setTimeout(() => {
    btn.innerText = "Listening..."
    btn.style.backgroundColor = "red"
    recognition.start();
  }, 2000);

  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    handleCommands(command);
  }

  recognition.onend = () => {
     btn.innerText = " Start Listeneing "
    btn.style.backgroundColor = "rgb(55, 111, 130)"
  }
})
