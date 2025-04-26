import { Typography } from '@/components/atoms/Typography';
import clsxm from '@/utils/clsxm';
import { IconType } from 'react-icons';

interface CardProps {
  title: string;
  description: string;
  icon: IconType;
  bgColorClassname?: `bg-${string}`;
}

export const Card = ({ title, description, icon: Icon, bgColorClassname = 'bg-secondary-200' }: CardProps) => {
  return (
    <div className={clsxm([' rounded-xl flex flex-col items-center gap-5 p-5 shadow-2xl', bgColorClassname])}>
      <Icon className="text-primary-900 text-7xl" />
      <Typography align="center" variant="cardTitle" color="primary">
        {title}
      </Typography>
      <Typography align="center" variant="paragraph" color="primary">
        {description}
      </Typography>
    </div>
  );
};
