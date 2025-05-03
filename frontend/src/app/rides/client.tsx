'use client';

import { useGetSearchedRides } from '@/api/hooks/useUserAPI';
import { GetSearchedRidesParams, RideStatus } from '@/api/lib/user';
import { Typography } from '@/components/atoms/Typography';
import SectionContainer from '@/components/layout/SectionContainer';
import { OnSelectAddressProps } from '@/components/molecules/AddressAutocompleteInput/AddressAutocompleteInput';
import { RideCard, RideCardProps } from '@/components/molecules/RideCard';
import { RidesFilters, RidesFiltersType } from '@/components/molecules/RidesFilters';
import { SearchRides } from '@/components/molecules/SearchRides';
import { SearchedRide } from '@/interfaces/ride';
import { DEFAULT_AVATAR_URL } from '@/interfaces/user';
import { isCarGreen } from '@/utils/car';
import { AddressItemLight } from '@/utils/openStreetMap';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';

const rideApiToRideCard = (apiRide: SearchedRide): RideCardProps => {
  const isGreen = isCarGreen(apiRide.car);
  const duration = new Date(apiRide.arrivalDate).getTime() - new Date(apiRide.departureDate).getTime();
  const seatsLeft = apiRide.car.seats - (apiRide.reservedSeats ?? 0);

  return {
    id: apiRide.id,
    arrivalCity: apiRide.arrivalLocation.city ?? '',
    departureCity: apiRide.departureLocation.city ?? '',
    arrivalDate: apiRide.arrivalDate,
    departureDate: apiRide.departureDate,
    driverImage: apiRide.driver?.avatarUrl ?? DEFAULT_AVATAR_URL,
    driverName: apiRide.driver?.username,
    driverRate: apiRide.driver?.rate ?? undefined,
    duration,
    isGreen,
    price: apiRide.price,
    seatsLeft
  };
};

const filterRides = (rides: SearchedRide[], filters: RidesFiltersType): SearchedRide[] => {
  return rides.filter((ride) => {
    const duration = new Date(ride.arrivalDate).getTime() - new Date(ride.departureDate).getTime();
    let isValid = true;

    if (filters.price !== undefined) {
      isValid = isValid && ride.price <= filters.price;
    }

    if (filters.duration !== undefined) {
      isValid = isValid && duration <= filters.duration * 60 * 60 * 1000;
    }

    if (filters.driverRating !== undefined) {
      isValid = isValid && (ride.driver.rate === null || ride.driver.rate >= filters.driverRating);
    }

    const isGreen = isCarGreen(ride.car);
    if (filters.isGreen !== undefined) {
      isValid = isValid && isGreen === filters.isGreen;
    }

    return isValid;
  });
};

