import { CourseValidator } from "../dist/CourseValidator.js";

// API-adresser till json-server.
const BOOKINGS_URL = "http://localhost:3000/bookings";
const COURSES_URL = "http://localhost:3000/courses";

// Hämtar referenser till elementen på adminsidan.
const bookingListElement = document.getElementById("booking-list");
const courseFormElement = document.getElementById("course-form");
const courseValidator = new CourseValidator();

// Hämtar alla bokningar och visar dem i listan.
async function loadBookings() {
	try {
		const response = await fetch(BOOKINGS_URL);

		if (!response.ok) {
			throw new Error("Kunde inte hämta bokningar.");
		}

		const bookings = await response.json();
		let bookingsHtml = "";

		for (const booking of bookings) {
			bookingsHtml += `
				<li class="list-group-item">
					<strong>${booking.customerName}</strong><br />
					E-post: ${booking.email}<br />
					Kursnummer: ${booking.courseNumber}
				</li>
			`;
		}

		bookingListElement.innerHTML = bookingsHtml;
	} catch (error) {
		bookingListElement.innerHTML = `
			<li class="list-group-item text-danger">
				Ett fel uppstod: ${error.message}
			</li>
		`;
	}
}

// Hanterar formuläret för att lägga till en ny kurs.
courseFormElement.addEventListener("submit", async (event) => {
	event.preventDefault();

	const title = document.getElementById("title").value.trim();
	const courseNumber = document.getElementById("course-number").value.trim();
	const durationDays = Number(document.getElementById("duration-days").value);
	const type = document.getElementById("type").value.trim();
	const imageUrl = document.getElementById("image-url").value.trim();
	const startDate = document.getElementById("start-date").value;
	const price = Number(document.getElementById("price").value);

	// Skapar ett nytt kursobjekt från formulärets värden.
	const newCourse = {
		title,
		courseNumber,
		durationDays,
		type,
		imageUrl,
		startDate,
		price
	};

	// Validerar kursen innan vi skickar den till servern.
	if (!courseValidator.isValid(newCourse)) {
		alert("Ogiltig kursdata! Kontrollera att titel finns och priset inte ar negativt.");
		return;
	}

	try {
		const response = await fetch(COURSES_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newCourse)
		});

		if (!response.ok) {
			throw new Error("Kunde inte spara kursen.");
		}

		alert("Kursen har sparats!");
		courseFormElement.reset();
	} catch (error) {
		alert(`Ett fel uppstod: ${error.message}`);
	}
});

// Startar inläsning av bokningar när sidan laddas.
loadBookings();
