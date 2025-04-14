import { RideStatus, SearchedRide } from '../../../../entities/ride.entity';
import {
  PointDistanceFilter,
  RideRepositoryInterface,
} from '../../../../repositories/ride.repository';

interface GetSearchedRidesService {
  arrivalLatitude?: number;
  arrivalLongitude?: number;
  departureDate?: Date;
  departureLatitude?: number;
  departureLongitude?: number;
  rideRepository: RideRepositoryInterface;
  statuses?: RideStatus[];
  onlyAvailable?: boolean;
  onlyInTheFuture?: boolean;
}

export interface GetSearchedRidesResponse {
  results: SearchedRide[];
  fallbackRide?: SearchedRide;
}

const DISTANCE_RADIUS_KM = 5;

export const service = async ({
  arrivalLatitude,
  arrivalLongitude,
  departureDate,
  departureLatitude,
  departureLongitude,
  rideRepository,
  statuses,
  onlyAvailable,
  onlyInTheFuture,
}: GetSearchedRidesService): Promise<GetSearchedRidesResponse> => {
  const distanceFilter: PointDistanceFilter = {
    arrival:
      arrivalLatitude && arrivalLongitude
        ? {
            latitude: arrivalLatitude,
            longitude: arrivalLongitude,
            radiusKm: DISTANCE_RADIUS_KM,
          }
        : undefined,
    departure:
      departureLatitude && departureLongitude
        ? {
            latitude: departureLatitude,
            longitude: departureLongitude,
            radiusKm: DISTANCE_RADIUS_KM,
          }
        : undefined,
  };

  const results = await rideRepository.getAllForSearch({
    departureDate,
    distanceFilter,
    statuses,
    onlyAvailable,
    onlyInTheFuture,
  });

  if (results.length === 0 && !!departureDate) {
    const ridesIgnoreDate = await rideRepository.getAllForSearch({
      distanceFilter,
      statuses,
      onlyAvailable,
      onlyInTheFuture,
    });
    return {
      results,
      fallbackRide: ridesIgnoreDate[0],
    };
  }

  return {
    results,
  };
};
