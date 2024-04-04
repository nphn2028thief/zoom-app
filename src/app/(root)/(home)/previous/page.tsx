import MeetingCallList from "@/components/features/MeetingCallList";

function PreviousPage() {
  return (
    <section className="size-full flex flex-col gap-[30px] lg:gap-9">
      <h1 className="text-3xl font-bold">Previous Meetings</h1>
      <MeetingCallList type="ended" />
    </section>
  );
}

export default PreviousPage;
