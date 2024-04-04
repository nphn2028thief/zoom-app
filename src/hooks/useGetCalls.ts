import { useEffect, useState } from "react";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

import { TMeetingCallType } from "@/types/meeting";

const useGetCalls = (type: TMeetingCallType) => {
  const [upcomingCalls, setUpcomingCalls] = useState<Call[]>([]);
  const [calls, setCalls] = useState<Call[]>([]);
  const [endedCalls, setEndedCalls] = useState<Call[]>([]);

  const { user } = useUser();
  const client = useStreamVideoClient();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["getCalls"],
    queryFn: async () => {
      if (!client || !user) return;

      const { calls } = await client.queryCalls({
        sort: [
          {
            field: "starts_at",
            direction: type === "upcoming" ? 1 : -1, // Ascend sort
          },
        ],
        filter_conditions: {
          starts_at: { $exists: true },
          $or: [
            {
              created_by_user_id: user.id,
            },
            {
              members: { $in: [user.id] },
            },
          ],
        },
      });

      return calls;
    },
    retry: 0,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data && data.length) {
      const now = new Date();

      setUpcomingCalls(
        data.filter(({ state: { startsAt } }) => {
          return startsAt && new Date(startsAt) > now;
        })
      );

      // Previous calls
      setEndedCalls(
        data.filter(({ state: { startsAt, endedAt } }) => {
          return (startsAt && new Date(startsAt) < now) || !!endedAt;
        })
      );

      // // Recordings calls
      setCalls(data);
    }
  }, [data]);

  return {
    upcomingCalls,
    endedCalls,
    recordingsCalls: calls,
    isLoading,
    isFetching,
  };
};

export default useGetCalls;
