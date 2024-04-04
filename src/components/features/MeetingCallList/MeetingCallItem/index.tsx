"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { avatarImages } from "@/constants/meeting";
import { cn } from "@/lib/utils";

interface IProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon?: string;
  buttonText?: string;
  link: string;
  onClick: () => void;
}

const MeetingCardItem = ({
  title,
  date,
  icon,
  isPreviousMeeting,
  buttonIcon,
  buttonText,
  link,
  onClick,
}: IProps) => {
  const { toast } = useToast();

  return (
    <section className="flex  w-full flex-col justify-between rounded-[14px] bg-dark-1 px-5 py-8 xl:max-w-[568px]">
      <article className="flex flex-col gap-5">
        <Image src={icon} alt="upcoming" width={28} height={28} />
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold truncate">{title}</h1>
          <p className="text-base font-normal">{date}</p>
        </div>
      </article>
      {isPreviousMeeting ? null : (
        <article className="flex justify-center items-center relative mt-7">
          <div className="relative flex w-full max-sm:hidden">
            {avatarImages.map((item, index) => (
              <Image
                key={index}
                src={item}
                alt="attendees"
                width={40}
                height={40}
                className={cn("rounded-full", { absolute: index > 0 })}
                style={{ top: 0, left: index * 28 }}
              />
            ))}
            <div className="flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-dark-3 bg-dark-4">
              +5
            </div>
          </div>
          {!isPreviousMeeting && (
            <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
              <Button
                onClick={onClick}
                className="gap-1 rounded bg-blue-1 px-6"
              >
                {buttonIcon && (
                  <Image
                    src={buttonIcon}
                    alt="feature"
                    width={20}
                    height={20}
                  />
                )}
                {buttonText}
              </Button>
              <Button
                className="gap-1 px-6 bg-dark-4"
                onClick={() => {
                  navigator.clipboard.writeText(link);
                  toast({
                    title: "Link Copied",
                  });
                }}
              >
                <Image
                  src="/icons/copy.svg"
                  alt="feature"
                  width={20}
                  height={20}
                />
                Copy Link
              </Button>
            </div>
          )}
        </article>
      )}
    </section>
  );
};

export default MeetingCardItem;
