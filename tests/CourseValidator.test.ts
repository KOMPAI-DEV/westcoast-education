import { CourseValidator } from "../src/CourseValidator";

describe("CourseValidator", () => {
  it("ska returnera true for ett giltigt kursobjekt", () => {
    const validator = new CourseValidator();
    const course = {
      title: "JavaScript Grund",
      courseNumber: "JS-101",
      durationDays: 3,
      type: "distans",
      imageUrl: "https://example.com/image.jpg",
      startDate: "2026-04-01",
      price: 9900
    };

    expect(validator.isValid(course)).toBe(true);
  });

  it("ska returnera false om kurstiteln ar tom", () => {
    const validator = new CourseValidator();
    const course = {
      title: "",
      courseNumber: "JS-101",
      durationDays: 3,
      type: "distans",
      imageUrl: "https://example.com/image.jpg",
      startDate: "2026-04-01",
      price: 9900
    };

    expect(validator.isValid(course)).toBe(false);
  });

  it("ska returnera false om priset ar mindre an 0", () => {
    const validator = new CourseValidator();
    const course = {
      title: "JavaScript Grund",
      courseNumber: "JS-101",
      durationDays: 3,
      type: "distans",
      imageUrl: "https://example.com/image.jpg",
      startDate: "2026-04-01",
      price: -1
    };

    expect(validator.isValid(course)).toBe(false);
  });
});
