"use client";

import Loading from "@/components/commons/Loading";
import MeetingList from "@/components/features/MeetingList";
import { locales, options } from "@/constants/date";
import useGetCalls from "@/hooks/useGetCalls";

function Home() {
  const { upcomingCalls, isLoading, isFetching } = useGetCalls("upcoming");

  const time = new Date().toLocaleTimeString("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit",
    minute: "2-digit",
  });

  const date = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
  }).format(new Date());

  if (isLoading || isFetching) {
    return (
      <div className="h-full relative">
        <Loading className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
    );
  }

  return (
    <section className="size-full flex flex-col gap-10">
      <div className="w-full h-[240px] lg:h-[300px] bg-hero bg-cover bg-center rounded-[20px]">
        <div className="h-full flex flex-col justify-between max-lg:px-5 max-lg:py-8 lg:p-9">
          <h2 className="w-fit glassmorphism font-normal text-center px-4 py-2 rounded">
            {upcomingCalls && upcomingCalls.length
              ? `Upcoming Meeting at: ${upcomingCalls[
                  upcomingCalls.length - 1
                ]?.state?.startsAt?.toLocaleString(locales, options)}`
              : `No Upcoming Meeting!`}
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg lg:text-2xl font-medium text-sky-1">{date}</p>
          </div>
        </div>
      </div>
      <MeetingList />
    </section>
  );
}

export default Home;
