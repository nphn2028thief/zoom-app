"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import MeetingItem from "./MeetingItem";
import { meetingList } from "@/constants/meeting";
import { TMeetingState } from "@/types/meeting";

const MeetingList = () => {
  const router = useRouter();

  const [meetingState, setMeetingState] = useState<TMeetingState>();

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {meetingList.map((item) => (
        <MeetingItem
          key={item.id}
          data={item}
          onClick={() =>
            item.state
              ? setMeetingState("isSCheduleMeeting")
              : router.push(item.path!)
          }
        />
      ))}
    </section>
  );
};

export default MeetingList;
