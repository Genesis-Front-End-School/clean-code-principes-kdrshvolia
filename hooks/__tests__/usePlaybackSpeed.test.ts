import { fireEvent, renderHook } from "@testing-library/react";
import { usePlaybackSpeed } from "../usePlaybackSpeed";

interface VideoRef {
  current: HTMLVideoElement | null;
}

describe("usePlaybackSpeed", () => {
  const videoRef: VideoRef = {
    current: {
      playbackRate: 1,
    } as HTMLVideoElement,
  };

  test("Increases playback speed correctly", () => {
    renderHook(() => usePlaybackSpeed({ videoRef }));

    fireEvent.keyDown(window, { key: "38", code: "ArrowUp", altKey: true });

    expect(videoRef?.current?.playbackRate).toBe(1.5);
  });

  test("Decreases playback speed correctly", () => {
    renderHook(() => usePlaybackSpeed({ videoRef }));

    fireEvent.keyDown(window, { key: "40", code: "ArrowDown", altKey: true });

    expect(videoRef?.current?.playbackRate).toBe(0.5);
  });
});
