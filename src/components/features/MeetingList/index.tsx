"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import ReactDatePicker from "react-datepicker";
import { useQueryClient } from "@tanstack/react-query";

import MeetingItem from "./MeetingItem";
import MeetingModal from "@/components/modals/MeetingModal";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { getMeetingLink, meetingList } from "@/constants/meeting";
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

  const queryClient = useQueryClient();

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

      queryClient.invalidateQueries({ queryKey: ["getCalls"] });
    } catch (error) {
      console.log("error: ", error);
      toast({
        title: "Create meeting failure!",
      });
    }
  }, [
    client,
    queryClient,
    router,
    toast,
    user,
    values.dateTime,
    values.description,
  ]);

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

      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        title="Type the link here!"
        buttonText="join meeting"
        className="text-center"
        onSubmit={() => router.push(values.link)}
        onClose={onClose}
      >
        <Input
          placeholder="Meeting link"
          className="bg-dark-3 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
        />
      </MeetingModal>

      {callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isSCheduleMeeting"}
          title="Meeting created"
          imgUrl="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="copy meeting link"
          className="text-center"
          onSubmit={() => {
            const meetingLink = getMeetingLink(callDetails.id);
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link copied!" });
          }}
          onClose={onClose}
        />
      ) : (
        <MeetingModal
          isOpen={meetingState === "isSCheduleMeeting"}
          title="Create meeting"
          onSubmit={handleCreateMeeting}
          onClose={onClose}
        >
          <form action="" className="flex flex-col gap-2.5">
            <div className="flex flex-col gap-2 5">
              <label
                htmlFor="description"
                className="text-sky-2 leading-[22px]"
              >
                Add a description
              </label>
              <Textarea
                id="description"
                className="bg-dark-3 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                onChange={(e) =>
                  setValues({ ...values, description: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2 5">
              <label htmlFor="datetime" className="text-sky-2 leading-[22px]">
                Select Date and Time
              </label>
              <ReactDatePicker
                selected={values.dateTime}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15} // 15 minues
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full p-2 bg-dark-3 rounded focus:outline-none"
                onChange={(date) => setValues({ ...values, dateTime: date! })}
              />
            </div>
          </form>
        </MeetingModal>
      )}
    </section>
  );
};

export default MeetingList;
