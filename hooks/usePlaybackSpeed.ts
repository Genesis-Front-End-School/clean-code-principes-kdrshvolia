import { RefObject, useEffect, useState } from "react";

interface UsePlaybackSpeedProps {
  playbackStep?: number;
  maxPlaybackSpeed?: number;
  minPlaybackSpeed?: number;
  videoRef: RefObject<HTMLVideoElement> | null;
}


export const usePlaybackSpeed = ({
  playbackStep = 0.5,
  maxPlaybackSpeed = 2,
  minPlaybackSpeed = 0.5,
  videoRef,
}: UsePlaybackSpeedProps) => {
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  useEffect(() => {
    const increasePlayBackSpeed = (e: KeyboardEvent) => {
      if (
        e.altKey &&
        e.code === "ArrowUp" &&
        playbackSpeed < maxPlaybackSpeed &&
        videoRef?.current
      ) {
        e.preventDefault();
        setPlaybackSpeed(playbackSpeed + playbackStep);
      }
    };


    window.addEventListener("keydown", increasePlayBackSpeed);
    return () => {
      window.removeEventListener("keydown", increasePlayBackSpeed);
    };
  }, [playbackSpeed, setPlaybackSpeed]);

  useEffect(() => {
    const decreasePlaybackSpeed = (e: KeyboardEvent) => {
      if (
        e.altKey &&
        e.code === "ArrowDown" &&
        playbackSpeed > minPlaybackSpeed &&
        videoRef?.current
      ) {
        e.preventDefault();
        setPlaybackSpeed(playbackSpeed - playbackStep);
      }
    };

    window.addEventListener("keydown", decreasePlaybackSpeed);
    return () => {
      window.removeEventListener("keydown", decreasePlaybackSpeed);
    };
  }, [playbackSpeed, setPlaybackSpeed]);

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);
};
