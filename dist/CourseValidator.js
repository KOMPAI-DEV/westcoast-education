export class CourseValidator {
    isValid(course) {
        // En kurs utan titel ar inte giltig.
        if (course.title.trim() === "") {
            return false;
        }
        // Negativt pris ar inte tillatet.
        if (course.price < 0) {
            return false;
        }
        return true;
    }
}
