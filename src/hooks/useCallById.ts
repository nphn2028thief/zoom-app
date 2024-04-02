import { useEffect, useState } from "react";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

const useCallById = (id: string) => {
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState<boolean>(true);

  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client) return;

    const loadCall = async () => {
      const { calls } = await client.queryCalls({
        filter_conditions: {
          id,
        },
      });

      if (calls.length > 0) setCall(calls[0]);
      setIsCallLoading(false);
    };

    loadCall();
  }, [client, id]);

  return { call, isCallLoading };
};

export default useCallById;
