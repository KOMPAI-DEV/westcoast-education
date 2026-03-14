export interface ICourse {
  title: string;
  courseNumber: string;
  durationDays: number;
  type: string;
  imageUrl: string;
  startDate: string;
  price: number;
}

export class CourseValidator {
  isValid(course: ICourse): boolean {
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
