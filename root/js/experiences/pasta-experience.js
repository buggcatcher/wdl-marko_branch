document.addEventListener("DOMContentLoaded", () => {

    // galleria
    const container = document.getElementById("gallery-container");
    if (container) {
      const imageFiles = [
        "01.jpeg", "02.jpeg", "04.jpeg", "05.jpeg",
        "06.jpeg", "07.jpeg", "08.jpeg", "09.jpeg"
      ];
      const basePath = "../../assets/img/boxes/experience/pasta_experience/";
      const images = imageFiles.map(file => basePath + file);
  
      const galleryHTML = `
        <div class="gallery">
          <button class="gallery-btn prev">&#10094;</button>
          <div class="gallery-track-container">
            <div class="gallery-track">
              ${images.map(src => `<div class="gallery-slide"><img src="${src}" alt="Pasta Experience" /></div>`).join('')}
            </div>
          </div>
          <button class="gallery-btn next">&#10095;</button>
        </div>
      `;
      container.innerHTML = galleryHTML;
  
      const track = container.querySelector('.gallery-track');
      const slides = container.querySelectorAll('.gallery-slide');
      const prevBtn = container.querySelector('.gallery-btn.prev');
      const nextBtn = container.querySelector('.gallery-btn.next');
  
      let index = 0;
  
      function updateGallery() {
        const slideWidth = slides[0].clientWidth;
        track.style.transform = `translateX(-${index * slideWidth}px)`;
      }
  
      nextBtn.addEventListener('click', () => {
        index = (index + 1) % slides.length;
        updateGallery();
      });
  
      prevBtn.addEventListener('click', () => {
        index = (index - 1 + slides.length) % slides.length;
        updateGallery();
      });
  
      window.addEventListener('resize', updateGallery);
      updateGallery();
  
      // touch support
      let startX = 0;
      track.addEventListener('touchstart', e => startX = e.touches[0].clientX);
      track.addEventListener('touchend', e => {
        const endX = e.changedTouches[0].clientX;
        if (endX < startX - 30) nextBtn.click();
        if (endX > startX + 30) prevBtn.click();
      });
    }
  
    // form
    const formContainer = document.getElementById("form-container");
    if (formContainer) {
      const formHTML = `
        <div id="message-box" class="hidden"><p id="message-text"></p></div>
        <form id="booking-form" class="booking-form">
          <label class="bold-text" for="date-picker">Straight Booking</label>
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
  
      function buildMessage(method) {
        const get = id => document.getElementById(id).value.trim();
        const message = `Hello! I'd like to book "PASTA EXPERIENCE".
  
  📅 Date:   ${get("date-picker")}
  👤 Name:   ${get("main-guest")}
  🧑‍🤝‍🧑 Adults: ${get("guest-picker")}  👶 Minors: ${get("under-18")}
  📧 Email:  ${get("email")}
  📞 Phone:  ${get("phone")}
  ${get("optional-request") ? `📝 Notes: ${get("optional-request")}` : ''}
  
  Looking forward to your reply!`;
  
        if (method === "whatsapp") {
          window.open(`https://wa.me/393473119031?text=${encodeURIComponent(message)}`, "_blank");
        } else {
          window.location.href = `mailto:francesco@wheredolocals.com?subject=PASTA EXPERIENCE&body=${encodeURIComponent(message)}`;
        }
      }
  
      document.getElementById("booking-form").addEventListener("submit", e => {
        e.preventDefault();
        buildMessage("whatsapp");
      });
  
      document.getElementById("submit-email").addEventListener("click", () => {
        buildMessage("email");
      });
    }
  
    // header scroll
    const header = document.querySelector('.menu-header');
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
      const current = window.pageYOffset;
      header.style.transform = current > lastScrollTop ? 'translateY(-100%)' : 'translateY(0)';
      lastScrollTop = current;
    });
  });
  