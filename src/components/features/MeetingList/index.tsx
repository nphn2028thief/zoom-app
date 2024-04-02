"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import MeetingItem from "./MeetingItem";
import MeetingModal from "@/components/modals/MeetingModal";
import { meetingList } from "@/constants/meeting";
import { TMeetingState } from "@/types/meeting";

const MeetingList = () => {
  const router = useRouter();

  const [meetingState, setMeetingState] = useState<TMeetingState>();

  const handleCreateMeeting = useCallback(() => {}, []);

  const onClose = useCallback(() => setMeetingState(undefined), []);

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {meetingList.map((item) => (
        <MeetingItem
          key={item.id}
          data={item}
          onClick={() =>
            item.state ? setMeetingState(item.state) : router.push(item.path!)
          }
        />
      ))}

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        title="Start an Instant Meeting"
        buttonText="start meeting"
        className="text-center"
        onSubmit={handleCreateMeeting}
        onClose={onClose}
      />
    </section>
  );
};

export default MeetingList;
