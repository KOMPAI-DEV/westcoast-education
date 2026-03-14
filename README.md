# Westcoast Education

Detta projekt är en webbapplikation byggd med Vanilla JavaScript (ES6-moduler), Bootstrap 5, json-server och TypeScript för validering.

## Funktioner

- Visar kurser från `db.json` via `fetch`
- Renderar kurser som Bootstrap-kort på `index.html`
- Har bokningsfunktion via modal och sparar bokningar i json-server
- Har admin-sida (`admin.html`) för att:
  - lägga till nya kurser
  - visa inkomna bokningar
- Validerar kursdata med `CourseValidator` innan kurs sparas

## Tekniker

- HTML5
- Bootstrap 5 (CDN)
- Vanilla JavaScript (ES6-moduler)
- TypeScript
- Jest + ts-jest (TDD)
- json-server

## Scripts

- `npm run start` – startar json-server på port 3000
- `npm run build` – kompilerar TypeScript till `dist/`
- `npm run test` – kör Jest-tester

## Kom igång

1. Installera beroenden:

   `npm install`

2. Kompilera TypeScript (krävs för admin-sidan):

   `npm run build`

3. Starta API (json-server):

   `npm run start`

4. Öppna sidor i webbläsaren:

   - `index.html`
   - `admin.html`

## API-endpoints

När json-server är igång används:

- `http://localhost:3000/courses`
- `http://localhost:3000/bookings`

## Projektstruktur

- `index.html` – kundsida med kurslista och bokningsmodal
- `admin.html` – administrationssida med kursformulär och bokningslista
- `src/app.js` – logik för kursvisning och bokning
- `src/admin.js` – logik för adminfunktioner
- `src/CourseValidator.ts` – TypeScript-klass för kursvalidering
- `tests/CourseValidator.test.ts` – TDD-tester för validering
- `dist/CourseValidator.js` – kompilerad validator för webbläsaren
- `db.json` – lokal databas med `courses` och `bookings`

## Kursmodell

Varje kurs innehåller följande fält:

- `title`
- `courseNumber`
- `durationDays`
- `type`
- `imageUrl`
- `startDate`
- `price`
