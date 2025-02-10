'use client';

import { Typography } from '@/components/atoms/Typography';
import SectionContainer from '@/components/layout/SectionContainer';
import { RideCard, RideCardProps } from '@/components/molecules/RideCard';
import { RidesFilters, RidesFiltersType } from '@/components/molecules/RidesFilters';
import { SearchRides } from '@/components/molecules/SearchRides';
import { Ride } from '@/interfaces/ride';
import { useMemo, useState } from 'react';

const rideDataExemple: Ride = {
  driver: {
    image: 'https://cdn.sanity.io/images/87dmpjr7/production/538bf74e8ed2d58ca18713ec29cf52d834230e12-920x1000.png',
    username: 'John',
    rate: 4.3
  },
  price: 100,
  isGreen: true,
  seats: 3,
  reservedSeats: 2,
  arrivalDate: new Date('December 17, 2025 04:24:00'),
  departureDate: new Date('December 17, 2025 02:34:00'),
  duration: 5400000
};

const rideApiToRideCard = (apiRide: Ride): RideCardProps => {
  return {
    arrivalDate: apiRide.arrivalDate,
    departureDate: apiRide.departureDate,
    driverImage: apiRide.driver.image,
    driverName: apiRide.driver.username,
    driverRate: apiRide.driver.rate,
    duration: apiRide.duration,
    isGreen: apiRide.isGreen ?? false,
    onDetailClick: () => console.log('clicked'),
    price: apiRide.price,
    seatsLeft: apiRide.seats - (apiRide.reservedSeats ?? 0)
  };
};

const filterRides = (rides: Ride[], filters: RidesFiltersType): Ride[] => {
  return rides.filter((ride) => {
    let isValid = true;

    if (filters.price !== undefined) {
      isValid = isValid && ride.price <= filters.price;
    }

    if (filters.duration !== undefined) {
      isValid = isValid && ride.duration <= filters.duration * 60 * 60 * 1000;
    }

    if (filters.driverRating !== undefined) {
      isValid = isValid && ride.driver.rate >= filters.driverRating;
    }

    if (filters.isGreen !== undefined) {
      isValid = isValid && ride.isGreen === filters.isGreen;
    }

    return isValid;
  });
};

export default function Rides() {
  const [appliedFilters, setAppliedFilters] = useState<RidesFiltersType>({});

  const apiRides = [
    rideDataExemple,
    { ...rideDataExemple, isGreen: false },
    rideDataExemple,
    { ...rideDataExemple, isGreen: false },
    { ...rideDataExemple, isGreen: false },
    rideDataExemple,
    rideDataExemple
  ];

  const filteredRides = useMemo(() => {
    return filterRides(apiRides, appliedFilters);
  }, [appliedFilters, apiRides]);

  const rideCardData = useMemo(() => {
    return filteredRides.map((ride) => rideApiToRideCard(ride));
  }, [filteredRides]);

  const onFiltersChange = (filters: RidesFiltersType) => {
    setAppliedFilters(filters);
    console.log('🚀 ~ filters:', filters);
  };

  return (
    <>
      <SearchRides />
      <SectionContainer className="flex flex-col gap-5 my-10">
        <RidesFilters onFiltersChange={onFiltersChange} />
        <div className="flex flex-col gap-5">
          <Typography variant="h3">Résultat(s) de la recherche</Typography>
          {rideCardData.map((ride, index) => {
            return <RideCard key={index} {...ride} />;
          })}
        </div>
      </SectionContainer>
    </>
  );
}
