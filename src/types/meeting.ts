import { EPath } from "@/constants/path";

export interface IMeeting {
  id: number;
  imgUrl: string;
  alt: string;
  label: string;
  description: string;
  state?: TMeetingState;
  path?: EPath;
  background: string;
}

export type TMeetingState =
  | "isSCheduleMeeting"
  | "isJoiningMeeting"
  | "isInstantMeeting"
  | undefined;

export type TLayout = "grid" | "speaker-left" | "speaker-right";

export type TMeetingCallType = "upcoming" | "ended" | "recordings";
