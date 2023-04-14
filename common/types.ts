export interface BaseCourse {
  id: string;
  title: string;
  tags: string[];
  launchDate: string;
  status: string;
  description: string;
  duration: number;
  previewImageLink: string;
  rating: number;
  containsLockedLessons: boolean;
  meta: {
    slug: string;
    skills?: string[];
    courseVideoPreview?: {
      link: string;
      duration: number;
      previewImageLink: string;
    };
  };
}

export interface Course extends BaseCourse {
  lessonsCount: number;
}

interface Lesson {
  id: string;
  title: string;
  duration: number;
  order: number;
  type: string;
  status: "locked" | "unlocked";
  link: string;
  previewImageLink: string;
  meta: null;
}

export interface CourseItem extends BaseCourse {
  lessons: Lesson[];
}
