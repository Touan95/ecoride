import { Typography } from '@/components/atoms/Typography';
import { FontWeight } from '@/components/atoms/Typography/interface';

interface SectionTitleProps {
  children: string;
  weight?: FontWeight;
}

export const SectionTitle = ({ children, weight = 'bold' }: SectionTitleProps) => {
  return (
    <Typography align="center" variant="h2" color="primary" weight={weight}>
      {children}
    </Typography>
  );
};
