import React, { FC, useState } from "react";
import { PreviewCourse } from "../common/types";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { Video } from "./Video";
import { getCourseLessonImageLink, getLessonDuration } from "../utils";

interface CourseProps {
  course: PreviewCourse;
}

export const Course: FC<CourseProps> = ({ course }: CourseProps) => {
  const { lessons } = course;

  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);
  const currentLesson = lessons[selectedLessonIndex];

  const handleLessonItemClick = (index: number) => {
    setSelectedLessonIndex(index);
  };

  return (
    <Box>
      <Typography variant="h4" color="inherit">
        {course.title}
      </Typography>
      <Typography variant="h5">Lessons number: {lessons.length}</Typography>
      <Typography variant="body1">{course.description}</Typography>
      <Typography variant="h5">{lessons[selectedLessonIndex].title}</Typography>
      <Box display="flex" gap="20px" flexDirection={["column", "row"]}>
        <Box flexBasis={["100%", "50%"]}>
          <Video
            src={currentLesson.link}
            poster={getCourseLessonImageLink(
              currentLesson.previewImageLink,
              currentLesson.order
            )}
          />
          <Typography component="p">
            You can adjust video speed by using shortcuts
            Alt+ArrowUp/Alt+ArrowDown
          </Typography>
        </Box>
        {lessons.length > 0 && (
          <Box flexBasis={["100%", "50%"]}>
            <List>
              {lessons.map((lesson, index) => (
                <ListItemButton
                  key={lesson.id}
                  selected={selectedLessonIndex === index}
                  onClick={() => handleLessonItemClick(index)}
                  disabled={lesson.status === "locked"}
                >
                  <ListItemText primary={lesson.title} />
                  <Typography variant="body2">
                    {getLessonDuration(lesson.duration)}
                  </Typography>
                  {lesson.status === "locked" && <LockIcon />}
                </ListItemButton>
              ))}
            </List>
          </Box>
        )}
      </Box>
    </Box>
  );
};
