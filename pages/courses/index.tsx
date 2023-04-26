import React, { useEffect } from "react";
import { Course } from "../../common/types";
import { coursesService } from "../../api/requests";
import { CoursesList } from "../../components/CoursesList";
import { GetServerSideProps } from "next";
import { notificationObservable } from "../../utils/NotificationObservable";

interface PageProps {
  coursesList: Course[];
  errorMessage: null | string;
}

const Page = ({ coursesList, errorMessage }: PageProps) => {
  useEffect(() => {
    if (errorMessage) {
      notificationObservable.notify(errorMessage);
    }
  }, []);

  return <CoursesList courses={coursesList} />;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const authToken = req.cookies?.authToken;
  let coursesList = [] as Course[];
  let errorMessage = null;

  if (authToken) {
    try {
      coursesList = await coursesService.getCoursesList(authToken);
    } catch (err: unknown) {
      if (err instanceof Error) {
        errorMessage = err.message;
      }
    }
  }

  return {
    props: {
      coursesList,
      errorMessage,
    },
  };
};
export default React.memo(Page);
