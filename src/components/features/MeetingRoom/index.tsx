"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { LayoutList, Users } from "lucide-react";

import EndCallButton from "../EndCallButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Loading from "@/components/commons/Loading";
import { EPath } from "@/constants/path";
import { cn } from "@/lib/utils";
import { TLayout } from "@/types/meeting";

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [layout, setLayout] = useState<TLayout>("speaker-right");
  const [showParticipants, setShowParticipants] = useState<boolean>(false);

  const layouts = useRef<TLayout[]>(["grid", "speaker-left", "speaker-right"]);

  const isPersonalRoom = !!searchParams.get("personal");

  const { useCallCallingState } = useCallStateHooks();
  const callCallingState = useCallCallingState();

  if (callCallingState !== CallingState.JOINED) {
    return <Loading />;
  }

  const CallLayout = (): JSX.Element => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition="left" />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="right" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="w-full h-screen relative pt-4 text-white overflow-hidden">
      <div className="size-full relative flex justify-center items-center">
        <div className="max-w-[calc(100%-32px)] w-[1000px] h-full flex items-center">
          <CallLayout />
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] hidden ml-2", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      <div className="max-w-[calc(100%-32px)] w-full fixed left-4 bottom-4 flex justify-center items-center gap-5 flex-wrap">
        <CallControls onLeave={() => router.push(EPath.HOME)} />

        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="px-4 py-2 bg-[#19232d] hover:bg-[#4c535b] rounded-2xl cursor-pointer">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent className="text-white bg-dark-1 border-dark-1">
            {layouts.current.map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    setLayout(item.toLowerCase() as TLayout);
                  }}
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-dark-1" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="px-4 py-2 bg-[#19232d] hover:bg-[#4c535b] rounded-2xl cursor-pointer">
            <Users size={20} className="text-white" />
          </div>
        </button>

        {isPersonalRoom ? null : <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;
