import { Course, PreviewCourse } from "../common/types";

const BASE_URL = "http://api.wisey.app/api/v1/";

interface CoursesListResponse {
  courses: Course[];
}

class TokenService {
  getToken = async (): Promise<string> => {
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
}

export const tokenService = new TokenService();


export class CoursesService {
  getCoursesList = async (token: string): Promise<Course[]> => {
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


  getCourseById = async (token: string, id: string): Promise<PreviewCourse> => {
    try {
      const response = await fetch(`${BASE_URL}core/preview-courses/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        return {} as PreviewCourse;
      }
      return await response.json();
    } catch (e) {
      throw new Error("An error occurred when trying to course info");
    }
  };
}

export const coursesService = new CoursesService();




