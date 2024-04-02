import Image from "next/image";

const Loading = () => {
  return (
    <div className="fixed inset-0">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Image
          src="/icons/loading-circle.svg"
          alt="Loading"
          width={48}
          height={48}
        />
      </div>
    </div>
  );
};

export default Loading;
