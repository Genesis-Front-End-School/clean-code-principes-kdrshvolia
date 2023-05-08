import { RefObject, SyntheticEvent, useEffect, useState } from "react";

interface UseTimestampProps {
  src: string;
  videoRef: RefObject<HTMLVideoElement> | null;
}

export const useTimestamp = ({ src, videoRef }: UseTimestampProps) => {
  const [timeStamp, setTimeStamp] = useState(0);
  useEffect(() => {
    const currentTimeStamp = Number(localStorage.getItem(src)) || 0;
    if (currentTimeStamp) {
      setTimeStamp(currentTimeStamp);
    }
  }, [src]);

  const handlePauseVideo = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    const target = e.target as HTMLVideoElement;
    localStorage.setItem(src, String(target.currentTime));
    setTimeStamp(target.currentTime);
  };

  const handlePlayVideo = () => {
    if (!videoRef) {
      return;
    }
    if (videoRef.current) {
      if (timeStamp < videoRef.current.duration) {
        videoRef.current.currentTime = timeStamp;
      } else {
        videoRef.current.currentTime = 0;
      }
    }
  };

  return {
    timeStamp,
    handlePauseVideo,
    handlePlayVideo,
  };
};
