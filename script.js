vdocument.getElementById("loginForm")?.addEventListener("submit", function (e) {
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

  // ✅ Danh sách câu trả lời "Anh" đã code sẵn
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

  let userMessageCount = 3; // Đã có 3 tin nhắn ban đầu

  // ✅ Hiệu ứng gõ chữ (typing indicator)
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

  // ✅ Xóa hiệu ứng gõ chữ
  function removeTypingIndicator(typingDiv) {
    typingDiv.remove();
  }

  // ✅ Hiệu ứng gõ chữ (gõ từng ký tự)
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

  // ✅ Gửi câu trả lời "Anh" với hiệu ứng gõ chữ
  function sendResponse(text) {
    const typingDiv = showTypingIndicator();

    // Sau 1 giây, thay thế hiệu ứng gõ bằng câu trả lời
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

      // Hiệu ứng gõ từng chữ
      const p = otherMsg.querySelector("p");
      typeText(p, text, 40); // 40ms mỗi chữ – tốc độ vừa phải
    }, 1000);
  }

  // ✅ Nhập câu nói → hiện hiệu ứng gõ chữ → trả lời tự động
  messageInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const text = messageInput.value.trim();
      if (!text) return;

      // 1. Thêm câu nói của người dùng (Em)
      const userMsg = document.createElement("div");
      userMsg.className = "message user";
      userMsg.innerHTML = `
        <img src="assets/avatar1.png" alt="Em" class="avatar" />
        <p>${text}</p>
      `;
      messages.appendChild(userMsg);
      messages.scrollTop = messages.scrollHeight;

      // 2. Tăng số câu người dùng nói
      userMessageCount++;

      // 3. Gọi câu trả lời "Anh" với hiệu ứng gõ chữ
      const responseIndex = userMessageCount - 4;
      if (responseIndex < responses.length) {
        sendResponse(responses[responseIndex]);
      }

      // 4. Xóa ô nhập
      messageInput.value = "";

      // 5. Sau 10 câu người dùng nói → hiện lời cầu hôn
      if (userMessageCount === 10) {
        proposal.classList.remove("hidden");
        messageInput.disabled = true;
      }
    }
  });

  // ✅ Gửi email khi "Đồng ý"
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

