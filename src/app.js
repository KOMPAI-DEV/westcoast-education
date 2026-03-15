// API-adressen till json-server där kurserna finns.
const API_URL = "http://localhost:3000/courses";
const BOOKINGS_URL = "http://localhost:3000/bookings";

// Hämtar referensen till containern där alla kurskort ska visas.
const courseListElement = document.getElementById("course-list");
const bookingModalElement = document.getElementById("bookingModal");
const selectedCourseElement = document.getElementById("selected-course");
const bookingFormElement = document.getElementById("booking-form");

// Skapar en Bootstrap-modal som vi kan styra från JavaScript.
const bookingModal = new bootstrap.Modal(bookingModalElement);

// Sparar vald kurs tillfälligt när användaren klickar på "Boka".
let selectedCourseNumber = "";

function getReadableFetchError(error) {
	if (error instanceof TypeError) {
		return "Kunde inte ansluta till API:t. Kontrollera att json-server körs (npm run start).";
	}

	return error.message;
}

// Returnerar HTML för ett Bootstrap-kort baserat på en kurs.
function createCourseCard(course) {
	return `
		<div class="col-12 col-md-6 col-lg-4">
			<div class="card h-100 shadow-sm">
				<img src="${course.imageUrl}" class="card-img-top" alt="${course.title}" />
				<div class="card-body d-flex flex-column">
					<h5 class="card-title">${course.title}</h5>
					<p class="card-text mb-1"><strong>Kursnummer:</strong> ${course.courseNumber}</p>
					<p class="card-text mb-1"><strong>Typ:</strong> ${course.type}</p>
					<p class="card-text mb-1"><strong>Längd:</strong> ${course.durationDays} dagar</p>
					<p class="card-text"><strong>Pris:</strong> ${course.price} kr</p>
					<button
						type="button"
						class="btn btn-primary mt-auto js-book-course"
						data-course-title="${course.title}"
						data-course-number="${course.courseNumber}"
					>
						Boka
					</button>
				</div>
			</div>
		</div>
	`;
}

// Lyssnar på klick i kurslistan och öppnar modalen för vald kurs.
courseListElement.addEventListener("click", (event) => {
	const button = event.target.closest(".js-book-course");

	if (!button) {
		return;
	}

	const courseTitle = button.dataset.courseTitle || "Vald kurs";
	selectedCourseNumber = button.dataset.courseNumber || "";
	selectedCourseElement.textContent = `Du bokar: ${courseTitle}`;
	bookingModal.show();
});

// Hanterar formulärets submit och sparar bokningen i json-server.
bookingFormElement.addEventListener("submit", async (event) => {
	event.preventDefault();

	const customerName = document.getElementById("customer-name").value.trim();
	const billingAddress = document.getElementById("billing-address").value.trim();
	const email = document.getElementById("email").value.trim();
	const mobile = document.getElementById("mobile").value.trim();

	// Skapar ett enkelt bokningsobjekt med vald kurs och kunddata.
	const booking = {
		courseNumber: selectedCourseNumber,
		customerName,
		billingAddress,
		email,
		mobile
	};

	try {
		const response = await fetch(BOOKINGS_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(booking)
		});

		if (!response.ok) {
			throw new Error("Kunde inte spara bokningen.");
		}

		bookingModal.hide();
		bookingFormElement.reset();
		selectedCourseNumber = "";
		selectedCourseElement.textContent = "";
		alert("Tack for din bokning!");
	} catch (error) {
		alert(`Ett fel uppstod: ${getReadableFetchError(error)}`);
	}
});

// Hämtar kurser från API:et och skriver ut dem i course-list.
async function loadCourses() {
	try {
		const response = await fetch(API_URL);

		// Om svaret inte är OK kastar vi ett fel som fångas i catch.
		if (!response.ok) {
			throw new Error("Kunde inte hämta kurser från servern.");
		}

		const courses = await response.json();

		// Bygger upp all HTML i en sträng för enkel och snabb rendering.
		let cardsHtml = "";
		for (const course of courses) {
			cardsHtml += createCourseCard(course);
		}

		courseListElement.innerHTML = cardsHtml;
	} catch (error) {
		// Visar ett tydligt felmeddelande i gränssnittet om något går fel.
		courseListElement.innerHTML = `
			<div class="col-12">
				<div class="alert alert-danger" role="alert">
					Ett fel uppstod: ${getReadableFetchError(error)}
				</div>
			</div>
		`;
	}
}

// Startar inläsning av kurser när filen laddas.
loadCourses();
