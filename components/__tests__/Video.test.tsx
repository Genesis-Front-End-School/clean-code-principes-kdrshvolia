import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Video, VideoProps } from "../Video";

const playStub = jest
  .spyOn(window.HTMLVideoElement.prototype, "play")
  .mockImplementation(() => Promise.resolve());

const pauseStub = jest
  .spyOn(window.HTMLVideoElement.prototype, "pause")
  .mockImplementation(() => Promise.resolve());

describe("<Video />", () => {
  const TEST_PROPS: VideoProps = {
    src: "https://testsrcurl.com",
    playMutedOnHover: true,
  };

  test("Plays and pauses video on hover if playMutedOnHover set to true", () => {
    const { container } = render(
      <Video
        src={TEST_PROPS.src}
        playMutedOnHover={TEST_PROPS.playMutedOnHover}
      />
    );
    const video = container.querySelector("video") as HTMLVideoElement;

    fireEvent.mouseOver(video);

    expect(playStub).toHaveBeenCalled();

    fireEvent.mouseOut(video);

    expect(pauseStub).toHaveBeenCalled();
  });

});
