import { Course, CourseItem } from "../common/types";

const BASE_URL = "http://api.wisey.app/api/v1/";

interface CoursesListResponse {
  courses: Course[];
}

export const getToken = async (): Promise<string> => {
  try {
    const response = await fetch(
      `${BASE_URL}auth/anonymous?platform=subscriptions`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      return "";
    }
    const responseData = await response.json();
    return responseData.token;
  } catch (e) {
    throw new Error("An error occurred when trying to get token");
  }
};

export const getCoursesList = async (token: string): Promise<Course[]> => {
  try {
    const response = await fetch(`${BASE_URL}core/preview-courses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      return [];
    }
    const responseData: CoursesListResponse = await response.json();
    return responseData.courses;
  } catch (e) {
    throw new Error("An error occurred when trying to get courses list");
  }
};

export const getCourseById = async (token: string, id: string): Promise<CourseItem> => {
  try {
    const response = await fetch(`${BASE_URL}core/preview-courses/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      return {} as CourseItem;
    }
    return await response.json();
  } catch (e) {
    throw new Error("An error occurred when trying to course info");
  }
};
