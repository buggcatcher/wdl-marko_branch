document.addEventListener("DOMContentLoaded", () => {
  const type = document.body.dataset.formType;
  if (!type) return;

  const formContainer = document.getElementById("form-container");
  if (!formContainer) return;

  // form injection
  const formHTML = `
    <div id="message-box" class="hidden"><p id="message-text"></p></div>
    <form id="booking-form" class="booking-form">
      <label class="bold-text">Straight Booking</label>
      <div></p></div>
      <input type="date" id="date-picker" required>
      <input type="text" id="main-guest" placeholder="Name and Surname" required>
      <select id="guest-picker">
        ${[...Array(6).keys()].map(i => `<option value="${i + 1}">${i + 1} Adult${i > 0 ? 's' : ''}</option>`).join('')}
      </select>
      <select id="under-18">
        <option value="0">No Minors</option>
        ${[...Array(5).keys()].map(i => `<option value="${i + 1}">${i + 1} Minor${i > 0 ? 's' : ''}</option>`).join('')}
      </select>
      <input type="email" id="email" placeholder="example@email.com" required>
      <input type="tel" id="phone" placeholder="+39 123 456 7890" required>
      <textarea id="optional-request" placeholder="Optional Request"></textarea>
      <button type="submit" class="check-btn">Send and chat via WhatsApp</button>
      <div></p></div>
      <button type="button" id="submit-email" class="check-btn">Send via email</button>
    </form>
  `;

  formContainer.innerHTML = formHTML;

  // formatted message
  function buildMessage(method) {
    const get = id => document.getElementById(id).value.trim();
    const name = get("main-guest");
    const date = get("date-picker");
    const adults = get("guest-picker");
    const minors = get("under-18");
    const email = get("email");
    const phone = get("phone");
    const request = get("optional-request");

    if (!name || !date || !email || !phone) {
      alert("⚠️ Please fill in all required fields.");
      return;
    }

    const label = `${type.replace("-", " ").toUpperCase()}`;
    const message = 
`Hello! I'd like to book "${label}" experience.

📅 Date:  ${date}
👤 Name: ${name}
🧑‍🤝‍🧑 Adults: ${adults}  👶 Minors: ${minors}
📧 Email:  ${email}
📞 Phone: ${phone}
${request ? `📝 Notes: ${request}` : ''}

Looking forward to your reply!`;

    // ROBBA ESPOSTA!
    if (method === "whatsapp") {
      const url = `https://wa.me/393473119031?text=${encodeURIComponent(message)}`; 
      window.open(url, "_blank");
    } else {
      const mailto = `mailto:francesco@wheredolocals.com?subject=${encodeURIComponent(label)}&body=${encodeURIComponent(message)}`; 
      window.location.href = mailto;
    }
  }

  // event listeners
  document.getElementById("booking-form").addEventListener("submit", e => {
    e.preventDefault();
    buildMessage("whatsapp");
  });

  document.getElementById("submit-email").addEventListener("click", () => {
    buildMessage("email");
  });
});
