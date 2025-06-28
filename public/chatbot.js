const prompt = document.querySelector(".prompt-area input");
const chatContainer = document.querySelector(".chat-container");
const image = document.querySelector("#image");
const imageinput = document.querySelector("#image input");

const api_url =// const API_KEY = "your_key_here"; // removed for security


let user = {
  message: null,
  file: {
    mime_type: null,
    data : null,
  }
};

async function generateResponse(aiChatBox) {

  let text = aiChatBox.querySelector(".ai-chat-area");
  ;
  let RequestOption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: user.message,
            },
           (user.file.data? [{
              "inline_data": user.file,
            }] : []),
          ],
        },
      ],
    }),
  };

  try {
    let response = await fetch(api_url, RequestOption);
    let data = await response.json();
    let apiResponse =
      data.candidates[0]?.content?.parts[0]?.text || "No response";
    
    

    text.innerHTML = apiResponse;
  } catch (error) {
    console.log(error);
  }

  finally {
    chatContainer.scrollTo({
      top: chatContainer.scrollHeight,
      behaviour: "smooth",
    });
  }
}

function createChatBox(html, classes) {
  let div = document.createElement("div");
  div.innerHTML = html;
  div.classList.add(classes);
  return div;
}

function handleChatResponse(message) {
  user.message = message;
  let html = ` <div class="userChatBox">
        <img
          width="50px"
          src="/generic-female-avatar-profile-afo0j568uvkyw8de (1).png"
          alt=""
          id="userImage"
        />

        <div class="user-chat-area">
        ${user.message}
        ${
          user.file.data
            ? `<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimg" />`
            : ""
        }

        </div>
      </div>
`;

  let userChatBox = createChatBox(html, "userChatBox");
  chatContainer.appendChild(userChatBox);

  chatContainer.scrollTo({top:chatContainer.scrollHeight , behaviour:"smooth"})

  prompt.value = null;

  setTimeout(() => {
    let html = ` <img
          width="50px"
          src="Assets/support-chatbot-png-06202024-l7z7y8q3ohihv3g6.png"
          alt=""
          id="aiImage"
        />

        <div class="ai-chat-area">
       
        </div>
      </div>`;

    let aiChatBox = createChatBox(html, "aiChatBox");
    chatContainer.appendChild(aiChatBox);

    generateResponse(aiChatBox);
  }, 600);
}

prompt.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleChatResponse(prompt.value);
  }
});



imageinput.addEventListener("change", () => {
  let file = imageinput.files[0];
  if (!file) return;
  let reader = new FileReader();

  reader.onload =(e) => {
    let base64 = e.target.result.split(",")[1];
    user. file={
      mime_type: file.type,
      data : base64,
    }
  }

  reader.readAsDataURL(file);
})

image.addEventListener("click", () =>{
  image.querySelector("input").click();
})
