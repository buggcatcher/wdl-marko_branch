document.addEventListener("DOMContentLoaded", () => {
    const type = document.body.dataset.formType;
    if (!type) return;
  
    const formContainer = document.getElementById("form-container");
    if (!formContainer) return;
  
    // Template base del form
    const formHTML = `
      <div id="message-box" class="hidden"><p id="message-text"></p></div>
      <form id="booking-form" class="booking-form">
        <label class="bold-text">Straight Booking</label>
        <label for="date-picker">Select a date</label>
        <input type="text" id="date-picker" placeholder="mm/dd/yyyy">
        <input type="text" id="main-guest" placeholder="Name and Surname">
        <select id="guest-picker">
          ${[...Array(6).keys()].map(i => `<option value="${i+1}">${i+1} Adult${i>0 ? 's' : ''}</option>`).join('')}
        </select>
        <select id="under-18">
          <option value="0">No Minors</option>
          ${[...Array(5).keys()].map(i => `<option value="${i+1}">${i+1} Minor${i>0 ? 's' : ''}</option>`).join('')}
        </select>
        <input type="email" id="email" placeholder="example@email.com">
        <input type="tel" id="phone" placeholder="+39 123 456 7890">
        <textarea id="optional-request" placeholder="Optional Request"></textarea>
        <button type="submit" class="check-btn">Send and chat via Whatsapp</button>
        <button type="button" id="submit-email" class="check-btn">Send via email</button>
      </form>
    `;
    formContainer.innerHTML = formHTML;
  
    function buildMessage(method) {
      const name = document.getElementById("main-guest").value.trim();
      const date = document.getElementById("date-picker").value.trim();
      const adults = document.getElementById("guest-picker").value;
      const minors = document.getElementById("under-18").value;
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const request = document.getElementById("optional-request").value.trim();
  
      const label = `Booking – ${type.replace("-", " ").toUpperCase()}`;
      const message = `Hello, I would like to book the "${label}" experience. Here are my details:%0A` +
        `- Name: ${name}%0A- Date: ${date}%0A- Adults: ${adults}%0A- Minors: ${minors}%0A- Email: ${email}%0A- Phone: ${phone}%0A` +
        (request ? `- Additional Request: ${request}%0A` : '');
  
      if (method === "whatsapp") {
        window.open(`https://wa.me/+393339680773?text=${message}`, "_blank"); //`https://wa.me/+393339680773?text=${message}`
      } else {
        const subject = encodeURIComponent(label);
        const body = encodeURIComponent(message.replace(/%0A/g, "\n"));
        window.location.href = `mailto:marko.ilincic@proton.me?subject=${subject}&body=${body}`; //`mailto:francesco@wheredolocals.com?subject=${subject}&body=${body}`
      }
    }
  
    document.getElementById("booking-form").addEventListener("submit", e => {
      e.preventDefault();
      buildMessage("whatsapp");
    });
  
    document.getElementById("submit-email").addEventListener("click", () => {
      buildMessage("email");
    });
  });
  