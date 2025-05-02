import { useGetRideDetails } from '@/api/hooks/useUserAPI';
import { defaultSeoValues } from '@/configs/siteSettings';
import { generatePageMetadata } from '@/utils/seo';
import { seoData, SEO_PAGES } from '@/utils/seoPages';
import dayjs from 'dayjs';
import { Metadata } from 'next';
import { useParams } from 'next/navigation';
import RideDetailsPageClient from './client';

export async function generateMetadata(): Promise<Metadata> {
  const { id: rideId } = useParams<{ id: string }>();
  const { data: ride } = useGetRideDetails(rideId);

  const title = ride
    ? `Détail du trajet ${ride.departureLocation.city} vers ${ride.arrivalLocation.city} le ${dayjs(ride.departureDate).format('DD/MM/YYYY')}`
    : seoData[SEO_PAGES.PUBLIC_RIDE_DETAIL].title;
  const description = ride
    ? `Consultez toutes les informations du trajet ${ride.departureLocation.city} vers ${ride.arrivalLocation.city} du ${dayjs(ride.departureDate).format('DD/MM/YYYY')}`
    : seoData[SEO_PAGES.PUBLIC_RIDE_DETAIL].description;

  const metadata = await generatePageMetadata({
    templateTitle: title,
    description: description,
    defaultMeta: defaultSeoValues
  });

  return metadata;
}

export default function RideDetailsPage() {
  return <RideDetailsPageClient />;
}
