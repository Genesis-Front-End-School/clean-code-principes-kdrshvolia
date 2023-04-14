import { act, renderHook } from "@testing-library/react";
import { useTimestamp } from "../useTimestamp";

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: function (key) {
      return store[key];
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    clear: function () {
      store = {};
    },
    removeItem: function (key) {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("useTimestamp", () => {
  const src = "test src";
  const videoRef = {
    current: {
      duration: 60,
      currentTime: 0,
    },
  };

  const event = {
    target: { currentTime: 8 },
  };

  test("Set default timestamp correctly", () => {
    const { result } = renderHook(() => useTimestamp({ src, videoRef }));
    expect(result.current.timeStamp).toBe(0);
  });

  test("Set timestamp correctly", () => {
    const { result } = renderHook(() => useTimestamp({ src, videoRef }));
    act(() => {
      result.current.handlePlayVideo();
    });
    act(() => {
      result.current.handlePauseVideo(event);
    });
    expect(result.current.timeStamp).toBe(8);
  });
});
