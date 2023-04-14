import { act, renderHook } from "@testing-library/react";
import { usePagination } from "../usePagination";

describe("usePagination", () => {
  const paginationData = [
    "test1",
    "test2",
    "test3",
    "test4",
    "test5",
    "test6",
    "test7",
    "test8",
    "test9",
    "test10",
  ];
  const ITEMS_PER_PAGE = 3;

  test("Calculates number of pages correctly", () => {
    const { result } = renderHook(() => usePagination(paginationData, ITEMS_PER_PAGE));

    expect(result.current.pagesCount).toBe(4);
  });

  test("Set next page correctly", () => {
    const { result } = renderHook(() => usePagination(paginationData, ITEMS_PER_PAGE));
    act(() => {
      result.current.next();
    });

    expect(result.current.currentPage).toBe(2);
  });

  test("Doesn't set negative page number", () => {
    const { result } = renderHook(() => usePagination(paginationData, ITEMS_PER_PAGE));
    act(() => {
      result.current.prev();
    });

    expect(result.current.currentPage).toBe(1);
  });

  test("Goes to the correct page", () => {
    const { result } = renderHook(() => usePagination(paginationData, ITEMS_PER_PAGE));
    act(() => {
      result.current.goToPage(3);
    });

    expect(result.current.currentPage).toBe(3);
  });

  test("Renders correct items", () => {
    const { result } = renderHook(() => usePagination(paginationData, ITEMS_PER_PAGE));
    expect(result.current.showedData).toStrictEqual(["test1", "test2", "test3"]);
    act(() => {
      result.current.next();
    });

    expect(result.current.showedData).toStrictEqual(["test4", "test5", "test6"]);
  });
});
