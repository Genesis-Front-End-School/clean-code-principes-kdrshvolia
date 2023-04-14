import React from "react";
import { render } from "@testing-library/react";
import { CourseItem } from "../../common/types";
import { Course } from "../Course";

describe("<Course />", () => {
  const TEST_PROPS: CourseItem = {
    containsLockedLessons: true,
    description:
      "Reignite your inner drive by managing factors that dampen your motivation.",
    duration: 521,
    id: "352be3c6-848b-4c19-9e7d-54fe68fef183",
    launchDate: "2023-03-06T16:50:06.000Z",
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
    lessons: [
      {
        id: "278e5a0e-8df1-4646-9984-10289d52dc2d",
        title: "Why we lack motivation",
        duration: 255,
        order: 1,
        type: "video",
        status: "unlocked",
        link: "https://wisey.app/videos/lack-of-motivation-how-to-overcome-it/lesson-1/AppleHLS1/lesson-1.m3u8",
        previewImageLink:
          "https://wisey.app/assets/images/web/lessons-covers/lack-of-motivation-how-to-overcome-it/lesson-1",
        meta: null,
      },
      {
        id: "d2379510-3e3a-4d87-a3e9-05c1a0195548",
        title: "Decision paralysis",
        duration: 266,
        order: 2,
        type: "video",
        status: "locked",
        link: "https://wisey.app/videos/lack-of-motivation-how-to-overcome-it/lesson-2/AppleHLS1/lesson-2.m3u8",
        previewImageLink:
          "https://wisey.app/assets/images/web/lessons-covers/lack-of-motivation-how-to-overcome-it/lesson-2",
        meta: null,
      },
      {
        duration: 285,
        id: "29a8fc4d-b2a4-420b-80de-73ecda13f28e",
        link: "https://wisey.app/videos/lack-of-motivation-how-to-overcome-it/lesson-3/AppleHLS1/lesson-3.m3u8",
        meta: null,
        order: 3,
        previewImageLink:
          "https://wisey.app/assets/images/web/lessons-covers/lack-of-motivation-how-to-overcome-it/lesson-3",
        status: "locked",
        title: "Negative self-talk",
        type: "video",
      },
    ],
  };

  test("Renders correct number of lessons", () => {
    const { container } = render(<Course course={TEST_PROPS}></Course>);
    const lessonsList = container.querySelector("ul");
    expect(lessonsList.children.length).toBe(3);
  });

  test("Renders locked lessons correctly", () => {
    const { container } = render(<Course course={TEST_PROPS}></Course>);
    // get locked icons
    const lessonsList = container.querySelectorAll("ul svg");
    expect(lessonsList.length).toBe(2);
  });
});
