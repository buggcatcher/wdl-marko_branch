function showMessage(text, type) {
	const messageBox = document.getElementById("message-box");
	const messageText = document.getElementById("message-text");
	if (messageText && messageBox) {
		messageText.innerText = text;
		messageBox.className = type;
		setTimeout(() => {
			messageBox.classList.add("hidden");
		}, 4000);
	}
}

function getFieldValue(id) {
	const el = document.getElementById(id);
	return el ? el.value.trim() : "";
}

function handleBookingSubmission(method) {
	const name = getFieldValue("main-guest");
	const date = getFieldValue("date-picker");
	const email = getFieldValue("email");
	const phone = getFieldValue("phone");
	const request = getFieldValue("optional-request");

	if (method === "whatsapp") {
		let message = `Hello, I would like to book the experience. Here are my details:%0A`;
		if (name) message += `- Name: ${name}%0A`;
		if (date) message += `- Date: ${date}%0A`;
		if (email) message += `- Email: ${email}%0A`;
		if (phone) message += `- Phone: ${phone}%0A`;
		if (request) message += `- Additional Request: ${request}%0A`;

		const phoneNumber = "+393473119031";
		const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;
		window.open(whatsappLink, "_blank");
	}

	if (method === "email") {
		let body = `Hello, I would like to book the experience.\n`;
		if (name) body += `- Name: ${name}\n`;
		if (date) body += `- Date: ${date}\n`;
		if (email) body += `- Email: ${email}\n`;
		if (phone) body += `- Phone: ${phone}\n`;
		if (request) body += `- Additional Request: ${request}\n`;

		const subject = encodeURIComponent("Booking Request - Drink and Paint");
		const destinationEmail = "francesco@wheredolocals.com";
		const mailtoLink = `mailto:${destinationEmail}?subject=${subject}&body=${encodeURIComponent(body)}`;
		window.location.href = mailtoLink;
	}
}

// Eventi
const form = document.getElementById("booking-form");
if (form) {
	form.addEventListener("submit", function (event) {
		event.preventDefault();
		handleBookingSubmission("whatsapp");
	});
}

const emailButton = document.getElementById("submit-email");
if (emailButton) {
	emailButton.addEventListener("click", function () {
		handleBookingSubmission("email");
	});
}
