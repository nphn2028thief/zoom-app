"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getMeetingLinkPersonal } from "@/constants/meeting";
import { EPath } from "@/constants/path";
import useGetCallById from "@/hooks/useGetCallById";

function PersonalRoomPage() {
  const router = useRouter();

  const { user } = useUser();

  const client = useStreamVideoClient();

  const { toast } = useToast();

  const { call } = useGetCallById(user?.id!);

  const startRoom = async () => {
    if (!client || !user) return;

    if (!call) {
      const newCall = client.call("default", user.id!);

      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`${EPath.MEETING}/${user.id}?personal=true`);
  };

  return (
    <section className="size-full flex flex-col gap-[30px] lg:gap-9">
      <h1 className="text-3xl font-bold">Personal Room</h1>

      <div className="grid grid-cols-1 gap-8">
        <div className="flex flex-col xl:flex-row gap-2">
          <h1 className="lg:text-xl font-medium text-sky-1">Topic:</h1>
          <p className="text-sm lg:text-lg font-bold truncate">{`${user?.firstName} ${user?.lastName}'s meeting room`}</p>
        </div>
        <div className="flex flex-col xl:flex-row gap-2">
          <h1 className="lg:text-xl font-medium text-sky-1">Meeting ID:</h1>
          <p className="text-sm lg:text-lg font-bold truncate">{user?.id}</p>
        </div>
        <div className="flex flex-col xl:flex-row gap-2">
          <h1 className="lg:text-xl font-medium text-sky-1">Invite Link:</h1>
          <p className="text-sm lg:text-lg font-bold truncate">
            {getMeetingLinkPersonal(user?.id!)}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <Button className="w-full bg-blue-1 capitalize" onClick={startRoom}>
            start meeting
          </Button>
          <Button
            className="w-full bg-dark-3 capitalize"
            onClick={() => {
              navigator.clipboard.writeText(getMeetingLinkPersonal(user?.id!));
              toast({ title: "Link copied!" });
            }}
          >
            copy invitation
          </Button>
        </div>
      </div>
    </section>
  );
}

export default PersonalRoomPage;
