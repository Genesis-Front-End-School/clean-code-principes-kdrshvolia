import React from "react";
import { Course } from "../common/types";
import { CourseListItem } from "./CourseListItem";
import { Box, Pagination } from "@mui/material";
import { usePagination } from "../hooks/usePagination";

interface CoursesListProps {
  courses: Course[];
}

export const CoursesList = ({ courses }: CoursesListProps) => {
  const ITEMS_PER_PAGE = 10;

  const { currentPage, pagesCount, setCurrentPage, showedData } = usePagination(
    courses,
    ITEMS_PER_PAGE
  );

  const handleChange = (_: any, p: number) => {
    setCurrentPage(p);
  };

  return (
    <Box
      display="grid"
      gridTemplateColumns="100%"
      justifyContent="center"
      gap="15px"
      maxWidth="800px"
      margin="0 auto"
    >
      {showedData.map((item) => <CourseListItem course={item} key={item.id} />)}
      <Pagination
        count={pagesCount}
        size="large"
        page={currentPage}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
    </Box>
  );
};
