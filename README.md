# Westcoast Education

Detta projekt är en webbapplikation byggd med Vanilla JavaScript (ES6-moduler) och Bootstrap 5.
Applikationen hämtar kursdata från en lokal `json-server` och visar kurser i kortformat.

## Funktioner

- Visar kurser från `db.json` via `fetch`
- Renderar varje kurs som ett Bootstrap-kort
- Har en bokningsknapp per kurs
- Öppnar en Bootstrap-modal med bokningsformulär

## Tekniker

- HTML5
- CSS (Bootstrap 5 via CDN)
- Vanilla JavaScript (ES6-moduler)
- json-server

## Kom igang

1. Installera beroenden:

   `npm install`

2. Starta API (json-server):

   `npm run start`

3. Oppna `index.html` i webblasaren.

## API-endpoint

Nar `json-server` ar igang finns endpointen har:

- `http://localhost:3000/courses`

## Projektstruktur

- `index.html` – huvudsidans struktur
- `src/app.js` – logik for att hamta och visa kurser samt oppna modal
- `db.json` – testdata for kurser
- `package.json` – projektkonfiguration och scripts

## Exempeldata i db.json

Varje kurs innehaller foljande falt:

- `title`
- `courseNumber`
- `durationDays`
- `type`
- `imageUrl`
- `startDate`
- `price`
