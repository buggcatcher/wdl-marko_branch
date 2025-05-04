let currentImageIndex = 0;
const totalImages = 42;
const images = Array.from({ length: totalImages }, (_, index) => `img/${String(index + 1).padStart(2, '0')}.jpg`);

function changeImage(direction) {
	currentImageIndex = (currentImageIndex + direction + totalImages) % totalImages;
	document.getElementById("image-display").src = images[currentImageIndex];
}



