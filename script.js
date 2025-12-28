document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  localStorage.setItem("username", username);
  window.location.href = "chat.html";
});

document.addEventListener("DOMContentLoaded", () => {
  const messages = document.getElementById("chatMessages");
  const messageInput = document.getElementById("messageInput");
  const proposal = document.getElementById("proposal");
  const agreeBtn = document.getElementById("agreeBtn");
  const declineBtn = document.getElementById("declineBtn");

  const responses = [
   "Anh thấy em rất dè chừng anh nhỉ.",
    "Em đừng lo anhh luôn muốn chúng ta sẽ là của nhau mà.",
    "anh đang muốn đến bên em chứ không phải là lừa dối em?",
    "Anh chỉ cần em ở đây, dù chỉ là một tin nhắn.",
    "Em nói gì anh cũng muốn nghe cả đời.",
    "Em có thể làm mọi thứ anh chỉ muốn em sẽ yêu anh thôi.",
    "anh sẽ chiều em y như những gì anh nói chứ không phải là nói xuông nha.",
    "Em có tin tưởng anh không.",
    "Anh muốn được ở bên em mỗi ngày, kể cả khi không nói gì.",
    "Em có muốn bên anh không nè. bây giờ em chưa tinn thì anhh sẽ cố để cho emm tin"

  ];

  let userMessageCount = 3;

  function showTypingIndicator() {
    const typingDiv = document.createElement("div");
    typingDiv.className = "message other typing";
    typingDiv.innerHTML = `
      <img src="assets/avatar2.png" alt="Anh" class="avatar" />
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    `;
    messages.appendChild(typingDiv);
    messages.scrollTop = messages.scrollHeight;
    return typingDiv;
  }

  function removeTypingIndicator(typingDiv) {
    typingDiv.remove();
  }

  function typeText(element, text, delay = 50) {
    let i = 0;
    element.textContent = "";
    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, delay);
  }

  function sendResponse(text) {
    const typingDiv = showTypingIndicator();
    setTimeout(() => {
      removeTypingIndicator(typingDiv);
      const otherMsg = document.createElement("div");
      otherMsg.className = "message other";
      otherMsg.innerHTML = `
        <img src="assets/avatar2.png" alt="Anh" class="avatar" />
        <p></p>
      `;
      messages.appendChild(otherMsg);
      messages.scrollTop = messages.scrollHeight;
      const p = otherMsg.querySelector("p");
      typeText(p, text, 40);
    }, 1000);
  }

  messageInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const text = messageInput.value.trim();
      if (!text) return;

      const userMsg = document.createElement("div");
      userMsg.className = "message user";
      userMsg.innerHTML = `
        <img src="assets/avatar1.png" alt="Em" class="avatar" />
        <p>${text}</p>
      `;
      messages.appendChild(userMsg);
      messages.scrollTop = messages.scrollHeight;

      userMessageCount++;

      const responseIndex = userMessageCount - 4;
      if (responseIndex < responses.length) {
        sendResponse(responses[responseIndex]);
      }

      messageInput.value = "";

      if (userMessageCount === 10) {
        proposal.classList.remove("hidden");
        messageInput.disabled = true;
      }
    }
  });

  agreeBtn?.addEventListener("click", () => {
    alert("Anh đã gửi lời cầu hôn đến email của em! ❤️");
    emailjs.send("service_m6k98wm", "service_m6k98wm", {
      to_email: "foxgaming0504@gmail.com",
      from_name: localStorage.getItem("username") || "Người gửi",
      message: "Người dùng đã đồng ý làm em bé của anh! 😍",
    }).then(() => {
      alert("Lời cầu hôn đã được gửi thành công!");
    }).catch((err) => {
      alert("Lỗi gửi email: " + JSON.stringify(err));
    });
    agreeBtn.disabled = true;
    declineBtn.disabled = true;
  });

  declineBtn?.addEventListener("click", () => {
    alert("Anh hiểu mà... Cảm ơn em vì đã dành thời gian cho anh.");
    proposal.classList.add("hidden");
  });
});
