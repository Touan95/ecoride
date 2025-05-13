import clsxm from '@/utils/clsxm';
import { RateStar } from '@/components/molecules/RateStar';
import { useEffect, useState } from 'react';

interface RatingProps {
  rating?: number;
  maxRating?: number;
  onRate?: (rate: number) => void;
  className?: string;
}

export const Rating = ({ rating = 0, maxRating = 5, onRate, className }: RatingProps) => {
  const [currentRating, setCurrentRating] = useState(rating);

  useEffect(() => {
    setCurrentRating(rating);
  }, [rating]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      const newRating = Math.min(currentRating + 1, maxRating);
      setCurrentRating(newRating);
      onRate?.(newRating);
    } else if (e.key === 'ArrowLeft') {
      const newRating = Math.max(currentRating - 1, 1);
      setCurrentRating(newRating);
      onRate?.(newRating);
    }
  };

  return (
    <div
      className={clsxm('flex gap-4 w-fit', className)}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={maxRating}
      aria-valuenow={currentRating}
      aria-label="Évaluation par étoiles"
    >
      {Array.from({ length: maxRating }, (_, i) => i).map((id) => (
        <RateStar
          key={id}
          size={40}
          className="text-primary-700 cursor-pointer"
          filled={currentRating > id + 0.5}
          onClick={() => {
            setCurrentRating(id + 1);
            onRate?.(id + 1);
          }}
        />
      ))}
    </div>
  );
};
