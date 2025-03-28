import { SearchedRide } from "../../../../entities/ride.entity";
import { PointDistanceFilter, RideRepositoryInterface } from "../../../../repositories/ride.repository";

interface GetSearchedRidesService {
  arrivalLatitude?: number,
  arrivalLongitude?: number, 
  departureDate?: Date, 
  departureLatitude?: number, 
  departureLongitude?: number,
  rideRepository: RideRepositoryInterface;
}

const DISTANCE_RADIUS_KM = 5

export const service = ({
  arrivalLatitude,
  arrivalLongitude,
  departureDate,
  departureLatitude,
  departureLongitude,
  rideRepository
}: GetSearchedRidesService): Promise<SearchedRide[]> => {

  const distanceFilter: PointDistanceFilter = {
    arrival: (arrivalLatitude && arrivalLongitude) ? {
      latitude: arrivalLatitude,
      longitude: arrivalLongitude,
      radiusKm: DISTANCE_RADIUS_KM
    } : undefined,
    departure: (departureLatitude && departureLongitude) ? {
      latitude: departureLatitude,
      longitude: departureLongitude,
      radiusKm: DISTANCE_RADIUS_KM
    } : undefined
  }

  return rideRepository.getAllForSearch({ departureDate, distanceFilter });
};
