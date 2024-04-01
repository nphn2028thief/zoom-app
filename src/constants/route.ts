import { IRoute } from "@/types/route";
import { EPath } from "./path";

export const CRoute: IRoute[] = [
  {
    id: 1,
    label: "home",
    href: EPath.HOME,
    imgUrl: "/icons/home.svg",
  },
  {
    id: 2,
    label: "upcoming",
    href: EPath.UPCOMING,
    imgUrl: "/icons/upcoming.svg",
  },
  {
    id: 3,
    label: "previous",
    href: EPath.PREVIOUS,
    imgUrl: "/icons/previous.svg",
  },
  {
    id: 4,
    label: "recordings",
    href: EPath.RECORDINGS,
    imgUrl: "/icons/video.svg",
  },
  {
    id: 5,
    label: "personal room",
    href: EPath.PERSONAL_ROOM,
    imgUrl: "/icons/personal.svg",
  },
];
