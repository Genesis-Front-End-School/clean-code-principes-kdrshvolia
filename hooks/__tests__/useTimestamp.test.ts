import { act, renderHook } from "@testing-library/react";
import { useTimestamp } from "../useTimestamp";
import { SyntheticEvent } from "react";

interface VideoRef {
  current: HTMLVideoElement | null;
}

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: function (key: string) {
      return store[key];
    },
    setItem: function (key: string, value: string) {
      store[key] = value.toString();
    },
    clear: function () {
      store = {};
    },
    removeItem: function (key: string) {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("useTimestamp", () => {
  const src = "test src";
  const videoRef: VideoRef = {
    current: {
      duration: 60,
      currentTime: 0,
    } as HTMLVideoElement,
  };

  test("Sets default timestamp correctly", () => {
    const { result } = renderHook(() => useTimestamp({ src, videoRef }));

    expect(result.current.timeStamp).toBe(0);
  });

  test("Sets timestamp correctly", () => {
    const event = {
      target: { currentTime: 8 },
    };

    const { result } = renderHook(() => useTimestamp({ src, videoRef }));
    act(() => {
      result.current.handlePlayVideo();
    });
    act(() => {
      result.current.handlePauseVideo(
        event as unknown as SyntheticEvent<HTMLVideoElement, Event>
      );
    });

    expect(result.current.timeStamp).toBe(8);
  });

  test("Sets timestamp from localstorage", () => {
    localStorageMock.setItem('test src', "8");
    const { result } = renderHook(() => useTimestamp({ src, videoRef }));

    expect(result.current.timeStamp).toBe(8);
  });

  test("Sets video time to 0 if video is finished playing", () => {
    localStorageMock.setItem('test src', "60");

    const { result } = renderHook(() => useTimestamp({ src, videoRef }));

    act(() => {
      result.current.handlePlayVideo();
    });

    expect(videoRef.current?.currentTime).toBe(0);
  });
});
