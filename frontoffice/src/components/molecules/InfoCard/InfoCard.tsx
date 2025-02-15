import { Typography } from '@/components/atoms/Typography';
import clsxm from '@/utils/clsxm';
import { TbLeaf, TbLeafOff } from 'react-icons/tb';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/fr';
import { IconType } from 'react-icons';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

dayjs.locale('fr');
dayjs.extend(duration);

export interface InfoCardProps {
  duration: number;
  isGreen?: boolean;
  carBrand: string;
  carModel: string;
  carEnergy: string;
  seats: number;
  reservedSeats?: number;
}

interface InfoCardItemProps {
  label: string;
  value: string;
  valueIconTooltipText?: string;
  bigValue?: boolean;
  valueIcon?: IconType;
}

const InfoCardItem = ({ label, value, bigValue, valueIcon: Icon, valueIconTooltipText }: InfoCardItemProps) => {
  return (
    <div className="flex flex-col items-center">
      <Typography variant="cardTitle">{label}</Typography>
      <div className="flex gap-2 items-center">
        {Icon && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Icon />
              </TooltipTrigger>
              {valueIconTooltipText && <TooltipContent className={clsxm(['shadow bg-primary-50'])}>{valueIconTooltipText}</TooltipContent>}
            </Tooltip>
          </TooltipProvider>
        )}
        <Typography variant={bigValue ? 'cardTitle' : 'cardTitleSm'}>{value}</Typography>
      </div>
    </div>
  );
};

export const InfoCard = ({ duration, isGreen, carBrand, carModel, carEnergy, seats, reservedSeats = 0 }: InfoCardProps) => {
  const formattedDuration = dayjs.duration(duration).format('H:mm');

  const seatsLeft = seats - reservedSeats;

  const seatLeftText = seatsLeft > 1 ? `Places disponibles` : `Place disponible`;
  const GreenIcon = isGreen ? TbLeaf : TbLeafOff;
  const greenTooltipText = isGreen
    ? 'Trajet éco-responsable : réalisé en voiture électrique.'
    : "Ce trajet n'est pas réalisé en voiture électrique";

  return (
    <div className={clsxm(['w-full rounded-xl flex flex-col p-5 shadow items-center gap-5 bg-primary-50'])}>
      <InfoCardItem label="Durée du trajet" value={formattedDuration} bigValue />
      <InfoCardItem label="Véhicule" value={`${carBrand} - ${carModel}`} />
      <InfoCardItem label="Energie" value={carEnergy} valueIcon={GreenIcon} valueIconTooltipText={greenTooltipText} />
      <InfoCardItem label={seatLeftText} value={`${seatsLeft} / ${seats}`} />
    </div>
  );
};
