import React from "react";
import { render } from "@testing-library/react";
import { CourseListItem } from "../CourseListItem";
import { Course } from "../../common/types";

describe("<CourseListItem />", () => {
  const TEST_PROPS: Course = {
    containsLockedLessons: true,
    description:
      "Reignite your inner drive by managing factors that dampen your motivation.",
    duration: 521,
    id: "352be3c6-848b-4c19-9e7d-54fe68fef183",
    launchDate: "2023-03-06T16:50:06.000Z",
    lessonsCount: 2,
    meta: {
      slug: "lack-of-motivation-how-to-overcome-it",
      skills: [
        "Aligning your goals with your motives",
        "Overcoming decision paralysis",
        "Reframing negative self-talk",
        "Gaining clarity",
        "Challenging yourself",
      ],
      courseVideoPreview: {
        duration: 27,
        link: "https://wisey.app/videos/lack-of-motivation-how-to-overcome-it/preview/AppleHLS1/preview.m3u8",
        previewImageLink:
          "https://wisey.app/assets/images/web/course-covers/lack-of-motivation-how-to-overcome-it/preview",
      },
    },
    previewImageLink:
      "https://wisey.app/assets/images/web/course-covers/lack-of-motivation-how-to-overcome-it",
    rating: 3.5,
    status: "launched",
    tags: ["productivity"],
    title: "Lack of Motivation & How to Overcome It",
  };

  test("Renders correct number of skills", () => {
    const { container } = render(
      <CourseListItem course={TEST_PROPS}></CourseListItem>
    );
    const skillsContainer = container.querySelector(
      "div:nth-child(2) > div:nth-child(3)"
    );

    expect(skillsContainer?.children.length).toBe(5);
  });
});
