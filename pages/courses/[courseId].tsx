import React from "react";
import { PreviewCourse } from "../../common/types";
import { coursesService } from "../../api/requests";
import { Course } from "../../components/Course";
import { GetServerSideProps } from "next";

interface PageProps {
  course: PreviewCourse;
}

const Page = ({ course }: PageProps) => {
  return Object.keys(course).length !== 0 ? <Course course={course} /> : null;
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const courseId = query.courseId as string;
  const authToken = req.cookies?.authToken;
  let course = {} as PreviewCourse;
  if (authToken) {
    course = await coursesService.getCourseById(authToken, courseId);
  }

  return {
    props: {
      course,
    },
  };
};
export default Page;
