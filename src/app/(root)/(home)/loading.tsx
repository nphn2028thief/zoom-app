import Loading from "@/components/commons/Loading";

const HomeLoading = () => {
  return (
    <div className="h-full relative">
      <Loading className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
};

export default HomeLoading;
