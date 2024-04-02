"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";

import Loading from "@/components/commons/Loading";
import MeetingRoom from "@/components/features/MeetingRoom";
import MeetingSetup from "@/components/features/MeetingSetup";
import useCallById from "@/hooks/useCallById";
import { IParams } from "@/types";

const MeetingDetailPage = ({ params }: { params: IParams }) => {
  const { isLoaded } = useUser();

  const [isSetupComplete, setIsSetupComplete] = useState<boolean>(false);

  const { call, isCallLoading } = useCallById(params.id);

  if (!isLoaded || isCallLoading) {
    return <Loading />;
  }

  return (
    <main className="w-full h-screen">
      <StreamCall call={call}>
        <StreamTheme>
          {isSetupComplete ? (
            <MeetingRoom />
          ) : (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingDetailPage;
