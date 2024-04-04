"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useQuery } from "@tanstack/react-query";

import MeetingCallItem from "./MeetingCallItem";
import Loading from "@/components/commons/Loading";
import { EPath } from "@/constants/path";
import useGetCalls from "@/hooks/useGetCalls";
import { TMeetingCallType } from "@/types/meeting";

interface IProps {
  type: TMeetingCallType;
}

const MeetingCallList = ({ type }: IProps) => {
  const router = useRouter();

  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const [typeState, setTypeState] = useState<TMeetingCallType>(type);

  const { upcomingCalls, endedCalls, recordingsCalls, isLoading, isFetching } =
    useGetCalls();

  // Reset type
  useEffect(() => {
    if (type) {
      setTypeState(type);
    }
  }, [type]);

  const getCalls = (): Call[] | CallRecording[] => {
    switch (typeState) {
      case "upcoming":
        return upcomingCalls;
      case "ended":
        return endedCalls;
      case "recordings":
        return recordings;
      default:
        return [];
    }
  };

  const getNoCallsMessage = (): string => {
    switch (typeState) {
      case "upcoming":
        return "No Upcoming Calls";
      case "ended":
        return "No Previous Calls";
      case "recordings":
        return "No Recordings Calls";
      default:
        return "";
    }
  };

  const getMeetingIcon = (): string => {
    switch (typeState) {
      case "upcoming":
        return "/icons/upcoming.svg";
      case "ended":
        return "/icons/previous.svg";
      case "recordings":
        return "/icons/recordings.svg";
      default:
        return "";
    }
  };

  const {
    data,
    isLoading: isLoadingRecordings,
    isFetching: isFetchingRecordings,
  } = useQuery({
    queryKey: ["getRecordingsCalls", recordingsCalls.length],
    queryFn: async () => {
      const queryRecordings = await Promise.all(
        recordingsCalls.map((item) => item.queryRecordings())
      );

      return queryRecordings;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    enabled: typeState === "recordings",
    retry: 0,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      const recordings = data
        .filter((item) => item.recordings.length > 0)
        .flatMap((item) => item.recordings);

      setRecordings(recordings);
    }
  }, [data]);

  if (isLoading || isFetching || isLoadingRecordings || isFetchingRecordings) {
    return (
      <div className="h-full relative">
        <Loading className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
    );
  }

  const handleRenderBody = () => {
    const calls = getCalls();

    if (calls && calls.length > 0) {
      return calls.map((item: Call | CallRecording, index) => (
        <MeetingCallItem
          key={index}
          title={(item as Call).state?.custom.description || "No description"}
          date={
            (item as Call).state?.startsAt?.toLocaleString() ||
            (item as CallRecording).start_time.toLocaleString()
          }
          icon={getMeetingIcon()}
          isPreviousMeeting={typeState === "ended" ? true : false}
          buttonIcon={
            typeState === "recordings" ? "/icons/play.svg" : undefined
          }
          buttonText={typeState === "recordings" ? "Play" : "Start"}
          link={
            typeState === "recordings"
              ? (item as CallRecording).url
              : `${window.location.origin}${EPath.MEETING}/${(item as Call).id}`
          }
          onClick={() =>
            typeState === "recordings"
              ? router.push(`${(item as CallRecording).url}`)
              : router.push(`${EPath.MEETING}/${(item as Call).id}`)
          }
        />
      ));
    }

    return <h1>{getNoCallsMessage()}</h1>;
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
      {handleRenderBody()}
    </div>
  );
};

export default MeetingCallList;
