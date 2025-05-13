document.addEventListener("DOMContentLoaded", () => {
  // === GALLERY ===
  const galleryContainer = document.getElementById("gallery-container");
  if (galleryContainer) {
    const imageFiles = ["01.png"]; //file name of pic
    const basePath = "../../assets/img/boxes/mobility/private-van/"; //path pic
    const images = imageFiles.map(f => basePath + f);
//cambiare alt name linea 14
    galleryContainer.innerHTML = `
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

    const track = galleryContainer.querySelector('.gallery-track');
    const slides = galleryContainer.querySelectorAll('.gallery-slide');
    const prevBtn = galleryContainer.querySelector('.gallery-btn.prev');
    const nextBtn = galleryContainer.querySelector('.gallery-btn.next');
    let idx = 0;

    const updateGallery = () => {
      const w = slides[0].clientWidth;
      track.style.transform = `translateX(-${idx * w}px)`;
    };
    nextBtn.addEventListener('click', () => { idx = (idx+1)%slides.length; updateGallery(); });
    prevBtn.addEventListener('click', () => { idx = (idx-1+slides.length)%slides.length; updateGallery(); });
    window.addEventListener('resize', updateGallery);
    updateGallery();

    // touch
    let startX = 0;
    track.addEventListener('touchstart', e => startX = e.touches[0].clientX);
    track.addEventListener('touchend', e => {
      const endX = e.changedTouches[0].clientX;
      if (endX < startX - 30) nextBtn.click();
      if (endX > startX + 30) prevBtn.click();
    });
  }

  // === FORM === //cambiare qui info form
  const formContainer = document.getElementById("form-container");
  if (formContainer) {
    formContainer.innerHTML = `
      <div id="message-box" class="hidden">
        <p id="message-text"></p>
      </div>

      <form id="booking-form" class="booking-form" novalidate>
        <label class="bold-text" for="date-picker">Add info (optional) and chat!</label>
        <div></p></div>

        <input type="text" id="main-guest" placeholder="Name and Surname">
        <select id="guest-picker">
          ${[...Array(6)].map((_,i)=>
            `<option value="${i+1}">${i+1} Adult${i>0?'s':''}</option>`
          ).join('')}
        </select>
        <select id="under-18">
          <option value="0">No Minors</option>
          ${[...Array(5)].map((_,i)=>
            `<option value="${i+1}">${i+1} Minor${i>0?'s':''}</option>`
          ).join('')}
        </select>
        <input type="email" id="email" placeholder="example@email.com">
        <input type="tel" id="phone" placeholder="+39 123 456 7890">
        <textarea id="optional-request" placeholder="Optional Request"></textarea>
        <button type="submit" class="check-btn">Send and chat via WhatsApp</button>
        <div></p></div>
        <button type="button" id="submit-email" class="check-btn">Send via email</button>
      </form>
    `;
    const dateInput = document.getElementById('date-picker');
    const picker = new Pikaday({
      field: dateInput,
      format: 'DD/MM/YYYY',
      minDate: new Date(),
      theme: 'dark-theme' // opzionale
  });

  const sendMsg = method => {
    const val = id => document.getElementById(id)?.value.trim() || '';
    const lines = [
      `Hello! I'd like to book "PASTA EXPERIENCE".`,
      ``,
      `👤 Name:  ${val("main-guest")}`,
      `🧑‍🤝‍🧑 Adults: ${val("guest-picker")}`,
      `👶 Minors: ${val("under-18")}`,
      `📧 Email: ${val("email")}`,
      `📞 Phone: ${val("phone")}`,
    ];
  
    if (val("optional-request")) {
      lines.push(`📝 Notes: ${val("optional-request")}`);
    }
  
    lines.push(``, `Looking forward to your reply!`);
  
    const msg = lines.join('\n');
  
    if (method === "whatsapp") {
      window.open(`https://wa.me/393473119031?text=${encodeURIComponent(msg)}`, "_blank");
    } else {
      const mailMsg = encodeURIComponent(msg);
      window.location.href = `mailto:francesco@wheredolocals.com?subject=PRIVATE VAN&body=${mailMsg}`; //cambiare nome experience
    }
  };
  

    document.getElementById("booking-form")
      .addEventListener("submit", e => { e.preventDefault(); sendMsg("whatsapp"); });
    document.getElementById("submit-email")
      .addEventListener("click", () => sendMsg("email"));
  }

  // === HEADER LOGO ===
  const header = document.querySelector('.menu-header');
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.pageYOffset;
    if (y > lastY && y > header.offsetHeight) {
      // scrolling down past header height → hide
      header.style.transform = 'translateY(-100%)';
    } else {
      // scrolling up or near top → show
      header.style.transform = 'translateY(0)';
    }
    lastY = y;
  });
});