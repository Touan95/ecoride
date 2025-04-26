import { Typography } from '@/components/atoms/Typography';
import { NumberInput } from '@/components/inputs/NumberInput';
import { TbPigMoney } from 'react-icons/tb';

interface PriceFieldProps {
  onValueChange: (value?: number) => void;
  error?: string;
}

export const PriceField = ({ onValueChange, error }: PriceFieldProps) => {
  return (
    <div className="w-full rounded-xl flex flex-col p-5 gap-2 shadow bg-primary-50 items-center h-fit">
      <div className="flex flex-col relative gap-5 justify-center w-full items-center">
        <Typography align="center" variant="cardTitle" color="primary">
          Votre prix
        </Typography>
        <TbPigMoney size={50} className="text-primary-900" />
        <Typography align="center" variant="cardTitleSm" color="primary">
          Veuillez saisir le tarif par passager
        </Typography>
      </div>
      <NumberInput min={2} suffix=" Crédits" className="font-bold" align="right" onValueChange={onValueChange} />
      <div className="h-4">
        {error && (
          <Typography align="center" variant="extraSmall" color="red">
            {error}
          </Typography>
        )}
      </div>
      <Typography align="center" variant="cardTitleSm" color="primary">
        Une commission de 2 crédits sera prélevée par la plateforme afin de garantir son bon fonctionnement.
      </Typography>
    </div>
  );
};
