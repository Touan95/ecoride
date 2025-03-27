'use client';

import { useGetSearchedRides } from '@/api/hooks/useUserAPI';
import { GetSearchedRidesParams } from '@/api/lib/user';
import { Typography } from '@/components/atoms/Typography';
import SectionContainer from '@/components/layout/SectionContainer';
import { AddressItemLight } from '@/components/molecules/AddressAutocompleteInput/AddressAutocompleteInput';
import { RideCard, RideCardProps } from '@/components/molecules/RideCard';
import { RidesFilters, RidesFiltersType } from '@/components/molecules/RidesFilters';
import { SearchRides } from '@/components/molecules/SearchRides';
import { Ride, rideMock } from '@/interfaces/ride';
import { SearchRidesFormSchemaType } from '@/schemas/user';
import { isCarGreen } from '@/utils/car';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const rideApiToRideCard = (apiRide: Ride): RideCardProps => {
  const isGreen = isCarGreen(apiRide.car);
  return {
    arrivalDate: apiRide.arrivalDate,
    departureDate: apiRide.departureDate,
    driverImage: apiRide.driver.avatar,
    driverName: apiRide.driver.username,
    driverRate: apiRide.driver.rate,
    duration: apiRide.duration,
    isGreen,
    onDetailClick: () => console.log('clicked'),
    price: apiRide.price,
    seatsLeft: apiRide.car.seats - (apiRide.reservedSeats ?? 0)
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

    const isGreen = isCarGreen(ride.car);
    if (filters.isGreen !== undefined) {
      isValid = isValid && isGreen === filters.isGreen;
    }

    return isValid;
  });
};

export default function Rides() {
  const [appliedFilters, setAppliedFilters] = useState<RidesFiltersType>({});
  const [initialDeparture, setInitialDeparture] = useState<AddressItemLight | undefined>(undefined);
  const [searchRidesParams, setSearchRidesParams] = useState<GetSearchedRidesParams | undefined>(undefined);
  const router = useRouter();
  const searchParams = useSearchParams();
  const departureParams = searchParams.get('departure');
  const { data, refetch } = useGetSearchedRides({ ...searchRidesParams });
  console.log('🚀 ~ data:', data);

  const apiRides = [
    rideMock,
    { ...rideMock, isGreen: false },
    rideMock,
    { ...rideMock, isGreen: false },
    { ...rideMock, isGreen: false },
    rideMock,
    rideMock
  ];

  const filteredRides = useMemo(() => {
    return filterRides(apiRides, appliedFilters);
  }, [appliedFilters, apiRides]);

  const rideCardData = useMemo(() => {
    return filteredRides.map((ride) => rideApiToRideCard(ride));
  }, [filteredRides]);

  useEffect(() => {
    if (departureParams) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(departureParams as string));
        setInitialDeparture(parsedData);
      } catch (error) {
        console.error('Invalid data format', error);
      }
    }
  }, [departureParams]);

  const onFiltersChange = (filters: RidesFiltersType) => {
    setAppliedFilters(filters);
  };

  const onDetailClick = (id: string) => () => {
    router.push(`/rides/${id}`);
  };

  const onSearch = (params: SearchRidesFormSchemaType) => {
    setSearchRidesParams({
      departureLatitude: params.departureLocation?.coordinate.latitude,
      departureLongitude: params.departureLocation?.coordinate.longitude,
      arrivalLatitude: params.arrivalLocation?.coordinate.latitude,
      arrivalLongitude: params.arrivalLocation?.coordinate.longitude,
      departureDate: params.departureDate
    });
  };

  useEffect(() => {
    refetch();
  }, [searchRidesParams]);

  return (
    <>
      <SearchRides initialDeparture={initialDeparture} onSearch={onSearch} />
      <SectionContainer className="flex flex-col gap-5 my-10">
        <RidesFilters onFiltersChange={onFiltersChange} />
        <div className="flex flex-col gap-5">
          <Typography variant="h3">Résultat(s) de la recherche</Typography>
          {rideCardData.map((ride, index) => {
            return <RideCard key={index} {...ride} onDetailClick={onDetailClick(index.toString())} />;
          })}
        </div>
      </SectionContainer>
    </>
  );
}
