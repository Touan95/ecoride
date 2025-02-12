import { Typography } from '@/components/atoms/Typography';
import { TbLeaf } from 'react-icons/tb';

export const GreenCard = () => {
  return (
    <div className="w-full gap-4 rounded-xl flex p-5 shadow bg-primary-300 items-center">
      <TbLeaf size={40} className="text-primary-900" />
      <div>
        <Typography variant="cardTitle">Bonne nouvelle!</Typography>
        <Typography variant="cardTitleSm">Ce trajet est réalisé avec un véhicule électrique.</Typography>
        <Typography variant="cardTitleSm">La planète vous dit merci !</Typography>
      </div>
    </div>
  );
};
