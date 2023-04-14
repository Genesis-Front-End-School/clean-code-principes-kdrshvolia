import React from "react";
import { Course } from "../common/types";
import { Box, Chip, Rating, Typography } from "@mui/material";
import { getCourseImageLink } from "../utils/utils";
import Link from "next/link";
import { Video } from "./Video";

interface CourseProps {
  course: Course;
}

export const CourseListItem = ({ course }: CourseProps) => {
  const { skills, courseVideoPreview } = course.meta;

  return (
    <Box
      display="grid"
      justifyItems="center"
      border="2px solid #DCDCDC"
      borderRadius="8px"
      padding="15px"
      boxSizing="border-box"
      gap="20px"
    >
      {courseVideoPreview && (
        <Box maxWidth="600px">
          <Video
            src={courseVideoPreview.link}
            playMutedOnHover
            poster={getCourseImageLink(course.previewImageLink)}
          />
        </Box>
      )}
      <Box display="flex" flexDirection="column" alignItems="center">
        <Link href={`courses/${course.id}`} style={{ textDecoration: "none" }}>
          <Typography variant="h5" textAlign="center">
            {course.title}
          </Typography>
        </Link>
        <Rating name="read-only" value={course.rating} readOnly />
        {skills && (
          <Box
            display="flex"
            flexWrap="wrap"
            gap="10px"
            justifyContent="center"
          >
            {skills.map((skill) => (
              <Chip label={skill} key={skill} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};
