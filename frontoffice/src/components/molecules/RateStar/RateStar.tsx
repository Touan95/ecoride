import { IconBaseProps } from 'react-icons';
import { TbStar, TbStarFilled } from 'react-icons/tb';

interface RateStarProps extends IconBaseProps {
  filled?: boolean;
}

export const RateStar = ({ filled, ...props }: RateStarProps) => {
  if (filled) {
    return <TbStarFilled {...props} />;
  }
  return <TbStar {...props} />;
};
