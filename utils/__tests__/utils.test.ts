import {
  getCourseImageLink,
  getCourseLessonImageLink,
  getLessonDuration,
} from "../utils";

describe("utils", () => {
  test("get course image link", () => {
    const testUrl =
      "https://wisey.app/assets/images/web/course-covers/lack-of-motivation-how-to-overcome-it";
    const expectedResult =
      "https://wisey.app/assets/images/web/course-covers/lack-of-motivation-how-to-overcome-it/cover.webp";
    const result = getCourseImageLink(testUrl);

    expect(result).toBe(expectedResult);
  });

  test("get course lesson image link", () => {
    const testUrl =
      "https://wisey.app/assets/images/web/lessons-covers/lack-of-motivation-how-to-overcome-it/lesson-1";
    const lessonOrder = 1;
    const expectedResult =
      "https://wisey.app/assets/images/web/lessons-covers/lack-of-motivation-how-to-overcome-it/lesson-1/lesson-1.webp";
    const result = getCourseLessonImageLink(testUrl, lessonOrder);

    expect(result).toBe(expectedResult);
  });

  test("get lesson duration", () => {
    const lessonDurationSeconds = 150;
    const result = getLessonDuration(lessonDurationSeconds);

    expect(result).toBe("2m 30s");
  });
});
