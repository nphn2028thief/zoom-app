import MeetingList from "@/components/features/MeetingList";

function Home() {
  const time = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const date = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
  }).format(new Date());

  return (
    <section className="size-full flex flex-col gap-10">
      <div className="w-full h-[300px] bg-hero bg-cover rounded-[20px]">
        <div className="h-full flex flex-col justify-between max-lg:px-5 max-lg:py-8 lg:p-9">
          <h2 className="max-w-[270px] glassmorphism font-normal text-center py-2 rounded">
            Upcoming Meeting at: 12:30 PM
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
