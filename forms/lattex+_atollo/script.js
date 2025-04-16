let currentImageIndex = 0;
const totalImages = 4;
const images = Array.from({ length: totalImages }, (_, index) => `img/${String(index + 1).padStart(2, '0')}.jpeg`);

function changeImage(direction) {
	currentImageIndex = (currentImageIndex + direction + totalImages) % totalImages;
	document.getElementById("image-display").src = images[currentImageIndex];
}

function showMessage(text, type) {
	const messageBox = document.getElementById("message-box");
	const messageText = document.getElementById("message-text");
	messageText.innerText = text;
	messageBox.className = type;
	setTimeout(() => {
		messageBox.classList.add("hidden");
	}, 4000);
}

function handleBookingSubmission(method) {
	const name = document.getElementById("main-guest").value.trim();
	const date = document.getElementById("date-picker").value.trim();
	const adults = document.getElementById("guest-picker").value;
	const minors = document.getElementById("under-18").value;
	const email = document.getElementById("email").value.trim();
	const phone = document.getElementById("phone").value.trim();
	const request = document.getElementById("optional-request").value.trim();

	if (!name || !date || !adults || !minors || !email || !phone) {
		alert("Per favore, compila tutti i campi obbligatori.");
		return;
	}

	if (method === "whatsapp") {
		const message = `Hello, I would like to book the "Drink and Paint" experience. Here are my details:%0A` +
			`- Name: ${name}%0A` +
			`- Date: ${date}%0A` +
			`- Adults: ${adults}%0A` +
			`- Minors: ${minors}%0A` +
			`- Email: ${email}%0A` +
			`- Phone: ${phone}%0A` +
			(request ? `- Additional Request: ${request}%0A` : '');

		const phoneNumber = "+393806452521";
		const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;
		window.open(whatsappLink, "_blank");
	}

	if (method === "email") {
		const subject = encodeURIComponent("Booking Request - Drink and Paint");
		const body = encodeURIComponent(
			`Hello, I would like to book the "Drink and Paint" experience. Here are my details:\n` +
			`- Name: ${name}\n` +
			`- Date: ${date}\n` +
			`- Adults: ${adults}\n` +
			`- Minors: ${minors}\n` +
			`- Email: ${email}\n` +
			`- Phone: ${phone}\n` +
			(request ? `- Additional Request: ${request}\n` : '')
		);

		const destinationEmail = "prenotazioni@tuaemail.com";
		const mailtoLink = `mailto:${destinationEmail}?subject=${subject}&body=${body}`;
		window.location.href = mailtoLink;
	}
}

// Eventi
document.getElementById("booking-form").addEventListener("submit", function (event) {
	event.preventDefault();
	handleBookingSubmission("whatsapp");
});

document.getElementById("submit-email").addEventListener("click", function () {
	handleBookingSubmission("email");
});


