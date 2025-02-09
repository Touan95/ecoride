'use client';

import { Typography } from '@/components/atoms/Typography';
import SectionContainer from '@/components/layout/SectionContainer';
import { RideCard, RideCardProps } from '@/components/molecules/RideCard';
import { SearchRides } from '@/components/molecules/SearchRides';

const rideDataExemple: RideCardProps = {
  driverName: 'John',
  driverImage: 'https://cdn.sanity.io/images/87dmpjr7/production/538bf74e8ed2d58ca18713ec29cf52d834230e12-920x1000.png',
  price: 100,
  isGreen: true,
  seatsLeft: 1,
  driverRate: 4.3,
  arrivalDate: new Date('December 17, 2025 03:24:00'),
  departureDate: new Date('December 17, 2026 03:24:00'),
  onDetailClick: () => console.log('clicked')
};

const rides = [
  rideDataExemple,
  { ...rideDataExemple, isGreen: false },
  rideDataExemple,
  { ...rideDataExemple, isGreen: false },
  { ...rideDataExemple, isGreen: false },
  rideDataExemple,
  rideDataExemple
];

export default function Rides() {
  return (
    <>
      <SearchRides />
      <SectionContainer className="flex flex-col gap-5 my-10">
        <div className="flex flex-col gap-5">
          <Typography variant="h3">Résultat(s) de la recherche</Typography>
          {rides.map((ride, index) => {
            return <RideCard key={index} {...ride} />;
          })}
        </div>
      </SectionContainer>
    </>
  );
}
