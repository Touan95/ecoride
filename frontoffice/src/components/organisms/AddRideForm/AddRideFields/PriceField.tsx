import { Typography } from '@/components/atoms/Typography';
import { NumberInput } from '@/components/inputs/NumberInput';
import { TbPigMoney } from 'react-icons/tb';

interface PriceFieldProps {
  onValueChange: (value?: number) => void;
}

export const PriceField = ({ onValueChange }: PriceFieldProps) => {
  return (
    <div className="w-full rounded-xl flex flex-col p-5 shadow bg-primary-50 gap-5 items-center h-fit">
      <div className="flex flex-col gap-5 relative justify-center w-full items-center">
        <Typography align="center" variant="cardTitle" color="primary">
          Votre prix
        </Typography>
        <TbPigMoney size={50} className="text-primary-900" />
        <Typography align="center" variant="cardTitleSm" color="primary">
          Veuillez saisir le tarif par passager
        </Typography>
      </div>
      <NumberInput min={2} suffix=" Crédits" className="font-bold" align="right" onValueChange={onValueChange} />
      <Typography align="center" variant="cardTitleSm" color="primary">
        Une commission de 2 crédits sera prélevée par la plateforme afin de garantir son bon fonctionnement.
      </Typography>
    </div>
  );
};
