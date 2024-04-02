"use client";

import {
  DeviceSettings,
  VideoPreview,
  useCall,
} from "@stream-io/video-react-sdk";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isMicAndCamToggledOff, setIsMicAndCamToggledOff] =
    useState<boolean>(false);

  const call = useCall();

  if (!call) {
    throw new Error("Call currenly available!");
  }

  useEffect(() => {
    if (isMicAndCamToggledOff) {
      call.microphone.disable();
      call.camera.disable();
    } else {
      call.microphone.enable();
      call.camera.enable();
    }
  }, [call.camera, call.microphone, isMicAndCamToggledOff]);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-3 text-white">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="h-16 flex justify-center items-center gap-3">
        <label
          htmlFor="toggle"
          className="flex justify-center items-center gap-2 font-medium"
        >
          <input
            type="checkbox"
            id="toggle"
            checked={isMicAndCamToggledOff}
            onChange={(e) => setIsMicAndCamToggledOff(e.target.checked)}
          />
          Join with microphone and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="px-4 py-2.5 bg-green-500 rounded-md"
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
      >
        Join meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
