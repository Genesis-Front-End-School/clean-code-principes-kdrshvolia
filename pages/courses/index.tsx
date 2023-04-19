import React from "react";
import { Course } from "../../common/types";
import { coursesService } from "../../api/requests";
import { CoursesList } from "../../components/CoursesList";
import { GetServerSideProps } from "next";

interface PageProps {
  coursesList: Course[];
}

const Page = ({ coursesList }: PageProps) => (
  <CoursesList courses={coursesList} />
);

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const authToken = req.cookies?.authToken;
  let coursesList = [] as Course[];
  if (authToken) {
    coursesList = await coursesService.getCoursesList(authToken);
  }

  return {
    props: {
      coursesList,
    },
  };
};
export default Page;
