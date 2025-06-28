const Virtual = document.querySelector("#virtual")
const chatBot = document.querySelector("#chatbot")

function openVirtualAssistance() {

  // window.open("ai.html")
  window.location.href = "/ai.html"
}

function openChatBot() {
  window.location.href = "/chatbot.html";
} 


Virtual.addEventListener("click", () => {
  
  openVirtualAssistance();
})

chatBot.addEventListener("click", () => {
  openChatBot()
})