export default function RidesPageClient() {
  const [initialArrival, setInitialArrival] = useState<AddressItemLight | undefined>(undefined);
  const [departure, setDeparture] = useState<AddressItemLight | undefined>(undefined);
  const [arrival, setArrival] = useState<AddressItemLight | undefined>(undefined);
  const [departureDate, setDepartureDate] = useState<Date | undefined>(undefined);
  const [appliedFilters, setAppliedFilters] = useState<RidesFiltersType>({});
  const [selectedDepartureAddress, setSelectedDepartureAddress] = useState<AddressItemLight | undefined>(undefined);
  const [selectedArrivalAddress, setSelectedArrivalAddress] = useState<AddressItemLight | undefined>(undefined);
  const [selectedDepartureDate, setSelectedDepartureDate] = useState<Date | undefined>(undefined);
  const [searchRidesParams, setSearchRidesParams] = useState<GetSearchedRidesParams | undefined>(undefined);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: ridesResponse, refetch } = useGetSearchedRides({
    ...searchRidesParams,
    statuses: [RideStatus.UPCOMING],
    onlyAvailable: true,
    onlyInTheFuture: true
  });

  const { rides: apiRides, fallbackRide } = ridesResponse ?? { rides: [], fallbackRide: undefined };

  useEffect(() => {
    try {
      const departureParams = searchParams.get('departure');
      const arrivalParams = searchParams.get('arrival');
      const departureDateParams = searchParams.get('departureDate');
      const initialArrivalParams = searchParams.get('initialArrival');

      let newSearchParams: GetSearchedRidesParams = {};

      if (initialArrivalParams) {
        const parsedInitialArrival = JSON.parse(decodeURIComponent(initialArrivalParams)) as AddressItemLight;
        setInitialArrival(parsedInitialArrival);
        newSearchParams = {
          arrivalLatitude: parsedInitialArrival?.lat ? Number(parsedInitialArrival.lat) : undefined,
          arrivalLongitude: parsedInitialArrival?.lon ? Number(parsedInitialArrival.lon) : undefined
        };
      } else {
        if (departureParams) {
          const parsedDeparture = JSON.parse(decodeURIComponent(departureParams)) as AddressItemLight;
          setDeparture(parsedDeparture);
          newSearchParams.departureLatitude = parsedDeparture?.lat ? Number(parsedDeparture.lat) : undefined;
          newSearchParams.departureLongitude = parsedDeparture?.lon ? Number(parsedDeparture.lon) : undefined;
        }

        if (arrivalParams) {
          const parsedArrival = JSON.parse(decodeURIComponent(arrivalParams)) as AddressItemLight;
          setArrival(parsedArrival);
          newSearchParams.arrivalLatitude = parsedArrival?.lat ? Number(parsedArrival.lat) : undefined;
          newSearchParams.arrivalLongitude = parsedArrival?.lon ? Number(parsedArrival.lon) : undefined;
        }

        if (departureDateParams) {
          const parsedDate = new Date(departureDateParams);
          setDepartureDate(parsedDate);
          newSearchParams.departureDate = parsedDate;
        }
      }

      setSearchRidesParams(newSearchParams);
    } catch (error) {
      console.error('Error parsing URL parameters:', error);
    }
  }, [searchParams]);

  const onSearch = () => {
    const newSearchParams = new URLSearchParams();

    if (selectedDepartureAddress) {
      newSearchParams.set('departure', encodeURIComponent(JSON.stringify(selectedDepartureAddress)));
    }
    if (selectedArrivalAddress) {
      newSearchParams.set('arrival', encodeURIComponent(JSON.stringify(selectedArrivalAddress)));
    }
    if (selectedDepartureDate) {
      newSearchParams.set('departureDate', selectedDepartureDate.toISOString());
    }

    newSearchParams.delete('initialArrival');

    router.push(`/rides?${newSearchParams.toString()}`);
  };

  const onFiltersChange = (filters: RidesFiltersType) => {
    setAppliedFilters(filters);
  };

  const onDetailClick = (id: string) => () => {
    router.push(`/rides/${id}`);
  };

  const onDepartureSelect = ({ rawAddress }: OnSelectAddressProps) => {
    setSelectedDepartureAddress(rawAddress);
  };

  const onArrivalSelect = ({ rawAddress }: OnSelectAddressProps) => {
    setSelectedArrivalAddress(rawAddress);
  };

  const onDateSelect = (date: Date | undefined) => {
    setSelectedDepartureDate(date);
  };

  useEffect(() => {
    refetch();
  }, [searchRidesParams]);

  const filteredRides = useMemo(() => {
    return filterRides(apiRides, appliedFilters);
  }, [appliedFilters, apiRides]);

  const rideCardData = useMemo(() => {
    return filteredRides.map((ride) => rideApiToRideCard(ride));
  }, [filteredRides]);

  const renderRides = useMemo(() => {
    if (rideCardData.length > 0) {
      return (
        <>
          {rideCardData.map((ride) => {
            return <RideCard key={ride.id} {...ride} onDetailClick={onDetailClick(ride.id)} />;
          })}
        </>
      );
    } else if (fallbackRide) {
      const departure = dayjs(fallbackRide.departureDate);
      const formattedDepartureDate = departure.format('dddd D MMMM YYYY');
      return (
        <Typography variant="cardTitleSm" align="center">
          {`Aucun trajet ne correspond à votre recherche pour cette date.`}
          <br /> {`Cependant, un trajet similaire est disponible le ${formattedDepartureDate}`}
        </Typography>
      );
    } else {
      return <Typography variant="h3">Aucun résultat trouvé pour votre recherche</Typography>;
    }
  }, [rideCardData, fallbackRide]);

  return (
    <>
      <SearchRides
        arrival={initialArrival ?? arrival}
        departure={departure}
        departureDate={departureDate}
        onSearch={onSearch}
        onDepartureSelect={onDepartureSelect}
        onArrivalSelect={onArrivalSelect}
        onDateSelect={onDateSelect}
      />
      <SectionContainer className="flex flex-col gap-5 my-10">
        <RidesFilters onFiltersChange={onFiltersChange} />
        <div className="flex flex-col gap-5">
          <Typography variant="h3" tag="h2">
            Résultat(s) de la recherche
          </Typography>
          {renderRides}
        </div>
      </SectionContainer>
    </>
  );
}
