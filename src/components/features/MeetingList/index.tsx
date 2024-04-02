"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

import MeetingItem from "./MeetingItem";
import MeetingModal from "@/components/modals/MeetingModal";
import { useToast } from "@/components/ui/use-toast";
import { meetingList } from "@/constants/meeting";
import { EPath } from "@/constants/path";
import { TMeetingState } from "@/types/meeting";

const MeetingList = () => {
  const router = useRouter();

  const [meetingState, setMeetingState] = useState<TMeetingState>();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setcallDetails] = useState<Call>();

  const { user } = useUser();
  const client = useStreamVideoClient();

  const { toast } = useToast();

  const handleCreateMeeting = useCallback(async () => {
    if (!user || !client) return;

    try {
      if (!values.dateTime) {
        toast({
          title: "Please select a date and time!",
        });

        return;
      }

      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Create call failure!");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setcallDetails(call);

      if (!values.description) {
        router.push(`${EPath.MEETING}/${call.id}`);
      }

      toast({
        title: "Meeting created!",
      });
    } catch (error) {
      console.log("error: ", error);
      toast({
        title: "Create meeting failure!",
      });
    }
  }, [client, router, toast, user, values.dateTime, values.description]);

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
