"use client";

import Image from "next/image";

import { IMeeting } from "@/types/meeting";

interface IProps {
  data: IMeeting;
  onClick: () => void;
}

const MeetingItem = (props: IProps) => {
  const { data, onClick } = props;

  return (
    <div
      className={`min-h-[260px] flex flex-col justify-between px-4 py-6 rounded-[14px] cursor-pointer ${data.background}`}
      onClick={onClick}
    >
      <div className="size-12 flex justify-center items-center glassmorphism rounded-[10px]">
        <Image src={data.imgUrl} alt={data.alt} width={28} height={28} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold capitalize">{data.label}</h1>
        <div className="font-normal">{data.description}</div>
      </div>
    </div>
  );
};

export default MeetingItem;
