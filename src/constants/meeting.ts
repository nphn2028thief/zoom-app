import { EPath } from "./path";
import { IMeeting } from "@/types/meeting";

export const meetingList: IMeeting[] = [
  {
    id: 1,
    imgUrl: "/icons/personal.svg",
    alt: "add meeting icon",
    label: "new meeting",
    description: "Start an instant meeting",
    state: "isInstantMeeting",
    background: "bg-orange-1",
  },
  {
    id: 2,
    imgUrl: "/icons/join-meeting.svg",
    alt: "join meeting",
    label: "join meeting",
    description: "Via invitation link",
    state: "isJoiningMeeting",
    background: "bg-blue-1",
  },
  {
    id: 3,
    imgUrl: "/icons/schedule.svg",
    alt: "schedule meeting icon",
    label: "schedule meeting",
    description: "Plan your meeting",
    state: "isSCheduleMeeting",
    background: "bg-purple-1",
  },
  {
    id: 4,
    imgUrl: "/icons/recordings.svg",
    alt: "add meeting icon",
    label: "view recordings",
    description: "Meeting recordings",
    path: EPath.RECORDINGS,
    background: "bg-yellow-1",
  },
];

export const avatarImages: string[] = [
  "/images/avatar-1.jpeg",
  "/images/avatar-2.jpeg",
  "/images/avatar-3.png",
  "/images/avatar-4.png",
  "/images/avatar-5.png",
];
