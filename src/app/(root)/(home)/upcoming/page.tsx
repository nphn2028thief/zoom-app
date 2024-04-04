import MeetingCallList from "@/components/features/MeetingCallList";

function UpcomingPage() {
  return (
    <section className="size-full flex flex-col gap-[30px] lg:gap-9">
      <h1 className="text-3xl font-bold">Upcoming Meetings</h1>
      <MeetingCallList type="upcoming" />
    </section>
  );
}

export default UpcomingPage;
