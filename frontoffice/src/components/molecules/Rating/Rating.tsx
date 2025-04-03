import clsxm from '@/utils/clsxm';
import { RateStar } from '@/components/molecules/RateStar';

interface RatingProps {
  rating?: number;
  maxRating?: number;
  onRate?: (rate: number) => void;
  className?: string;
}

export const Rating = ({ rating = 0, maxRating = 5, onRate, className }: RatingProps) => {
  return (
    <div className={clsxm('flex gap-4 w-fit', className)}>
      {Array.from({ length: maxRating }, (_, i) => i).map((id) => (
        <RateStar
          key={id}
          size={40}
          className="text-primary-700 cursor-pointer"
          filled={rating > id + 0.5}
          onClick={() => onRate?.(id + 1)}
        />
      ))}
    </div>
  );
};
