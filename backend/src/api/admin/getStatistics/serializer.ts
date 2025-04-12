import { DailyStatistics } from "../../../entities/ride.entity";

interface SerializedStatistics {
  dailyStatistics: DailyStatistics[];
  totalCredits: number;
  totalRides: number;
}

export const serializer = (stats: DailyStatistics[]): SerializedStatistics => {
  return {
    dailyStatistics: stats,
    totalCredits: stats.reduce((acc, curr) => acc + curr.credits, 0),
    totalRides: stats.reduce((acc, curr) => acc + curr.rides, 0),
  };
};
