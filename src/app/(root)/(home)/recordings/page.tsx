import MeetingCallList from "@/components/features/MeetingCallList";

function RecordingPage() {
  return (
    <section className="size-full flex flex-col gap-[30px] lg:gap-9">
      <h1 className="text-3xl font-bold">Recording</h1>
      <MeetingCallList type="recordings" />
    </section>
  );
}

export default RecordingPage;
