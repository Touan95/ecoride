import { Typography } from '@/components/atoms/Typography';
import clsxm from '@/utils/clsxm';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/fr';

dayjs.locale('fr');
dayjs.extend(duration);

export interface PriceCardProps {
  price: number;
}

export const PriceCard = ({ price }: PriceCardProps) => {
  return (
    <div className={clsxm(['w-full rounded-xl flex p-5 shadow items-center justify-between gap-5 bg-primary-50'])}>
      <Typography variant="cardTitleSm">Coût</Typography>
      <Typography variant="cardTitle">{price} crédits</Typography>
    </div>
  );
};
