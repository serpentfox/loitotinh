document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  localStorage.setItem("username", username);
  window.location.href = "chat.html";
});

document.addEventListener("DOMContentLoaded", () => {
  const messages = document.getElementById("chatMessages");
  const messageInput = document.getElementById("messageInput");
  const sendBtn = document.getElementById("sendBtn");
  const proposal = document.getElementById("proposal");
  const agreeBtn = document.getElementById("agreeBtn");
  const declineBtn = document.getElementById("declineBtn");

  let messageCount = 0;

  sendBtn?.addEventListener("click", () => {
    const text = messageInput.value.trim();
    if (!text) return;

    const messageDiv = document.createElement("div");
    messageDiv.className = "message user";
    messageDiv.innerHTML = `<img src="assets/avatar1.png" alt="Bạn" class="avatar" /><p>${text}</p>`;
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
    messageCount++;
    messageInput.value = "";

    if (messageCount === 10) {
      proposal.classList.remove("hidden");
      sendBtn.disabled = true;
      messageInput.disabled = true;
    }
  });

  messageInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendBtn.click();
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
