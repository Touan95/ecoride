import { Typography } from '@/components/atoms/Typography';
import clsxm from '@/utils/clsxm';
import 'dayjs/locale/fr';
import { Button } from '../Button';

export interface CreditAmountCardProps {
  credits: number;
  onHistoryClick?: () => void;
}

export const CreditAmountCard = ({ credits, onHistoryClick }: CreditAmountCardProps) => {
  return (
    <div className={clsxm(['w-full rounded-xl flex flex-col p-5 shadow bg-primary-50'])}>
      <Typography align="center" variant="cardTitle" color="primary">
        Vos crédits
      </Typography>
      <div className="h-full flex flex-col items-center justify-center">
        <Typography align="center" variant="cardTitle" color="primary">
          {credits}
        </Typography>
      </div>
      {onHistoryClick && <Button>Voir plus</Button>}
    </div>
  );
};
