import { useGetOneReview, useGetRideDetails, useGetOneUser } from '@/api/hooks/useUserAPI';
import { defaultSeoValues } from '@/configs/siteSettings';
import { generatePageMetadata } from '@/utils/seo';
import { seoData, SEO_PAGES } from '@/utils/seoPages';
import { Metadata } from 'next';
import { useParams } from 'next/navigation';
import DisputeDetailPageClient from './client';

export async function generateMetadata(): Promise<Metadata> {
  const { id: reviewId } = useParams<{ id: string }>();
  const { data: review } = useGetOneReview(reviewId);
  const { data: ride } = useGetRideDetails(review?.rideId);
  const { data: passenger } = useGetOneUser(review?.userId);

  const title =
    ride && passenger
      ? `Litige : ${ride.departureLocation.city} -> ${ride.arrivalLocation.city} par ${passenger?.username}`
      : seoData[SEO_PAGES.STAFF_DISPUTE_DETAIL].title;
  const description =
    ride && passenger
      ? `Litige laissé par ${passenger?.username} sur le trajet ${ride.departureLocation.city} - ${ride.arrivalLocation.city}`
      : seoData[SEO_PAGES.STAFF_DISPUTE_DETAIL].description;

  const metadata = await generatePageMetadata({
    templateTitle: title,
    description: description,
    defaultMeta: defaultSeoValues,
    noIndex: true,
    noFollow: true
  });

  return metadata;
}

export default function DisputeDetailPage() {
  return <DisputeDetailPageClient />;
}
