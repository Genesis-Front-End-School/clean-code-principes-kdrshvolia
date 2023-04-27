import React, { useEffect } from "react";
import { PreviewCourse } from "../../common/types";
import { coursesService } from "../../api/requests";
import { Course } from "../../components/Course";
import { GetServerSideProps } from "next";
import { notificationObservable } from "../../utils/NotificationObservable";

interface PageProps {
  course: PreviewCourse;
  errorMessage: null | string;
}

const Page = ({ course, errorMessage }: PageProps) => {
  useEffect(() => {
    if (errorMessage) {
      notificationObservable.notify(errorMessage);
    }
  }, []);

  return Object.keys(course).length !== 0 ? <Course course={course} /> : null;
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const courseId = query.courseId as string;
  const authToken = req.cookies?.authToken;
  let course = {} as PreviewCourse;
  let errorMessage = null;

  if (authToken) {
    try {
      course = await coursesService.getCourseById(authToken, courseId);
    } catch (err: unknown) {
      if (err instanceof Error) {
        errorMessage = err.message;
      }
    }
  }

  return {
    props: {
      course,
      errorMessage,
    },
  };
};
export default Page;
